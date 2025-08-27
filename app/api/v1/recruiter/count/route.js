import prisma from "@/utils/prismadb"
// import { maxRecruiters, subscription } from "@/utils/subscription"
import { NextResponse } from "next/server"

export const GET = async (request) => {

	try {

		const totalRecruiter = await prisma.recruiter.count()

		return NextResponse.json({
			totalRecruiter,
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
