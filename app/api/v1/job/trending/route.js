import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
	try {
		const trendingJob = await prisma.job.findMany({
			take: 6,
			select: {
				createdAt: true,
				slug: true,
				title: true,
				skills: true,
				minSalary: true,
			},
			orderBy: {
				views: "desc",
			},
		})

		return NextResponse.json(trendingJob, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: "Get Error", error: error.message },
			{ status: 500 }
		)
	}
}
