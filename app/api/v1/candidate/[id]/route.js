// import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { id } = await params

		const candidate = await prisma.user.findUnique({
			where: { id }, // Filter only candidates
			include: {
				personal: true,
				// education: true,
				candidate: true,
				candidateSkill: true,
				candidateExperience: true,
				candidateEducation: true,
				candidateCv: true,
				application: {
					include: {
						job: true,
						recruiter: true
					}
				}
			}
		})

		if (!candidate) {
			return NextResponse.json(
				{ message: "candidate  not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(candidate)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}