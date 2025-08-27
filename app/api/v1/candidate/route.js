import { TABLE_ROW_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = TABLE_ROW_PAGE
	const skip = TABLE_ROW_PAGE * (page - 1)

	// const user = await currentUserServer()
	// if (!user) {
	// 	return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
	// }

	// const isAdmin = user.isRole === "ADMIN"
	// const where = isAdmin ? {} : { userId: user.id }

	try {
		const candidates = await prisma.user.findMany({
			skip,
			take,
			where: { onboard: "CANDIDATE" }, // Filter only candidates
			include: {
				candidate: true,
				personal: true,
			}
		})

		const totalCandidate = await prisma.user.count({
			where: { onboard: "CANDIDATE" }, // Count only candidates
		})

		return NextResponse.json({
			candidates,
			totalPage: Math.ceil(totalCandidate / take),
			totalCandidate,
			currentPage: page,
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}


