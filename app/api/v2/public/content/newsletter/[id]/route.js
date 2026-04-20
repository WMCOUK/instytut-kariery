import { isAuthFailure, requireRole } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const { id } = await params

		const newsletter = await prisma.newsletter.findUnique({
			where: { id },
		})

		if (!newsletter) {
			return NextResponse.json({ message: "newsletter not found" }, { status: 404 })
		}
		return NextResponse.json(newsletter)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const { id } = await params
		await prisma.newsletter.delete({ where: { id } })
		return NextResponse.json("newsletter has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
