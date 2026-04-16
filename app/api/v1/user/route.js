import { POST_PER_PAGE } from '@/utils'
import { isAuthFailure, requireRole } from '@/utils/apiAuth'
import prisma from '@/utils/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request) => {
	const session = await requireRole(["ADMIN"])
	if (isAuthFailure(session)) return session

	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1")
	const take = POST_PER_PAGE
	const skip = POST_PER_PAGE * (page - 1)

	try {
		const users = await prisma.user.findMany({
			skip,
			take,
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				userName: true,
				email: true,
				isRole: true,
				onboard: true,
				isBanned: true,
				isSubscription: true,
				subPriceId: true,
				subscriptionID: true,
				stripeCustomerId: true,
				createdAt: true,
				updatedAt: true,
				// Sensitive fields intentionally excluded:
				// hashedPassword, resetPasswordToken, resetPasswordTokenExpiry,
				// emailVerificationToken
				personal: true,
				preference: true,
				candidate: true,
			},
		})

		const totalUser = await prisma.user.count()

		return NextResponse.json({
			users,
			totalPage: Math.ceil(totalUser / take),
			totalUser,
			currentPage: page,
		})
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
