import { isAuthFailure, requireOwnership } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { slug } = await params

		const post = await prisma.post.update({
			where: { slug },
			data: { views: { increment: 1 } },
			include: {
				user: { include: { personal: true } },
				blogCategory: true,
				comment: true,
			},
		})

		if (!post) {
			return NextResponse.json({ message: "post not found" }, { status: 404 })
		}
		return NextResponse.json(post)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const PATCH = async (request, { params }) => {
	try {
		const { slug } = await params
		const existing = await prisma.post.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "Post not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		const body = await request.json()
		const { title, catSlug, description, img, isFeatured, videoId, tags, subTitle } = body

		const updated = await prisma.post.update({
			where: { slug },
			data: { title, catSlug, description, img, isFeatured, videoId, tags, subTitle },
		})

		return NextResponse.json(updated)
	} catch (error) {
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	try {
		const { slug } = await params
		const existing = await prisma.post.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "Post not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		await prisma.post.delete({ where: { slug } })
		return NextResponse.json("Post has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
