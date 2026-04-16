import { NextResponse } from "next/server"
import { getAuthSession } from "@/utils/auth"

const unauthorized = (msg = "Unauthorized") =>
	NextResponse.json({ message: msg }, { status: 401 })

const forbidden = (msg = "Forbidden") =>
	NextResponse.json({ message: msg }, { status: 403 })

/**
 * Require any authenticated user.
 * @returns {Promise<Session | NextResponse>} Session object on success, 401 NextResponse on failure.
 *
 * Usage in a route handler:
 *   const session = await requireAuth()
 *   if (isAuthFailure(session)) return session
 *   // session.user.id is now safe to use
 */
export async function requireAuth() {
	const session = await getAuthSession()
	if (!session?.user?.id) return unauthorized()
	return session
}

/**
 * Require an authenticated user whose isRole is in `roles`.
 * Roles correspond to User.isRole values: "ADMIN", "MODERATOR", "USER".
 * @param {string[]} roles - allowed roles (e.g. ["ADMIN"] or ["ADMIN", "MODERATOR"])
 * @returns {Promise<Session | NextResponse>}
 */
export async function requireRole(roles) {
	const session = await getAuthSession()
	if (!session?.user?.id) return unauthorized()
	if (!roles.includes(session.user.isRole)) return forbidden()
	return session
}

/**
 * Require an authenticated user that owns the resource OR has admin role.
 * Pass the resource's userId (the row's owner). Admins always pass.
 * @param {string | null | undefined} resourceUserId - the userId column of the resource being accessed
 * @returns {Promise<Session | NextResponse>}
 */
export async function requireOwnership(resourceUserId) {
	const session = await getAuthSession()
	if (!session?.user?.id) return unauthorized()
	if (session.user.isRole === "ADMIN") return session
	if (!resourceUserId || resourceUserId !== session.user.id) return forbidden()
	return session
}

/**
 * Convenience check: was the result of one of the require* helpers a failure response?
 */
export const isAuthFailure = (x) => x instanceof NextResponse
