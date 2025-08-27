import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {

	try {
		const benefits = await prisma.jobBenefit.findMany({
			orderBy: {
				createdAt: 'desc'  // Order by 'createdAt' field in descending order
			},
			// include: {
			// 	job: true
			// }
		})

		// Get the total count of benefits
		const totalBenefit = await prisma.jobBenefit.count()

		return NextResponse.json({
			benefits,
			totalBenefit
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}