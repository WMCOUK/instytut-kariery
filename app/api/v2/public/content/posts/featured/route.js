import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {

        const featuredPost = await prisma.post.findMany({
            take: 6,
            where: {
                isFeatured: true
            },
            orderBy: {
                createdAt: 'asc'
            },
            include: {
                user: true,
                comment: true // Singular form if "comment" is the correct relation name
            }
        })
        return new NextResponse(JSON.stringify(featuredPost, { status: 200 }))

    } catch (error) {
        return NextResponse.json({ message: "Get Error", error }, { status: 500 })
    }
}