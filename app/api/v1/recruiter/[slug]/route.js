import { isAuthFailure, requireOwnership, requireRole } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { slug } = await params

		const recruiter = await prisma.recruiter.update({
			where: { slug },
			data: { views: { increment: 1 } },
			include: {
				job: true,
				jobIndustry: true,
				rating: true,
			},
		})

		if (!recruiter) {
			return NextResponse.json({ message: "recruiter not found" }, { status: 404 })
		}
		return NextResponse.json(recruiter)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export const PATCH = async (request, { params }) => {
	try {
		const { slug } = await params

		const existing = await prisma.recruiter.findUnique({
			where: { slug },
			select: { userId: true },
		})
		if (!existing) {
			return NextResponse.json({ message: "Recruiter not found" }, { status: 404 })
		}

		const session = await requireOwnership(existing.userId)
		if (isAuthFailure(session)) return session

		const body = await request.json()
		const {
			title, email, image, coverPhoto, jobIndustrySlug, description, content,
			taxId, phone, website, yearFounded, numberOfEmployees, country, state,
			address, city, latitude, longitude, postalCode, seoMeta, socialLinksId,
		} = body

		const updatedRecruiter = await prisma.recruiter.update({
			where: { slug },
			data: {
				title, email, image, coverPhoto, jobIndustrySlug, description, content,
				taxId, phone, website, yearFounded, numberOfEmployees, country, state,
				address, city, latitude, longitude, postalCode, seoMeta, socialLinksId,
			},
		})

		return NextResponse.json(updatedRecruiter)
	} catch (error) {
		console.error("Error updating recruiter:", error)
		if (error.code === "P2025") {
			return NextResponse.json({ message: "Recruiter not found" }, { status: 404 })
		}
		return NextResponse.json({ message: "Update Error", error: error.message }, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	try {
		const { slug } = await params
		await prisma.recruiter.delete({ where: { slug } })
		return NextResponse.json("Recruiter has been deleted")
	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error: error.message }, { status: 500 })
	}
}
