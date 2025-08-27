// import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { id } = await params

		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				post: true
			}
		})

		if (!user) {
			return NextResponse.json(
				{ message: "user not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(user)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}



export const PATCH = async (requsest, { params }) => {
	try {
		const body = await requsest.json()
		const { name, image, designation, bio, address, phone } = body
		const { id } = await params

		const updateuser = await prisma.user.update({
			where: {
				id
			},
			data: {
				name, image, designation, bio, address, phone
			}
		})

		if (!updateuser) {
			return NextResponse.json(
				{ message: "user not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json(updateuser)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	try {

		const { id } = await params

		await prisma.user.delete({
			where: { id }
		})

		return NextResponse.json("user has been deleted")

	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}