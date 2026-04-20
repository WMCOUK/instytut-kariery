import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { slug } = await params

		const category = await prisma.blogCategory.findUnique({
			where: { slug },
			include: { posts: true },
		})

		if (!category) {
			return NextResponse.json({ message: "Category not found" }, { status: 404 })
		}
		return NextResponse.json(category)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const PATCH = async (request, { params }) => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const { slug } = await params
		const body = await request.json()
		const { title, img } = body

		const updateCategory = await prisma.blogCategory.update({
			where: { slug },
			data: { title, img },
		})

		return NextResponse.json(updateCategory)
	} catch (error) {
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const { slug } = await params
		await prisma.blogCategory.delete({ where: { slug } })
		return NextResponse.json("Category has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
