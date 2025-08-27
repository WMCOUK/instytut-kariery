import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const experience = await prisma.candidateExperience.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!experience) {
			return NextResponse.json(
				{ message: "Experience not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(experience)

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
		const {
			title,
			slug,
			companyName,
			description,
			joinDate,
			leaveDate,
			isCurrentJob
		} = body

		const updateExperience = await prisma.candidateExperience.update({
			where: {
				slug
			},
			data: {
				title,
				title,
				slug,
				companyName,
				description,
				joinDate,
				leaveDate,
				isCurrentJob
			}
		})

		if (!updateExperience) {
			return NextResponse.json(
				{ message: "Experience not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updateExperience)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.candidateExperience.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("Experience has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}