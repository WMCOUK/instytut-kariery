import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const session = await getAuthSession()
		if (!session?.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
		}

		const [jobs, recruiters, locations, users] = await Promise.all([
			prisma.job.count(),
			prisma.recruiter.count(),
			prisma.jobLocation.count(),
			prisma.user.count(),
		])

		return NextResponse.json({ jobs, recruiters, locations, users })
	} catch (error) {
		console.error("Error fetching dashboard stats:", error)
		return NextResponse.json(
			{ message: "Error fetching dashboard stats", error: error.message },
			{ status: 500 }
		)
	}
}
