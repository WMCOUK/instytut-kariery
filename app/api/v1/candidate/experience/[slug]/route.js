import { isAuthFailure, requireOwnership } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { slug } = await params
		const experience = await prisma.candidateExperience.findUnique({ where: { slug } })

		if (!experience) {
			return NextResponse.json({ message: "Experience not found" }, { status: 404 })
		}
		return NextResponse.json(experience)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const PATCH = async (request, { params }) => {
	try {
		const { slug: paramSlug } = await params
		const existing = await prisma.candidateExperience.findUnique({
			where: { slug: paramSlug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "Experience not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		const body = await request.json()
		const { title, slug, companyName, description, joinDate, leaveDate, isCurrentJob } = body

		const updated = await prisma.candidateExperience.update({
			where: { slug: paramSlug },
			data: { title, slug, companyName, description, joinDate, leaveDate, isCurrentJob },
		})

		return NextResponse.json(updated)
	} catch (error) {
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	try {
		const { slug } = await params
		const existing = await prisma.candidateExperience.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "Experience not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		await prisma.candidateExperience.delete({ where: { slug } })
		return NextResponse.json("Experience has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
