import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {

	try {
		const skills = await prisma.candidateSkill.findMany({
			orderBy: {
				createdAt: 'desc'  // Order by 'createdAt' field in descending order
			}
		})

		// Get the total count of skills
		const totalSkill = await prisma.candidateSkill.count()

		return NextResponse.json({
			skills,
			totalSkill
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}