import { ATTRIBUTE_PER_PAGE } from "@/utils"
import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export async function GET(request) {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)

	try {
		const locations = await prisma.jobLocation.findMany({
			skip,
			take,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				job: true,
			},
		})
		const totalLocation = await prisma.jobLocation.count()
		const totalPage = Math.ceil(totalLocation / take)

		return NextResponse.json({
			locations,
			totalPage,
			currentPage: page,
		})
	} catch (error) {
		console.error("Error fetching job locations:", error)
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const body = await request.json()

		const newLocation = await prisma.jobLocation.create({
			data: {
				...body,
			},
		})

		return NextResponse.json(newLocation)
	} catch (error) {
		console.error("Error creating job location:", error)
		return NextResponse.json({ message: "Post Error", error: error.message }, { status: 500 })
	}
}

