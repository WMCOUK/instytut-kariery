import { isAuthFailure, requireOwnership } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { slug } = await params

		const socialLink = await prisma.socialLink.findUnique({
			where: { slug },
		})

		if (!socialLink) {
			return NextResponse.json({ message: "socialLink not found" }, { status: 404 })
		}
		return NextResponse.json(socialLink)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const PATCH = async (request, { params }) => {
	const { slug } = await params
	const existing = await prisma.socialLink.findUnique({
		where: { slug },
		select: { userId: true },
	})
	if (!existing) {
		return NextResponse.json({ message: "socialLink not found" }, { status: 404 })
	}

	const session = await requireOwnership(existing.userId)
	if (isAuthFailure(session)) return session

	try {
		const body = await request.json()
		const { title, url } = body

		const updateSocialLink = await prisma.socialLink.update({
			where: { slug },
			data: { title, url },
		})

		return NextResponse.json(updateSocialLink)
	} catch (error) {
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	const { slug } = await params
	const existing = await prisma.socialLink.findUnique({
		where: { slug },
		select: { userId: true },
	})
	if (!existing) {
		return NextResponse.json({ message: "socialLink not found" }, { status: 404 })
	}

	const session = await requireOwnership(existing.userId)
	if (isAuthFailure(session)) return session

	try {
		await prisma.socialLink.delete({ where: { slug } })
		return NextResponse.json("socialLink has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
