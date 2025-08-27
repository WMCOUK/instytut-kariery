import { ATTRIBUTE_PER_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"
export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {

		const cvs = await prisma.candidateCv.findMany({
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
		const totalCv = await prisma.candidateCv.count()

		return new NextResponse(JSON.stringify({
			cvs,
			totalPage: Math.ceil(totalCv / take)
		}))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}


// export const POST = async (request) => {
// 	try {
// 		const body = await request.json()
// 		console.log(body);


// 		const newCandidateCv = await prisma.candidateCv.create({
// 			data: {
// 				...body
// 			}
// 		})

// 		return NextResponse.json(newCandidateCv)

// 	} catch (error) {
// 		return NextResponse.json({ message: "Post Error", error }, { status: 500 })
// 	}
// }

export const POST = async (request) => {
	try {
		const isUser = await currentUserServer()
		// console.log("Received user:", isUser?.id)

		if (!isUser?.id) {
			return NextResponse.json({ message: "Unauthorized: User not found" }, { status: 401 })
		}

		const body = await request.json()
		// console.log("Received data:", body)

		const newCandidateCv = await prisma.candidateCv.create({
			data: {
				title: body.title || null,
				slug: body.slug,
				fileUrl: body.fileUrl || null,
				fileSize: body.fileSize ? Number.parseFloat(body.fileSize) : null,
				userId: isUser.id,
			},
		})

		return NextResponse.json(newCandidateCv, { status: 201 })
	} catch (error) {
		console.error("Post Error:", error instanceof Error ? error.message : "Unknown error")

		if (error instanceof Error) {
			if (error.name === "PrismaClientKnownRequestError" && error.code === "P2002") {
				return NextResponse.json(
					{ message: "A CV with this title already exists. Please choose a different title." },
					{ status: 400 },
				)
			}

			return NextResponse.json({ message: "Post Error", error: error.message }, { status: 500 })
		}

		return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
	}
}
