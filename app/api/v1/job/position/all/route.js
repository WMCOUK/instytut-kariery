import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {

	try {
		const positions = await prisma.jobPosition.findMany({
			orderBy: {
				createdAt: 'desc'  // Order by 'createdAt' field in descending order
			},
			include: {
				job: true
			}
		})

		// Get the total count of positions
		const totalPosition = await prisma.jobPosition.count()

		return NextResponse.json({
			positions,
			totalPosition
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}