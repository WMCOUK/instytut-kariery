import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)

	// Pagination and sorting
	const page = Number.parseInt(searchParams.get("page") || "1", 10)
	const pageSize = Number.parseInt(searchParams.get("pageSize") || "10", 10)
	const sortBy = searchParams.get("sortBy") || "createdAt"
	const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc"

	// Filters
	const search = searchParams.get("search") || undefined

	// Pagination
	const take = pageSize
	const skip = pageSize * (page - 1)

	// Allowed sorting fields
	const allowedSortBy = ["createdAt", "userName"]
	const sortKey = allowedSortBy.includes(sortBy) ? sortBy : "createdAt"

	// Query object
	const query = {
		skip,
		take,
		where: {
			onboard: "CANDIDATE",
			...(search && {
				OR: [
					{ userName: { contains: search, mode: "insensitive" } },
					{
						personal: {
							is: {
								OR: [
									{ name: { contains: search, mode: "insensitive" } },
									{ description: { contains: search, mode: "insensitive" } },
									{ designation: { contains: search, mode: "insensitive" } },
									{ city: { contains: search, mode: "insensitive" } },
									{ country: { contains: search, mode: "insensitive" } },
								],
							},
						},
					},
				],
			}),
		},
		orderBy: { [sortKey]: sortOrder },
		include: {
			candidate: true,
			personal: true,
		},
	}

	try {
		const [candidates, totalCandidate] = await Promise.all([
			prisma.user.findMany(query),
			prisma.user.count({ where: query.where }),
		])

		return NextResponse.json(
			{
				candidates,
				totalPage: Math.ceil(totalCandidate / take),
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error("Error fetching candidates:", error)
		return NextResponse.json({ message: "Error fetching candidates", error: error.message }, { status: 500 })
	}
}
