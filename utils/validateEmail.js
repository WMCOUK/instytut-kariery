// Server-side email validation. The signup form does syntax checking too,
// but anyone can hit the API directly without the form.

// RFC-5322-ish — strict enough to reject obvious junk, not so strict it
// rejects legitimate edge cases. Mirrors what most providers actually
// accept in practice.
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

// Top disposable-email domains. Not exhaustive — anyone can spin up a
// new disposable service in minutes. This blocks the high-volume ones
// that show up in spam signups. Worth pairing with rate limiting (already
// done) and email verification (already in place via emailVerificationToken).
const DISPOSABLE_DOMAINS = new Set([
	"mailinator.com",
	"guerrillamail.com",
	"guerrillamail.net",
	"guerrillamail.org",
	"sharklasers.com",
	"throwawaymail.com",
	"yopmail.com",
	"trashmail.com",
	"10minutemail.com",
	"tempmail.com",
	"temp-mail.org",
	"getnada.com",
	"maildrop.cc",
	"dispostable.com",
	"fakeinbox.com",
	"mintemail.com",
	"mohmal.com",
	"emailondeck.com",
	"tempinbox.com",
	"spamgourmet.com",
])

const MAX_EMAIL_LENGTH = 254 // RFC 5321

/**
 * Validates an email server-side.
 * @returns {{ ok: true } | { ok: false, reason: string }}
 */
export function validateEmail(email) {
	if (typeof email !== "string") return { ok: false, reason: "Email must be a string" }
	const trimmed = email.trim().toLowerCase()
	if (trimmed.length === 0) return { ok: false, reason: "Email is required" }
	if (trimmed.length > MAX_EMAIL_LENGTH) return { ok: false, reason: "Email too long" }
	if (!EMAIL_RE.test(trimmed)) return { ok: false, reason: "Invalid email format" }

	const domain = trimmed.split("@")[1]
	if (DISPOSABLE_DOMAINS.has(domain)) {
		return { ok: false, reason: "Disposable email addresses are not allowed" }
	}

	return { ok: true }
}
