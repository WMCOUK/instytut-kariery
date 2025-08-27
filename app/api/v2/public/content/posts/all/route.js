import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)

	// Pagination and sorting
	const page = parseInt(searchParams.get("page") || "1", 10)
	const pageSize = parseInt(searchParams.get("pageSize") || "10", 10)
	const sortBy = searchParams.get("sortBy") || "createdAt"
	const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc"

	// Filters
	const filters = {
		catSlug: searchParams.get("catSlug") || undefined,
		search: searchParams.get("search") || undefined,
	}

	// Pagination
	const take = pageSize
	const skip = pageSize * (page - 1)

	// Allowed sorting fields
	const allowedSortBy = ["createdAt", "title"]
	const sortKey = allowedSortBy.includes(sortBy) ? sortBy : "createdAt"

	// Query object
	const query = {
		skip,
		take,
		where: {
			...(filters.catSlug && { catSlug: filters.catSlug }),
			...(filters.search && {
				OR: [
					{ title: { contains: filters.search, mode: "insensitive" } },
					{ description: { contains: filters.search, mode: "insensitive" } },
				],
			}),
		},
		orderBy: { [sortKey]: sortOrder },
		include: {
			user: true,
			comment: true,
		},
	}

	try {
		const [posts, totalPost] = await Promise.all([
			prisma.post.findMany(query),
			prisma.post.count({ where: query.where }),
		])

		return NextResponse.json(
			{
				posts,
				totalPage: Math.ceil(totalPost / take),
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error fetching posts:", error)
		return NextResponse.json(
			{ message: "Error fetching posts", error: error.message },
			{ status: 500 }
		)
	}
}
