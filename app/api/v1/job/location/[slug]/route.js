import { isAuthFailure, requireRole } from "@/utils/apiAuth"
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
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}



export const PATCH = async (requsest, { params }) => {
	const { slug } = await params
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session
	try {

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

		return NextResponse.json(updateLocation)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session
	try {


		await prisma.jobLocation.delete({
			where: { slug }
		})

		return NextResponse.json("location has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}