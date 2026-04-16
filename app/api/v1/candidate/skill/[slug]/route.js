import { isAuthFailure, requireOwnership } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { slug } = await params
		const skill = await prisma.candidateSkill.findUnique({ where: { slug } })

		if (!skill) {
			return NextResponse.json({ message: "Skill not found" }, { status: 404 })
		}
		return NextResponse.json(skill)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export async function PATCH(request, { params }) {
	try {
		const { slug } = await params
		const existing = await prisma.candidateSkill.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "Skill not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		const body = await request.json()
		const { title, percentage } = body

		const updated = await prisma.candidateSkill.update({
			where: { slug },
			data: {
				title,
				percentage: percentage ? parseInt(percentage, 10) : null,
			},
		})

		return NextResponse.json(updated)
	} catch (error) {
		console.error("Update Error:", error)
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	try {
		const { slug } = await params
		const existing = await prisma.candidateSkill.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "Skill not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		await prisma.candidateSkill.delete({ where: { slug } })
		return NextResponse.json("Skill has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
