import { getAuthSession } from "@/utils/auth"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET(req) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2024-06-20",
	})

	const session = await getAuthSession()

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
	const subscriptionID = session.user.subscriptionID

	// const stripeCustomerId = 'cus_QxDrsxCfSSS07L'
	// const subscriptionID = 'sub_1Q5JQbRqE9xgf3eDl1aIzvRT'

	const subscription = await stripe.subscriptions.update(
		subscriptionID,
		{
			cancel_at_period_end: true,
		}
	)

	return NextResponse.json({ subscription }, { status: 200 })
}
