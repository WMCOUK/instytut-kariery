import { TABLE_ROW_PAGE } from "@/utils"
import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const cat = searchParams.get("cat" || null)

	const query = {
		take: TABLE_ROW_PAGE,
		skip: TABLE_ROW_PAGE * (page - 1),
		where: {
			...(cat && { catSlug: cat })
		},
		// include: { user: true }
		include: {
			user: true,
			blogCategory: true,
			comment: true
		}
	}
	try {

		const [posts, count] = await prisma.$transaction([
			prisma.post.findMany(query),
			prisma.post.count({ where: query.where })
		])
		return new NextResponse(JSON.stringify({
			posts,
			count,
			totalPage: Math.ceil(count / TABLE_ROW_PAGE), // Calculate total pages
			currentPage: page, // Added currentPage
		}), { status: 200 })

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}


export const POST = async (request) => {
	const session = await getAuthSession()
	try {
		const body = await request.json()

		const newPost = await prisma.post.create({
			data: {
				...body,
				userId: session.user.id

			}
		})

		return NextResponse.json(newPost)

	} catch (error) {
		return NextResponse.json({ message: "Post Error", error }, { status: 500 })
	}
}