
import { PasswordChangeSuccessfulTemplate } from '@/components/admin/email-templates/password-change-success'
import prisma from '@/utils/prismadb'
import bcrypt from 'bcrypt'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
	try {
		const body = await request.json()
		const { resetPasswordToken, password } = body

		const user = await prisma.user.findUnique({
			where: {
				resetPasswordToken
			}
		})

		if (!user) {
			return new Response('User not found', { status: 404 })
		}

		const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry
		if (!resetPasswordTokenExpiry || new Date() > resetPasswordTokenExpiry) {
			return new Response('Token expired', { status: 400 })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				hashedPassword,
				resetPasswordToken: null,
				resetPasswordTokenExpiry: null,
			}
		})

		await resend.emails.send({
			from: `Acme <admin@instytutkariery.pl>`,
			to: user.email,
			subject: 'Password changed successfully',
			react: PasswordChangeSuccessfulTemplate(),
		})

		return new Response('Password changed successfully', { status: 200 })
	} catch (error) {
		return new Response('Internal Server Error', { status: 500 })
	}
}
