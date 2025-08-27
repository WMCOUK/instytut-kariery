import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const workMode = await prisma.jobWorkMode.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!workMode) {
			return NextResponse.json(
				{ message: "WorkMode not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(workMode)

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

		const updateWorkMode = await prisma.jobWorkMode.update({
			where: {
				slug
			},
			data: {
				title,
				image,
				icon
			}
		})

		if (!updateWorkMode) {
			return NextResponse.json(
				{ message: "WorkMode not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updateWorkMode)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.jobWorkMode.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("WorkMode has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}