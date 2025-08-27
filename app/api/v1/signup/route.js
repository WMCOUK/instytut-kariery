import { VerifyEmailEmailTemplate } from "@/components/admin/email-templates/verify-email-email"
import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
	const body = await request.json()
	const { email, password, onboard } = body

	if (!email || !password || !onboard) {
		return new NextResponse("Missing Fields", { status: 400 })
	}

	const exist = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (exist) {
		throw new Error("Email already Exist")
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: {
			email,
			hashedPassword,
			onboard,
		},
	})

	const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			emailVerificationToken: emailVerificationToken,
		},
	})

	await resend.emails.send({
		from: `Acme <admin@instytutkariery.pl>`,
		to: email,
		subject: "Hello world",
		react: VerifyEmailEmailTemplate({ email, emailVerificationToken }),
	})

	return NextResponse.json(user)
}

export const GET = async () => {
	const session = await getAuthSession()
	if (session) {
		if (session?.user?.isRole) {
			const users = await prisma.user.findMany({
				include: {
					post: true,
				},
			})
			return NextResponse.json(users)
		}
		try {
			const users = await prisma.user.findMany({
				where: {
					email: session?.user?.email,
				},
				include: {
					// profile: true,
					post: true,
				},
			})

			return NextResponse.json(users)
		} catch (error) {
			return NextResponse.json({ message: "Get Error", error }, { status: 500 })
		}
	}
}

