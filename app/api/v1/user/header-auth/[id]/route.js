import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

// GET user by id
export const GET = async (request, { params }) => {
	try {
		const { id } = params

		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				personal: true, // include personal info
			},
		})

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 })
		}

		return NextResponse.json({ user })
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}