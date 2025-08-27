import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

import { ATTRIBUTE_PER_PAGE } from "@/utils"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {
		const session = await getAuthSession()
		const userId = session.user.id
		const favouriteJobs = await prisma.favouriteJob.findMany({
			where: {
				userId: userId
			},
			skip,
			take,
			// orderBy: {
			// 	posts: {
			// 		_count: 'desc'
			// 	}
			// },
			include: {
				job: true,
			}
		})
		const totalFavouriteJob = await prisma.favouriteJob.count()

		return new NextResponse(JSON.stringify({
			favouriteJobs,
			totalFavouriteJob,
			totalPage: Math.ceil(totalFavouriteJob / take)
		}))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}
export async function POST(request) {
	const session = await getAuthSession()

	if (!session?.user) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	const { jobSlug } = await request.json()
	const userId = session.user.id

	try {
		const job = await prisma.job.findUnique({ where: { slug: jobSlug } })
		if (!job) {
			return NextResponse.json({ message: "Job not found" }, { status: 404 })
		}

		const existing = await prisma.favouriteJob.findFirst({
			where: { userId, jobSlug }
		})

		if (existing) {
			await prisma.favouriteJob.delete({ where: { id: existing.id } })

			const stillHasFavourites = await prisma.favouriteJob.findMany({
				where: { jobSlug }
			})

			await prisma.job.update({
				where: { slug: jobSlug },
				data: {
					isFavourite: stillHasFavourites.length > 0,
					updatedAt: new Date()
				}
			})

			return NextResponse.json({ isFavourite: false })
		} else {
			await prisma.favouriteJob.create({
				data: { userId, jobSlug }
			})

			await prisma.job.update({
				where: { slug: jobSlug },
				data: {
					isFavourite: true,
					updatedAt: new Date()
				}
			})

			return NextResponse.json({ isFavourite: true })
		}
	} catch (error) {
		console.error("Error:", error)
		return NextResponse.json({ message: "Error", error: error.message }, { status: 500 })
	}
}
