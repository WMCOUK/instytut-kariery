import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {

	try {
		const locations = await prisma.jobLocation.findMany({
			orderBy: {
				createdAt: 'desc'  // Order by 'createdAt' field in descending order
			},
			include: {
				job: true
			}
		})

		// Get the total count of Locations
		const totalLocation = await prisma.jobLocation.count()

		return NextResponse.json({
			locations,
			totalLocation
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}