import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {

	try {
		const cvs = await prisma.candidateCv.findMany({
			orderBy: {
				createdAt: 'desc'  // Order by 'createdAt' field in descending order
			},
		})

		// Get the total count of cvs
		const totalCv = await prisma.candidateCv.count()

		return NextResponse.json({
			cvs,
			totalCv
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}