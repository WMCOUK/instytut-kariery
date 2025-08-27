import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const cv = await prisma.candidateCv.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!cv) {
			return NextResponse.json(
				{ message: "cv not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(cv)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}




export const PATCH = async (request, { params }) => {
	const session = await getAuthSession()

	if (!session?.user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	}

	try {
		const { slug } = params
		const body = await request.json()
		const { title, fileUrl, fileSize } = body
		const userId = session.user.id

		const updateCv = await prisma.candidateCv.updateMany({
			where: { slug, userId },
			data: {
				title,
				fileUrl: fileUrl ? fileUrl : undefined, // Update only if new value exists
				fileSize: fileSize ? fileSize : undefined,
			},
		})

		if (updateCv.count === 0) {
			return NextResponse.json({ message: "CV not found or unauthorized" }, { status: 404 })
		}

		return NextResponse.json({ message: "CV updated successfully" })
	} catch (error) {
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}



export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.candidateCv.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("Cv has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}