import { TABLE_ROW_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { maxRecruiters, subscription } from "@/utils/subscription"
// import { maxRecruiters, subscription } from "@/utils/subscription"
import { NextResponse } from "next/server"

export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = TABLE_ROW_PAGE
	const skip = TABLE_ROW_PAGE * (page - 1)

	const user = await currentUserServer()
	if (!user) {
		return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
	}

	// const isAdmin = user.isRole === "ADMIN"
	const where = { userId: user.id }

	try {
		const recruiters = await prisma.recruiter.findMany({
			skip,
			take,
			include: { job: true, jobIndustry: true },
			where,
		})

		const totalRecruiter = await prisma.recruiter.count({ where })

		return NextResponse.json({
			recruiters,
			totalPage: Math.ceil(totalRecruiter / take),
			totalRecruiter,
			currentPage: page,
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	const user = await currentUserServer()
	const { subPriceId } = user || {}

	const body = await request.json()
	// console.log(body);

	const subscriptionPlan = subscription.find((plan) => plan.subPriceId === subPriceId)

	if (!subscriptionPlan) {
		return new Response(
			JSON.stringify({ error: "Invalid subPriceId" }),
			{ status: 400 }
		)
	}



	const planType = subscriptionPlan.planType
	const currentRecruiters = await prisma.recruiter.count({
		where: { userId: user.id },
	})

	if (currentRecruiters >= maxRecruiters[planType]) {
		return new Response(
			JSON.stringify({
				error: `You can only create up to ${maxRecruiters[planType]} recruiter accounts with the ${planType} plan. Please upgrade your plan to add more.`,
				redirect: "/subscription",
			}),
			{ status: 403 }
		)
	}

	const recruiter = await prisma.recruiter.create({
		data: {
			...body,
			userId: user?.id,
		},
	})

	return NextResponse.json(recruiter)
}
