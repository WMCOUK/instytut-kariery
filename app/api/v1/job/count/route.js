import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {

	try {
		// Get allJobCount without any restrictions
		const allJobCount = await prisma.job.count()
		return NextResponse.json({
			allJobCount,
		})
	} catch (error) {
		console.error("Error fetching jobs:", error)
		return NextResponse.json(
			{ message: "Error fetching jobs", error: error.message },
			{ status: 500 }
		)
	}
}

