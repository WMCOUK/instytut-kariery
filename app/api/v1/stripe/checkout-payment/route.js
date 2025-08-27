
import { getAuthSession } from "@/utils/auth"
import { baseUrl } from "@/utils/baseUrl"
import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req) {
	try {
		const body = await req.json()
		// console.log(body)

		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2024-06-20",
		})

		const session = await getAuthSession()
		console.log(session)

		if (!session?.user) {
			return NextResponse.json(
				{
					error: {
						code: "no-access",
						message: "You are not signed in.",
					},
				},
				{ status: 401 }
			)
		}

		const user = session.user

		// Check if user has a Stripe customer ID, if not create one
		if (!user.stripeCustomerId) {
			const customer = await stripe.customers.create({
				email: user?.email,
				name: user?.name || "Anonymous",
			})

			// Update the user in the database with the new Stripe customer ID
			await prisma.user.update({
				where: {
					email: user.email,
				},
				data: {
					stripeCustomerId: customer.id,
				},
			})

			// Update the session user object with the new Stripe customer ID
			user.stripeCustomerId = customer.id
		}

		// Create a Stripe checkout session
		const checkoutSession = await stripe.checkout.sessions.create({
			mode: "payment",
			customer: user.stripeCustomerId,
			line_items: [
				{
					price: body.sponPriceId, // Assuming body contains the sponPriceId
					quantity: 1,
				},
			],
			success_url: `${baseUrl}/recruiter/billing?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: baseUrl,
			metadata: {
				payingUserId: user.stripeCustomerId,
				sponPriceId: body.sponPriceId,
				userId: user.id,
			},
		})

		if (!checkoutSession.url) {
			return NextResponse.json(
				{
					error: {
						code: "stripe-error",
						message: "Could not create checkout session",
					},
				},
				{ status: 500 }
			)
		}

		return NextResponse.json({ session: checkoutSession }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{
				error: {
					code: "server-error",
					message: error.message || "An unexpected error occurred.",
				},
			},
			{ status: 500 }
		)
	}
}
