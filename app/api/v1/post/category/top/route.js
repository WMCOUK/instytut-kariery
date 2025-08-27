import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (requsest) => {
	try {

		const topCategories = await prisma.blogCategory.findMany({
			take: 6,
			orderBy: {
				posts: {
					_count: 'desc'
				}
			},
			include: {
				_count: {
					select: {
						posts: true,
					}
				},
			}
		})
		return new NextResponse(JSON.stringify(topCategories, { status: 200 }))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}

