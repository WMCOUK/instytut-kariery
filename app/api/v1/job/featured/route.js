import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {

	try {
		// Fetch jobs with newest items first
		const jobs = await prisma.job.findMany({
			take: 9,
			orderBy: {
				createdAt: "desc", // Sort by the createdAt field in descending order
			},
			where: {
				isFeatured: true,
				
			},
			include: {
				recruiter: true,
				user: true,
				jobType: true,
				jobExperience: true,
				jobIndustry: true,
				jobLocation: true,
				jobPosition: true,
				jobWorkMode: true,
				application: true
			},

		})

		// Return jobs and total pages
		return new NextResponse(
			JSON.stringify({
				jobs,
			})
		)
	} catch (error) {
		return NextResponse.json(
			{ message: "Get Error", error },
			{ status: 500 }
		)
	}
}
