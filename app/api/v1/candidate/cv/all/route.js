import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	try {
		const where = session.user.isRole === "ADMIN" ? {} : { userId: session.user.id }
		const [cvs, totalCv] = await Promise.all([
			prisma.candidateCv.findMany({
				where,
				orderBy: { createdAt: "desc" },
			}),
			prisma.candidateCv.count({ where }),
		])

		return NextResponse.json({ cvs, totalCv })
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
