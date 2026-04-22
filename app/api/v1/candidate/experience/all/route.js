import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const [experiences, totalExperience] = await Promise.all([
			prisma.candidateExperience.findMany({ orderBy: { createdAt: "desc" } }),
			prisma.candidateExperience.count(),
		])
		return NextResponse.json({ experiences, totalExperience })
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
