import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {

	try {
		const educations = await prisma.candidateEducation.findMany({
			orderBy: {
				createdAt: 'desc'  // Order by 'createdAt' field in descending order
			},
		})

		// Get the total count of educations
		const totalEducation = await prisma.candidateEducation.count()

		return NextResponse.json({
			educations,
			totalEducation
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}