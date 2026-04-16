import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	try {
		const applications = await prisma.application.findMany({
			where: { userId: session.user.id },
			orderBy: { appliedAt: "desc" },
			include: {
				user: true,
				job: true,
				recruiter: true,
			},
		})
		return NextResponse.json({ applications })
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	try {
		const body = await request.json()
		if (!body || typeof body !== "object") {
			return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
		}

		const { coverLetter, cvFileUrl, candidateCvSlug, jobSlug, recruiterSlug, candidateId, status } = body

		if (!jobSlug || !candidateId || !candidateCvSlug || !cvFileUrl) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
		}

		const application = await prisma.application.create({
			data: {
				coverLetter,
				cvFileUrl,
				candidateCvSlug,
				jobSlug,
				candidateId,
				recruiterSlug,
				status: status || "pending",
				submitted: "true",
				userId: session.user.id,
			},
			include: {
				user: true,
				job: true,
				recruiter: true,
			},
		})

		return NextResponse.json(application)
	} catch (error) {
		console.error("Application submission error:", error)
		return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
	}
}
