import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const latestPosts = await prisma.post.findMany({
			take: 6,
			orderBy: {
				createdAt: "desc"
			},
			include: { user: true, comment: true }
		})
		return NextResponse.json({ posts: latestPosts })
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}

