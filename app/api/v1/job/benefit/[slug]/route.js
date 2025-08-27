import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const benefit = await prisma.jobBenefit.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!benefit) {
			return NextResponse.json(
				{ message: "Benefit not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(benefit)

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

		const updateBenefit = await prisma.jobBenefit.update({
			where: {
				slug
			},
			data: {
				title,
				image,
				icon
			}
		})

		if (!updateBenefit) {
			return NextResponse.json(
				{ message: "Benefit not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updateBenefit)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.jobBenefit.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("Benefit has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}