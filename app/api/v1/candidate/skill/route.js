import { ATTRIBUTE_PER_PAGE } from "@/utils"
import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {
		const session = await getAuthSession()
		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
		}
		const skills = await prisma.candidateSkill.findMany({
			skip,
			take,
			where: {
				userId: session?.user?.id,
			}
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
		const totalSkill = await prisma.candidateSkill.count()

		return new NextResponse(JSON.stringify({
			skills,
			totalPage: Math.ceil(totalSkill / take)
		}))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}


export const POST = async (request) => {
	const session = await getAuthSession()
	if (!session?.user?.id) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	}
	try {
		const body = await request.json()
		// console.log(body)


		const newcandidateSkill = await prisma.candidateSkill.create({
			data: {
				...body,
				userId: session?.user?.id,
			}
		})

		return NextResponse.json(newcandidateSkill)

	} catch (error) {
		return NextResponse.json({ message: "Post Error", error }, { status: 500 })
	}
}