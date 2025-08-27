import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
  const { searchParams } = new URL(request.url)
  const postSlug = searchParams.get("postSlug")
  
  try {
    const comments = await prisma.comment.findMany({
      where: { postSlug },
      include: { user: true }, // Include user info in the comment
      orderBy: { createdAt: 'desc' } // Optional: Order by latest comments
    })
    
    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ message: "Get Error", error }, { status: 500 })
  }
}

export const POST = async (request) => {
  const session = await getAuthSession()
  
  if (!session) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { description, postSlug } = body

    const newComment = await prisma.comment.create({
      data: {
        description,
        postSlug,
        userId: session.user.id // Link comment to authenticated user
      }
    })

    return NextResponse.json(newComment)
  } catch (error) {
    return NextResponse.json({ message: "Post Error", error }, { status: 500 })
  }
}
