import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {
		const { id } = await params

		const candidate = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				userName: true,
				email: true,
				onboard: true,
				createdAt: true,
				personal: true,
				candidate: true,
				candidateSkill: true,
				candidateExperience: true,
				candidateEducation: true,
				candidateCv: true,
			},
		})

		if (!candidate) {
			return NextResponse.json({ message: "candidate not found" }, { status: 404 })
		}

		const isPublic = candidate.candidate?.publicProfile === true
		if (!isPublic) {
			const session = await getAuthSession()
			const isSelf = session?.user?.id === id
			const isAdmin = session?.user?.isRole === "ADMIN"
			if (!isSelf && !isAdmin) {
				return NextResponse.json({ message: "Not found" }, { status: 404 })
			}
		}

		return NextResponse.json(candidate)
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
