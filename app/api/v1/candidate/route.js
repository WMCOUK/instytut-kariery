import { TABLE_ROW_PAGE } from "@/utils"
import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = TABLE_ROW_PAGE
	const skip = TABLE_ROW_PAGE * (page - 1)

	const session = await getAuthSession()
	const isAdmin = session?.user?.isRole === "ADMIN"

	try {
		const where = isAdmin
			? { onboard: "CANDIDATE" }
			: { onboard: "CANDIDATE", candidate: { publicProfile: true } }

		const [candidates, totalCandidate] = await Promise.all([
			prisma.user.findMany({
				skip,
				take,
				where,
				select: {
					id: true,
					userName: true,
					email: isAdmin,
					onboard: true,
					createdAt: true,
					candidate: true,
					personal: true,
				},
			}),
			prisma.user.count({ where }),
		])

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
