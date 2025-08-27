import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

import currentUserServer from "@/utils/currentUserServer"

export const GET = async () => {

	const user = await currentUserServer()
	if (!user) {
		return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
	}

	try {
		const where = { userId: user.id }

		const [recruiters, totalRecruiter] = await Promise.all([
			prisma.recruiter.findMany({
				where,
			}),
			prisma.recruiter.count({
				where
			}),
		])

		return NextResponse.json({
			recruiters,
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
