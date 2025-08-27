import { ATTRIBUTE_PER_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {

		const workModes = await prisma.jobWorkMode.findMany({
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
		const totalWorkMode = await prisma.jobWorkMode.count()

		return new NextResponse(JSON.stringify({
			workModes,
			totalPage: Math.ceil(totalWorkMode / take)
		}))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}


export const POST = async (request) => {
	try {
		const body = await request.json()

		const newType = await prisma.jobWorkMode.create({
			data: {
				...body
			}
		})

		return NextResponse.json(newType)

	} catch (error) {
		return NextResponse.json({ message: "Post Error", error }, { status: 500 })
	}
}