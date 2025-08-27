import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const location = await prisma.jobLocation.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!location) {
			return NextResponse.json(
				{ message: "location not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(location)

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

		const updateLocation = await prisma.jobLocation.update({
			where: {
				slug
			},
			data: {
				title,
				image,
				icon
			}
		})

		if (!updateLocation) {
			return NextResponse.json(
				{ message: "location not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updateLocation)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.jobLocation.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("location has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}