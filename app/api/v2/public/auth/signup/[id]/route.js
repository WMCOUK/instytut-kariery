import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const { id } = await params

		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				userName: true,
				email: true,
				isRole: true,
				onboard: true,
				isBanned: true,
				isSubscription: true,
				createdAt: true,
				updatedAt: true,
				post: true,
			},
		})

		if (!user) {
			return NextResponse.json({ message: "user not found" }, { status: 404 })
		}
		return NextResponse.json(user)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const { id } = await params
		await prisma.user.delete({ where: { id } })
		return NextResponse.json("user has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
