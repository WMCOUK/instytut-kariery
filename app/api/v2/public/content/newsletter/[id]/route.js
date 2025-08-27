import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { id } = await params

		const newsletter = await prisma.newsletter.findUnique({
			where: { id },
			// include: {
			// 	posts: true
			// }
		})

		if (!newsletter) {
			return NextResponse.json(
				{ message: "newsletter not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(newsletter)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}



export const PATCH = async (requsest, { params }) => {
	const { id } = await params
	const session = await getAuthSession()
	try {
		// if (session.user.isAdmin) {
		const body = await requsest.json()
		const { title, url } = body

		const updateNewsletter = await prisma.newsletter.update({
			where: {
				id
			},
			data: {
				title,
				url

			}
		})

		if (!updateNewsletter) {
			return NextResponse.json(
				{ message: "newsletter not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updateNewsletter)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { id } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.newsletter.delete({
			where: { id }
		})
		// }
		return NextResponse.json("newsletter has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}