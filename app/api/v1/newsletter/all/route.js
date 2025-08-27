import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {

	try {
		const experiences = await prisma.jobExperience.findMany({
			orderBy: {
				createdAt: 'desc'  // Order by 'createdAt' field in descending order
			},
			include: {
				job: true
			}
		})

		// Get the total count of experiences
		const totalExperience = await prisma.jobExperience.count()

		return NextResponse.json({
			experiences,
			totalExperience
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}