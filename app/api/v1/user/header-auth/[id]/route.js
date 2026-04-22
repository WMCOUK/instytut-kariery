import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	const { id } = await params

	if (id !== session.user.id && session.user.isRole !== "ADMIN") {
		return NextResponse.json({ message: "Forbidden" }, { status: 403 })
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				userName: true,
				email: true,
				isRole: true,
				onboard: true,
				personal: true,
			},
		})

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 })
		}

		return NextResponse.json({ user })
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
