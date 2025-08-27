import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const position = await prisma.jobPosition.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!position) {
			return NextResponse.json(
				{ message: "Position not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(position)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}



export const PATCH = async (requsest, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {
		// if (session.user.isAdmin) {
		const body = await requsest.json()
		const { title, image, icon } = body

		const updatePosition = await prisma.jobPosition.update({
			where: {
				slug
			},
			data: {
				title,
				image,
				icon
			}
		})

		if (!updatePosition) {
			return NextResponse.json(
				{ message: "Position not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updatePosition)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.jobPosition.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("Position has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}