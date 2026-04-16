import { ATTRIBUTE_PER_PAGE } from "@/utils"
import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import { rateLimit } from "@/utils/rateLimit"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {
		const userId = session.user.id
		const favouriteJobs = await prisma.favouriteJob.findMany({
			where: { userId },
			skip,
			take,
			include: { job: true },
		})
		const totalFavouriteJob = await prisma.favouriteJob.count({ where: { userId } })

		return NextResponse.json({
			favouriteJobs,
			totalFavouriteJob,
			totalPage: Math.ceil(totalFavouriteJob / take),
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	const limited = rateLimit(request, { id: "favourite-job", max: 30, windowMs: 60_000 })
	if (limited) return limited

	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	const { jobSlug } = await request.json()
	const userId = session.user.id

	try {
		const job = await prisma.job.findUnique({ where: { slug: jobSlug } })
		if (!job) {
			return NextResponse.json({ message: "Job not found" }, { status: 404 })
		}

		const existing = await prisma.favouriteJob.findFirst({
			where: { userId, jobSlug },
		})

		if (existing) {
			await prisma.favouriteJob.delete({ where: { id: existing.id } })

			const stillHasFavourites = await prisma.favouriteJob.findMany({
				where: { jobSlug },
			})

			await prisma.job.update({
				where: { slug: jobSlug },
				data: {
					isFavourite: stillHasFavourites.length > 0,
					updatedAt: new Date(),
				},
			})

			return NextResponse.json({ isFavourite: false })
		} else {
			await prisma.favouriteJob.create({
				data: { userId, jobSlug },
			})

			await prisma.job.update({
				where: { slug: jobSlug },
				data: {
					isFavourite: true,
					updatedAt: new Date(),
				},
			})

			return NextResponse.json({ isFavourite: true })
		}
	} catch (error) {
		console.error("Error:", error)
		return NextResponse.json({ message: "Error", error: error.message }, { status: 500 })
	}
}
