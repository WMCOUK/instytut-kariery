import { isAuthFailure, requireOwnership } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { id } = await params
		const comment = await prisma.comment.findUnique({ where: { id } })

		if (!comment) {
			return NextResponse.json({ message: "comment not found" }, { status: 404 })
		}
		return NextResponse.json(comment)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const PATCH = async (request, { params }) => {
	try {
		const { id } = await params
		const existing = await prisma.comment.findUnique({
			where: { id },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "comment not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		const body = await request.json()

		const updated = await prisma.comment.update({
			where: { id },
			data: { ...body },
		})

		return NextResponse.json(updated)
	} catch (error) {
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	try {
		const { id } = await params
		const existing = await prisma.comment.findUnique({
			where: { id },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "comment not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		await prisma.comment.delete({ where: { id } })
		return NextResponse.json("comment has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
