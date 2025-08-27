import { baseUrl } from "@/utils/baseUrl"
import Stripe from "stripe"

export const POST = async (request) => {

	// const body = await request.json()
	// const { stripeCustomerId, subscriptionID } = body

	const stripeCustomerId = 'cus_QxDrsxCfSSS07L'
	const subscriptionID = 'sub_1Q5JQbRqE9xgf3eDl1aIzvRT'


	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2024-06-20",
	})

	if (!stripeCustomerId) {
		return Response.json({ message: "No Stripe Customer ID" }, { status: 400 })
	}

	const session = await stripe.billingPortal.sessions.create({
		customer: stripeCustomerId,
		return_url: `${baseUrl}/subscription`,
	})

	return Response.json({ session }, { status: 200 })
}