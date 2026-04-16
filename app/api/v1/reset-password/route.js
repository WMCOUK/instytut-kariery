import { ResetPasswordEmailTemplate } from '@/components/admin/email-templates/reset-password-email'
import { rateLimit } from "@/utils/rateLimit"
import prisma from '@/utils/prismadb'
import crypto from 'crypto'
import { Resend } from 'resend'

// Always returns the same generic 200 response regardless of whether the
// email exists in the database. This prevents email enumeration — an
// attacker cannot tell from the response which addresses are registered.

export async function POST(request) {
	const limited = rateLimit(request, { id: "reset-password", max: 3, windowMs: 60_000 })
	if (limited) return limited

	const body = await request.json()
	const { email } = body

	if (!email) {
		return new Response("Missing email", { status: 400 })
	}

	const user = await prisma.user.findUnique({ where: { email } })

	// Only send the email if the user exists. Either way, return success.
	if (user) {
		const resend = new Resend(process.env.RESEND_API_KEY)
		const resetPasswordToken = crypto.randomBytes(32).toString("base64url")
		const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000)

		await prisma.user.update({
			where: { email: user.email },
			data: {
				resetPasswordToken,
				resetPasswordTokenExpiry: expiryDate,
			},
		})

		await resend.emails.send({
			from: `Acme <admin@instytutkariery.pl>`,
			to: email,
			subject: 'Reset your password',
			react: ResetPasswordEmailTemplate({ email, resetPasswordToken }),
		})
	}

	return new Response(
		"If an account exists for that email, a password reset link has been sent.",
		{ status: 200 }
	)
}
