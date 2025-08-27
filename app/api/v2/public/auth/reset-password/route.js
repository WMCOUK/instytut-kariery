import { ResetPasswordEmailTemplate } from '@/components/admin/email-templates/reset-password-email'
import prisma from '@/utils/prismadb'
import crypto from 'crypto'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)


export async function POST(request) {
	const body = await request.json()
	const { email } = body
	// console.log('Resetting password for ' + email)

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (!user) {
		return new Response('User not found', { status: 404 })
	}

	const resetPasswordToken = crypto.randomBytes(32).toString("base64url")
	const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

	await prisma.user.update({
		where: {
			email: user.email
		},
		data: {
			resetPasswordToken: resetPasswordToken,
			resetPasswordTokenExpiry: expiryDate
		}
	})

	await resend.emails.send({
		from: `Acme <admin@instytutkariery.pl>`,
		to: email,
		subject: 'Reset your password',
		react: ResetPasswordEmailTemplate({ email, resetPasswordToken }),
	})

	return new Response("Password reset email sent", { status: 200 })
}
