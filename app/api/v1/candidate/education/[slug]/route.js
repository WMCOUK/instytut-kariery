import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const Education = await prisma.candidateEducation.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!Education) {
			return NextResponse.json(
				{ message: "Education not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(Education)

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
		const { title,
			instituteName,
			description,
			startDate,
			endDate, isCurrentStudy } = body

		const updateEducation = await prisma.candidateEducation.update({
			where: {
				slug
			},
			data: {
				title,
				instituteName,
				description,
				startDate,
				endDate,
				isCurrentStudy
			}
		})

		if (!updateEducation) {
			return NextResponse.json(
				{ message: "Education not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updateEducation)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.candidateEducation.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("Education has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}