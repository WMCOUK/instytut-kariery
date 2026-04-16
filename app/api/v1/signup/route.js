import { VerifyEmailEmailTemplate } from "@/components/admin/email-templates/verify-email-email"
import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import { rateLimit } from "@/utils/rateLimit"
import prisma from "@/utils/prismadb"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request) {
	const limited = rateLimit(request, { id: "signup", max: 5, windowMs: 60_000 })
	if (limited) return limited

	const resend = new Resend(process.env.RESEND_API_KEY)
	const body = await request.json()
	const { email, password, onboard } = body

	if (!email || !password || !onboard) {
		return new NextResponse("Missing Fields", { status: 400 })
	}

	const exist = await prisma.user.findUnique({
		where: { email },
	})

	if (exist) {
		throw new Error("Email already Exist")
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: { email, hashedPassword, onboard },
	})

	const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

	await prisma.user.update({
		where: { id: user.id },
		data: { emailVerificationToken },
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
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				userName: true,
				email: true,
				isRole: true,
				onboard: true,
				createdAt: true,
				updatedAt: true,
				post: true,
			},
		})
		return NextResponse.json(users)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
