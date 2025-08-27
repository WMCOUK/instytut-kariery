// import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
	try {

		const { id } = await params

		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				post: true,
				recruiter: true,
				jobLocation: true,
				jobIndustry: true,
				jobPosition: true,
				jobExperience: true,
				jobWorkMode: true,
				jobType: true,
				job: true,
				rating: true,
				personal: true,
				preference: true,
				candidate: true,
				candidateCv: true,
				candidateExperience: true,
				candidateEducation: true,
				candidateSkill: true,
				application: true,

				// subscription: true,
				// profile: true
			}
		})

		if (!user) {
			return NextResponse.json(
				{ message: "user not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(user)

	} catch (error) {
		return NextResponse.json({ message: "Get Error", error }, { status: 500 })
	}
}



export const PATCH = async (requsest, { params }) => {
	try {
		const body = await requsest.json()
		const { userName, email, isRole, onboard, isBanned, subPriceId } = body
		const { id } = await params

		const updateuser = await prisma.user.update({
			where: {
				id
			},
			data: {
				userName, email, isRole, onboard, isBanned, subPriceId
			}
		})

		if (!updateuser) {
			return NextResponse.json(
				{ message: "user not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json(updateuser)

	} catch (error) {
		return NextResponse.json({ message: "Update Error", error }, { status: 500 })
	}
}


export const DELETE = async (request, { params }) => {
	try {

		const { id } = await params

		await prisma.user.delete({
			where: { id }
		})

		return NextResponse.json("user has been deleted")

	} catch (error) {
		return NextResponse.json({ message: "Delete Error", error }, { status: 500 })
	}
}