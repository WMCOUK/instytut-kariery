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
		// Get allJobCount without any restrictions
		const allJobCount = await prisma.job.count()

		// Attempt to get the current user
		const user = await currentUserServer()

		if (!user) {
			return NextResponse.json({ message: "User not authenticated", allJobCount }, { status: 401 })
		}

		const isAdmin = user.isRole === "ADMIN"

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

		let whereClause = { ...baseWhereClause }

		if (!isAdmin) {
			// For non-admin users (recruiters), only show their own jobs
			const recruiter = await prisma.recruiter.findFirst({
				where: { userId: user.id },
			})

			if (!recruiter) {
				return NextResponse.json({ message: "Recruiter profile not found", allJobCount }, { status: 404 })
			}

			whereClause = {
				AND: [{ ...baseWhereClause }, { recruiterId: recruiter.id }],
			}
		}

		const jobsQuery = {
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
				application: true
			},
		}

		const countQuery = {
			where: whereClause,
		}

		// console.log("Search query:", search)
		// console.log("Count query:", JSON.stringify(countQuery, null, 2))
		// console.log("Is admin:", isAdmin)

		const [jobs, totalJob] = await Promise.all([prisma.job.findMany(jobsQuery), prisma.job.count(countQuery)])

		// console.log("API - Total jobs:", totalJob)

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

