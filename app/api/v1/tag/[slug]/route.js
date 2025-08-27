import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	const { slug } = await params
	try {

		const tags = await prisma.post.findMany({
			where: {
				tags: {
					has: slug
				}
			}
		})

		return NextResponse.json(tags)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}
