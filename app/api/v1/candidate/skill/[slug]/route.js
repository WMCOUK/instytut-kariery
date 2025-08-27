import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const skill = await prisma.candidateSkill.findUnique({
			where: { slug },
			// include: {
			// 	posts: true
			// }
		})

		if (!skill) {
			return NextResponse.json(
				{ message: "Skill not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(skill)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}



export async function PATCH(request, { params }) {
	const { slug } = await params
	const session = await getAuthSession()

	if (!session?.user?.id) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	}

	try {
		const body = await request.json()
		const { title, percentage } = body

		const updateSkill = await prisma.candidateSkill.update({
			where: {
				slug,
			},
			data: {
				title,
				percentage: percentage ? parseInt(percentage, 10) : null,
				userId: session.user?.id
			}
		})

		if (!updateSkill) {
			return NextResponse.json({ message: "Skill not found or you don't have permission to update it" }, { status: 404 })
		}

		return NextResponse.json(updateSkill)
	} catch (error) {
		console.error("Update Error:", error)
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const session = await getAuthSession()
	try {

		// if (session.user.isAdmin) {
		await prisma.candidateSkill.delete({
			where: { slug }
		})
		// }
		return NextResponse.json("Skill has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}