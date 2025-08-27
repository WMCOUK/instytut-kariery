import { ATTRIBUTE_PER_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"


export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {
		const currentUser = await currentUserServer()
		const educations = await prisma.candidateEducation.findMany({
			skip,
			take,
			where: {
				userId: currentUser?.id, // Ensure we only fetch experiences for the current user
			},
		})
		const totalEducation = await prisma.candidateEducation.count()

		return new NextResponse(JSON.stringify({
			educations,
			totalPage: Math.ceil(totalEducation / take)
		}))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}




export const POST = async (request) => {
	try {
		const currentUser = await currentUserServer()
		if (!currentUser) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
		}

		const body = await request.json()
		console.log("Received Body:", body)

		// Ensure `startDate` and `endDate` are converted to Date format if present
		const newcandidateEducation = await prisma.candidateEducation.create({
			data: {
				title: body.title,
				slug: body.slug,
				instituteName: body.instituteName || null, // Ensure instituteName is never null
				description: body.description || null,
				startDate: body.startDate ? new Date(body.startDate) : null,
				endDate: body.endDate ? new Date(body.endDate) : null,
				isCurrentStudy: body.isCurrentStudy || false,
				userId: currentUser.id,
			},
		})

		console.log("New Experience Created:", newcandidateEducation)
		return NextResponse.json(newcandidateEducation)
	} catch (error) {
		console.error("Server Error:", error)
		return NextResponse.json({ message: "Post Error", error: error.message }, { status: 500 })
	}
}