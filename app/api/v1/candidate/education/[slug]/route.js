import { isAuthFailure, requireOwnership } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { slug } = await params
		const education = await prisma.candidateEducation.findUnique({ where: { slug } })

		if (!education) {
			return NextResponse.json({ message: "Education not found" }, { status: 404 })
		}
		return NextResponse.json(education)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const PATCH = async (request, { params }) => {
	try {
		const { slug } = await params
		const existing = await prisma.candidateEducation.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "Education not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		const body = await request.json()
		const { title, instituteName, description, startDate, endDate, isCurrentStudy } = body

		const updated = await prisma.candidateEducation.update({
			where: { slug },
			data: { title, instituteName, description, startDate, endDate, isCurrentStudy },
		})

		return NextResponse.json(updated)
	} catch (error) {
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	try {
		const { slug } = await params
		const existing = await prisma.candidateEducation.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "Education not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		await prisma.candidateEducation.delete({ where: { slug } })
		return NextResponse.json("Education has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
