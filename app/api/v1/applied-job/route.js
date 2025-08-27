import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"


export const GET = async (requsest) => {
	try {
		const user = await currentUserServer()
		const applications = await prisma.application.findMany({
			where: {
				userId: user?.id,
			},
			orderBy: { appliedAt: "desc" },
			include: {
				user: true,
				job: true,
				recruiter: true
			}
		})
		return new NextResponse(JSON.stringify({ applications }, { status: 200 }))

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}


export async function POST(request) {

	try {
		const body = await request.json()
		// console.log("Received body:", body)
		const user = await currentUserServer()
		if (!body || typeof body !== "object") {
			console.error("Invalid request body:", body)
			return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
		}

		const { coverLetter, cvFileUrl, candidateCvSlug, jobSlug, recruiterSlug, candidateId, status } = body

		if (!jobSlug || !candidateId || !candidateCvSlug || !cvFileUrl) {
			console.error("Missing required fields:", { jobSlug, candidateId, candidateCvSlug, cvFileUrl })
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
				userId: user?.id,
				// appliedAt: new Date(),
			},
			include: {
				user: true,
				job: true,
				recruiter: true
			}
		})

		console.log("Created application:", application)
		return NextResponse.json(application)
	} catch (error) {
		console.error("Application submission error:", error)
		return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
	}
}

