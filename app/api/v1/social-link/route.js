import { ATTRIBUTE_PER_PAGE } from "@/utils"
import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {

		const socialLinks = await prisma.socialLink.findMany({
			skip,
			take,
			// orderBy: {
			// 	posts: {
			// 		_count: 'desc'
			// 	}
			// },
			// include: {
			// 	_count: {
			// 		select: {
			// 			posts: true
			// 		}
			// 	}
			// }
		})
		const totalExperience = await prisma.socialLink.count()

		return new NextResponse(JSON.stringify({
			socialLinks,
			totalPage: Math.ceil(totalExperience / take)
		}))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}


export const POST = async (request) => {
	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	try {
		const body = await request.json()
		const { title, slug, url } = body

		const newLink = await prisma.socialLink.create({
			data: { title, slug, url, userId: session.user.id },
		})

		return NextResponse.json(newLink)
	} catch (error) {
		return NextResponse.json({ message: "Post Error", error: error.message }, { status: 500 })
	}
}