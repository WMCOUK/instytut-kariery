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

			}
		})

		if (!recruiter) {
			return NextResponse.json(
				{ message: "recruiter not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(recruiter)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}




export const PATCH = async (request, { params }) => {
	try {
		const body = await request.json()
		const {
			title,
			email,
			image,
			coverPhoto,
			jobIndustrySlug,
			description,
			content,
			taxId,
			phone,
			website,
			yearFounded,
			numberOfEmployees,
			country,
			state,
			address,
			city,
			latitude,
			longitude,
			postalCode,
			seoMeta,
			socialLinksId,
		} = body

		const { slug } = await params

		// Update the recruiter record by slug
		const updatedRecruiter = await prisma.recruiter.update({
			where: { slug },
			data: {
				title,
				email,
				image,
				coverPhoto,
				jobIndustrySlug,
				description,
				content,
				taxId,
				phone,
				website,
				yearFounded,
				numberOfEmployees,
				country,
				state,
				address,
				city,
				latitude,
				longitude,
				postalCode,
				seoMeta,
				socialLinksId,
			},
		})

		// Return the updated data
		return NextResponse.json(updatedRecruiter)
	} catch (error) {
		// Handle errors and respond appropriately
		console.error("Error updating recruiter:", error)
		if (error.code === "P2025") {
			// Handle record not found
			return NextResponse.json(
				{ message: "Recruiter not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(
			{ message: "Update Error", error: error.message },
			{ status: 500 }
		)
	}
}



export const DELETE = async (request, { params }) => {
	try {

		const { slug } = await params

		await prisma.recruiter.delete({
			where: { slug }
		})

		return NextResponse.json("order has been deleted")

	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}