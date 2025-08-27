import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {

        const trendingPosts = await prisma.post.findMany({
            take: 6,
            orderBy: {
                views: 'desc'
            }
        })
        return new NextResponse(JSON.stringify(trendingPosts, { status: 200 }))

    } catch (error) {
        return NextResponse.json({ message: "Get Error", error }, { status: 500 })
    }
}

