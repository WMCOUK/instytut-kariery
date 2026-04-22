import { CATEGORY_PER_PAGE } from "@/utils"
import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = parseInt(searchParams.page) || 1
	const take = CATEGORY_PER_PAGE
	const skip = CATEGORY_PER_PAGE * (page - 1)
	try {

		const categories = await prisma.blogCategory.findMany({
			skip,
			take,	
			orderBy: {
				posts: {
					_count: 'desc'
				}
			},
			include: {
				_count: {
					select: {
						posts: true
					}
				}
			}
		})
		const totalCategory = await prisma.blogCategory.count()

		return new NextResponse(JSON.stringify({
			categories,
			totalPage: Math.ceil(totalCategory / take)
		}))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}


export const POST = async (request) => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const body = await request.json()

		const newCategory = await prisma.blogCategory.create({
			data: {
				...body
			}
		})

		return NextResponse.json(newCategory)

	} catch (error) {
		return NextResponse.json({ message: "Post Error", error: error.message }, { status: 500 })
	}
}