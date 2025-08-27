import { TABLE_ROW_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const search = searchParams.get("search") || ""
	const take = TABLE_ROW_PAGE
	const skip = TABLE_ROW_PAGE * (page - 1)

	const user = await currentUserServer()
	if (!user) {
		return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
	}
	try {
		let where = {
			moderation: "pending",
			userId: user?.id,
		}

		if (search) {
			where = {
				...where,
				OR: [
					{ title: { contains: search, mode: "insensitive" } },
					{ description: { contains: search, mode: "insensitive" } },
					{ content: { contains: search, mode: "insensitive" } },
					{ skills: { hasSome: search.split(" ") } },
				],
			}
		}

		const [jobs, totalCount] = await Promise.all([
			prisma.job.findMany({
				take,
				skip,
				where,
				orderBy: { createdAt: "desc" },
				include: {
					recruiter: true,
					user: true,
					jobType: true,
					jobExperience: true,
					jobIndustry: true,
					jobLocation: true,
					jobPosition: true,
					jobWorkMode: true,
				},
			}),
			prisma.job.count({ where }),
		])

		const totalPage = Math.ceil(totalCount / take)

		return NextResponse.json({
			jobs,
			currentPage: page,
			totalPage,
			totalJob: totalCount,
		})
	} catch (error) {
		console.error("Error fetching jobs:", error)
		return NextResponse.json(
			{ message: "Get Error", error: error.message },
			{ status: 500 }
		)
	}
}
