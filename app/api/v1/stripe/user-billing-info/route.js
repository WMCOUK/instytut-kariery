import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export const POST = async (request) => {
	const session = await requireAuth()
	if (isAuthFailure(session)) return session

	// Pull these from the authenticated session — NEVER trust client-supplied IDs.
	const stripeCustomerId = session.user.stripeCustomerId
	const subscriptionID = session.user.subscriptionID

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2024-06-20",
	})

	try {
		if (!stripeCustomerId) {
			return NextResponse.json({ message: "No Stripe Customer ID" }, { status: 400 })
		}

		let subscriptions = null

		if (subscriptionID) {
			subscriptions = await stripe.subscriptions.list({
				customer: stripeCustomerId,
				limit: 1,
			})
		}

		const [customer, paymentMethods, invoices] = await Promise.all([
			stripe.customers.retrieve(stripeCustomerId),
			stripe.paymentMethods.list({ customer: stripeCustomerId }),
			stripe.invoices.list({ customer: stripeCustomerId, limit: 10 }),
		])

		return NextResponse.json({ customer, paymentMethods, invoices, subscriptions }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: "Get Error", error: error.message }, { status: 500 })
	}
}
