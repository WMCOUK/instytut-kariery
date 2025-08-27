import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {

	try {
		const user = await currentUserServer()
		// if (!user) {
		// 	return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
		// }
		const jobs = await prisma.job.findMany({
			where: {
				userId: user?.id,
			},
			take: 9,

			orderBy: {
				createdAt: "desc", // Sort by the createdAt field in descending order
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
