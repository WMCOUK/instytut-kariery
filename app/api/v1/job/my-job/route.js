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

	try {
		// Get total job count (optional: global)
		const allJobCount = await prisma.job.count()

		// Get current user
		const user = await currentUserServer()
		if (!user) {
			return NextResponse.json({ message: "User not authenticated", allJobCount }, { status: 401 })
		}

		// Build search filter
		const baseWhereClause = search
			? {
				OR: [
					{ title: { contains: search, mode: "insensitive" } },
					{ description: { contains: search, mode: "insensitive" } },
					{ content: { contains: search, mode: "insensitive" } },
					{ skills: { hasSome: [search] } },
				],
			}
			: {}

		// Only fetch jobs created by the current user
		const whereClause = {
			AND: [
				{ ...baseWhereClause },
				{ userId: user.id },
			],
		}

		const [jobs, totalJob] = await Promise.all([
			prisma.job.findMany({
				skip,
				take,
				where: whereClause,
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
			prisma.job.count({ where: whereClause }),
		])

		const totalPage = Math.max(1, Math.ceil(totalJob / take))

		return NextResponse.json({
			jobs,
			totalPage,
			totalJob,
			allJobCount,
			currentPage: page,
		})
	} catch (error) {
		console.error("Error fetching jobs:", error)
		return NextResponse.json(
			{
				message: "Error fetching jobs",
				error: error instanceof Error ? error.message : "Unknown error",
				jobs: [],
				totalPage: 0,
				totalJob: 0,
				allJobCount: 0,
				currentPage: page,
			},
			{ status: 500 },
		)
	}
}
