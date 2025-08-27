import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { slug } = await params

		const job = await prisma.job.update({
			where: { slug },
			data: { views: { increment: 1 } },
			include: {
				recruiter: {
					select: {
						title: true,
						slug: true,
						image: true,
						coverPhoto: true,
						city: true,
						numberOfEmployees: true,
						yearFounded: true,
						phone: true,
						email: true,
						website: true,
					},
				},
				jobType: { select: { title: true } },
				jobExperience: { select: { title: true } },
				jobIndustry: { select: { title: true } },
				jobLocation: { select: { title: true } },
				jobPosition: { select: { title: true } },
				jobWorkMode: { select: { title: true } },
				// application: true,
			},
		})


		if (!job) {
			return NextResponse.json(
				{ message: "job not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(job)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}



export const PATCH = async (request, { params }) => {
	try {
		const body = await request.json()
		const {
			title,
			description,
			image,
			content,
			numberOfPositions,
			maxApplicants,
			skills,
			benefit,
			minSalary,
			maxSalary,
			salaryRange,
			currency,
			jobExperience,
			jobType,
			jobIndustrySlug,
			recruiterSlug,
			// jobIndustryTitle,
			latitude,
			longitude,
			workMode,
			jobLocation,
			jobPosition,
			applyUrl,
			status,
			moderation,
			isFeatured,
			isFavourite,
			isFreelance,
			isSponsored,
			startDate,
			closingDate,
		} = body

		const { slug } = await params

		const updateJob = await prisma.job.update({
			where: {
				slug,
			},
			data: {
				title,
				description,
				image,
				content,
				numberOfPositions,
				maxApplicants,
				skills,
				benefit,
				minSalary,
				maxSalary,
				salaryRange,
				currency,
				recruiterSlug,
				jobExperience,
				jobType,
				jobIndustrySlug,
				// jobIndustryTitle,
				latitude,
				longitude,
				workMode,
				jobLocation,
				jobPosition,
				applyUrl,
				status,
				moderation,
				isFeatured,
				isFavourite,
				isFreelance,
				isSponsored,
				startDate: startDate ? new Date(startDate) : null,
				closingDate: closingDate ? new Date(closingDate) : null,
			},
		})

		if (!updateJob) {
			return NextResponse.json(
				{ message: "Job not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json(updateJob)

	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: "Update Error", error: error.message },
			{ status: 500 }
		)
	}
}


export const DELETE = async (request, { params }) => {
	try {

		const { slug } = await params

		await prisma.job.delete({
			where: { slug }
		})

		return NextResponse.json("order has been deleted")

	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}