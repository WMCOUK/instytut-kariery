import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const category = await prisma.blogCategory.findUnique({
			where: { slug },
			include: {
				posts: true
			}
		})

		if (!category) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(category)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}



export const PATCH = async (requsest, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {
		// if (session.user.isAdmin) {
		const body = await requsest.json()
		const { title, img } = body

		const updateCategory = await prisma.blogCategory.update({
			where: {
				slug
			},
			data: {
				title,
				img
			}
		})

		if (!updateCategory) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			)
		}
		// }
		return NextResponse.json(updateCategory)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		if (session.user.isAdmin) {
			await prisma.blogCategory.delete({
				where: { slug }
			})
		}
		return NextResponse.json("Category has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}