import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export async function GET(request) {
	const { searchParams } = new URL(request.url)
	const jobSlug = searchParams.get("jobSlug")
	const candidateId = searchParams.get("candidateId")

	if (!jobSlug || !candidateId) {
		return NextResponse.json({ error: "Missing jobSlug or candidateId" }, { status: 400 })
	}

	try {
		const application = await prisma.application.findFirst({
			where: {
				jobSlug,
				candidateId,
				submitted: "true",
			},
		})

		return NextResponse.json({ exists: !!application })
	} catch (error) {
		console.error("Error checking application:", error)
		return NextResponse.json({ error: "Failed to check application" }, { status: 500 })
	}
}

