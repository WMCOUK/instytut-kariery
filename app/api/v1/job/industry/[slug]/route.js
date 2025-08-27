import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const industry = await prisma.jobIndustry.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!industry) {
			return NextResponse.json(
				{ message: "Industry not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(industry)

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

		const updateIndustry = await prisma.jobIndustry.update({
			where: {
				slug
			},
			data: {
				title,
				image,
				icon
			}
		})

		if (!updateIndustry) {
			return NextResponse.json(
				{ message: "Industry not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updateIndustry)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.jobIndustry.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("Industry has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}