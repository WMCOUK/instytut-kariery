import { NextResponse } from "next/server"

/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Pros: zero external deps, works out of the box on Vercel.
 * Cons: per-serverless-instance state. A user hitting different Vercel
 * Lambda instances could get more requests than `max`. For abuse-prevention
 * (spam signup, bulk applications), this is still effective because a single
 * IP usually lands on the same warm instance for sequential requests.
 *
 * For stronger guarantees (distributed rate limiting), swap with
 * @upstash/ratelimit + Upstash Redis later. The call signature is the same.
 */

const buckets = new Map()
const CLEANUP_INTERVAL = 60_000 // every minute, evict expired entries
let lastCleanup = Date.now()

function cleanup() {
	const now = Date.now()
	for (const [key, entry] of buckets.entries()) {
		if (entry.resetAt < now) buckets.delete(key)
	}
	lastCleanup = now
}

/**
 * Get the request's identifier (IP). Falls back to a generic key if no IP
 * is available (e.g. local dev) so the limiter still works.
 */
function getKey(request, suffix) {
	const xff = request.headers.get("x-forwarded-for")
	const ip = xff ? xff.split(",")[0].trim() : "unknown"
	return `${ip}:${suffix}`
}

/**
 * Apply a rate limit to a request.
 *
 * @param {Request} request - the incoming request
 * @param {object} opts
 * @param {string} opts.id - identifier for this limiter (e.g. "signup", "reset-password")
 * @param {number} opts.max - max requests in the window
 * @param {number} opts.windowMs - window length in milliseconds
 * @returns {NextResponse | null} - 429 response if rate limited, otherwise null (proceed)
 *
 * Usage in a route handler:
 *   const limited = rateLimit(request, { id: 'signup', max: 5, windowMs: 60_000 })
 *   if (limited) return limited
 */
export function rateLimit(request, { id, max, windowMs }) {
	if (Date.now() - lastCleanup > CLEANUP_INTERVAL) cleanup()

	const key = getKey(request, id)
	const now = Date.now()
	const entry = buckets.get(key)

	if (!entry || entry.resetAt < now) {
		buckets.set(key, { count: 1, resetAt: now + windowMs })
		return null
	}

	entry.count += 1
	if (entry.count > max) {
		const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
		return NextResponse.json(
			{ message: "Too many requests. Please try again later." },
			{
				status: 429,
				headers: {
					"Retry-After": String(retryAfter),
					"X-RateLimit-Limit": String(max),
					"X-RateLimit-Remaining": "0",
					"X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
				},
			}
		)
	}

	return null
}
