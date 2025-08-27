import { ATTRIBUTE_PER_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {

		const newsletters = await prisma.newsletter.findMany({
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
		const totalExperience = await prisma.newsletter.count()

		return new NextResponse(JSON.stringify({
			newsletters,
			totalPage: Math.ceil(totalExperience / take)
		}))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}


export const POST = async (request) => {
	try {
		const body = await request.json()
		const { email } = body

		const existing = await prisma.newsletter.findUnique({
			where: { email },
		})

		if (existing) {
			return NextResponse.json({ message: "Already subscribed" }, { status: 409 }) // 409 = conflict
		}

		const newSubscriber = await prisma.newsletter.create({
			data: { email },
		})

		return NextResponse.json(newSubscriber)
	} catch (error) {
		return NextResponse.json({ message: "Post Error", error }, { status: 500 })
	}
}