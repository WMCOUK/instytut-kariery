import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const [educations, totalEducation] = await Promise.all([
			prisma.candidateEducation.findMany({ orderBy: { createdAt: "desc" } }),
			prisma.candidateEducation.count(),
		])
		return NextResponse.json({ educations, totalEducation })
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
