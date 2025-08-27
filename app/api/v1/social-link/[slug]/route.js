import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const socialLink = await prisma.socialLink.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!socialLink) {
			return NextResponse.json(
				{ message: "socialLink not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(socialLink)

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
		const { title, url } = body

		const updateSocialLink = await prisma.socialLink.update({
			where: {
				slug
			},
			data: {
				title,
				url

			}
		})

		if (!updateSocialLink) {
			return NextResponse.json(
				{ message: "socialLink not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updateSocialLink)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.socialLink.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("socialLink has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}