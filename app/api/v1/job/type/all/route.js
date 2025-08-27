import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {

	try {
		const types = await prisma.jobType.findMany({
			orderBy: {
				createdAt: 'desc'  // Order by 'createdAt' field in descending order
			},
			include: {
				job: true
			}
		})

		// Get the total count of types
		const totalType = await prisma.jobType.count()

		return NextResponse.json({
			types,
			totalType
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}