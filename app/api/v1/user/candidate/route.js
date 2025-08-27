import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

// PATCH: Update Candidate Profile
export async function PATCH(request) {
	const session = await getAuthSession()
	if (!session?.user) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	const { credits, publish, availableForHire, publicProfile, hideCv, isFeatured } = await request.json()
	const userId = session.user.id

	try {
		const updatedCandidate = await prisma.candidate.upsert({
			where: { userId },
			update: { credits, publish, availableForHire, publicProfile, hideCv, isFeatured },
			create: { userId, credits, publish, availableForHire, publicProfile, hideCv, isFeatured },
		})

		return NextResponse.json({ success: true, data: updatedCandidate })
	} catch (error) {
		return NextResponse.json({ message: "Error updating candidate info", error: error.message }, { status: 500 })
	}
}

// GET: Fetch Candidate Data
export async function GET(request) {
	const { searchParams } = new URL(request.url)
	const userId = searchParams.get("userId")

	try {
		const candidate = await prisma.candidate.findUnique({
			where: { userId },
			include: { user: true },
		})

		if (!candidate) return NextResponse.json({ message: "Candidate not found" }, { status: 404 })

		return NextResponse.json({ success: true, data: candidate })
	} catch (error) {
		return NextResponse.json({ message: "Error fetching candidate info", error: error.message }, { status: 500 })
	}
}
