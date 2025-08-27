import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const post = await prisma.post.update({
			where: { slug },
			data: { views: { increment: 1 } },
			include: {
				user: {
					include: {
						personal: true,
					},
				},
				blogCategory: true,
				comment: true,
			},
		})

		if (!post) {
			return NextResponse.json(
				{ message: "post not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(post)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}



export const PATCH = async (requsest, { params }) => {
	// const session = await getAuthSession()
	// if (!session) {
	//     return new NextResponse(JSON.stringify({ message: "Not Authenticated" }, { status: 401 }))
	// }
	try {
		const body = await requsest.json()
		const { title, catSlug, description, img, isFeatured, videoId, tags, subTitle } = body
		const { slug } = await params

		// if (session.user.isAdmin) {
		const updatePost = await prisma.post.update({
			where: {
				slug
			},
			data: {
				title, catSlug, description, img, isFeatured, videoId, tags, subTitle
			}
		})

		if (!updatePost) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			)
		}

		// }
		return NextResponse.json(updatePost)
	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	// const session = await getAuthSession()
	try {
		// if (session.user.isAdmin) {
		const { slug } = await params

		await prisma.post.delete({
			where: { slug }
		})

		return NextResponse.json("Post has been deleted")
		// }
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}