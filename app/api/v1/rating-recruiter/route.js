import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url)
		const recruiterSlug = searchParams.get("slug")

		if (!recruiterSlug) {
			return NextResponse.json({ message: "Recruiter slug is required" }, { status: 400 })
		}

		const ratings = await prisma.rating.findMany({
			where: { recruiterSlug },
			include: {
				user: {
					include: {
						personal: true, // This includes the related Personal model from the user
					},
				},
			},
			orderBy: { createdAt: "desc" },
		})

		const totalRatings = ratings.length

		const summary = [5, 4, 3, 2, 1].map((stars) => {
			const count = ratings.filter((r) => Math.floor(r.rating) === stars).length
			const percentage = totalRatings ? Math.round((count / totalRatings) * 100) : 0
			return { stars, percentage }
		})

		const avg =
			totalRatings > 0
				? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
				: 0

		const reviews = ratings.map((r, i) => ({
			id: `${r.user?.id ?? "unknown"}-${i}`,
			name: `${r.user?.personal?.name || "Anonymous"}`,
			image: r.user?.personal?.image  || "/images/placeholder.svg",
			rating: r.rating,
			content: r.content || "No review content provided.",
			verified: r.verified,
			author: r.user?.name ?? "Anonymous",
			date: r.createdAt ? new Date(r.createdAt).toDateString() : "Unknown date",
		}))

		return NextResponse.json({
			summary,
			averageRating: Number(avg.toFixed(1)),
			totalCount: totalRatings,
			reviews,
		})
	} catch (error) {
		console.error("Error fetching ratings:", error)
		return NextResponse.json({ message: "Internal server error" }, { status: 500 })
	}
}

export async function POST(req) {
	try {
		const session = await getAuthSession()
		if (!session?.user) {
			return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
		}

		const { recruiterSlug, rating, content = "" } = await req.json()
		const userId = session.user.id

		if (
			!recruiterSlug ||
			typeof rating !== "number" ||
			rating < 0.5 ||
			rating > 5 ||
			(content && typeof content !== "string")
		) {
			return NextResponse.json({ message: "Invalid input" }, { status: 400 })
		}

		const existing = await prisma.rating.findFirst({
			where: { userId, recruiterSlug },
		})

		if (existing) {
			await prisma.rating.update({
				where: { id: existing.id },
				data: { rating, content },
			})
		} else {
			await prisma.rating.create({
				data: { recruiterSlug, userId, rating, content },
			})
		}

		// Recalculate average rating after insert/update
		const allRatings = await prisma.rating.findMany({
			where: { recruiterSlug },
			select: { rating: true },
		})

		const avg =
			allRatings.length > 0
				? allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
				: 0

		await prisma.recruiter.update({
			where: { slug: recruiterSlug },
			data: {
				averageRating: avg,
				ratingCount: allRatings.length,
			},
		})

		return NextResponse.json({
			averageRating: Number(avg.toFixed(1)),
			ratingCount: allRatings.length,
		})
	} catch (error) {
		console.error("Error submitting rating:", error)
		return NextResponse.json({ message: "Internal server error" }, { status: 500 })
	}
}
