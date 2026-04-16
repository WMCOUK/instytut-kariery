import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request) {
	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	const subscriptionID = session.user.subscriptionID

	if (!subscriptionID) {
		return NextResponse.json({ message: "User not subscribed" }, { status: 400 })
	}

	const body = await request.json()
	const { newPriceId } = body

	if (!newPriceId) {
		return NextResponse.json({ message: "Missing newPriceId" }, { status: 400 })
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2024-06-20",
	})

	const subscription = await stripe.subscriptions.retrieve(subscriptionID)

	await stripe.subscriptions.update(subscriptionID, {
		cancel_at_period_end: false,
		trial_end: "now",
		items: [
			...subscription.items.data.map((item) => ({
				id: item.id,
				deleted: true,
			})),
			{ price: newPriceId },
		],
	})

	return NextResponse.json({ subscription }, { status: 200 })
}
