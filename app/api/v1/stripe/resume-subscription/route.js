import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export const POST = async (request) => {
	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	const subscriptionID = session.user.subscriptionID

	if (!subscriptionID) {
		return NextResponse.json({ message: "User not subscribed" }, { status: 400 })
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2024-06-20",
	})

	const resumedSubscription = await stripe.subscriptions.update(subscriptionID, {
		cancel_at_period_end: false,
	})

	return NextResponse.json({ resumedSubscription }, { status: 200 })
}
