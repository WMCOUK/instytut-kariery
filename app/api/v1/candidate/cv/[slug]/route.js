import { isAuthFailure, requireOwnership } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { slug } = await params
		const cv = await prisma.candidateCv.findUnique({ where: { slug } })

		if (!cv) {
			return NextResponse.json({ message: "cv not found" }, { status: 404 })
		}
		return NextResponse.json(cv)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const PATCH = async (request, { params }) => {
	try {
		const { slug } = await params
		const existing = await prisma.candidateCv.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "CV not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		const body = await request.json()
		const { title, fileUrl, fileSize } = body

		const updated = await prisma.candidateCv.update({
			where: { slug },
			data: {
				title,
				fileUrl: fileUrl ? fileUrl : undefined,
				fileSize: fileSize ? fileSize : undefined,
			},
		})

		return NextResponse.json(updated)
	} catch (error) {
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	try {
		const { slug } = await params
		const existing = await prisma.candidateCv.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "CV not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		await prisma.candidateCv.delete({ where: { slug } })
		return NextResponse.json("Cv has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
