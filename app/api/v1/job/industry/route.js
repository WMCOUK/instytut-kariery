import { ATTRIBUTE_PER_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")  // Make sure the page is extracted as an integer
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)

	try {
		// Get industries with pagination
		const industries = await prisma.jobIndustry.findMany({
			skip,
			take,
			orderBy: {
				createdAt: 'desc'  // Order by 'createdAt' field in descending order
			},
			include: {
				job: true
			}
		})

		// Get the total count of industries
		const totalIndustry = await prisma.jobIndustry.count()

		// Calculate total pages
		const totalPage = Math.ceil(totalIndustry / take)

		return NextResponse.json({
			industries,
			totalPage,
			currentPage: page
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}


export const POST = async (request) => {
	try {
		const body = await request.json()

		const newCategory = await prisma.jobIndustry.create({
			data: {
				...body
			}
		})

		return NextResponse.json(newCategory)

	} catch (error) {
		return NextResponse.json({ message: "Post Error", error }, { status: 500 })
	}
}