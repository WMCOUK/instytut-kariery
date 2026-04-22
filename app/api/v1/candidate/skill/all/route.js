import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const [skills, totalSkill] = await Promise.all([
			prisma.candidateSkill.findMany({ orderBy: { createdAt: "desc" } }),
			prisma.candidateSkill.count(),
		])
		return NextResponse.json({ skills, totalSkill })
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
