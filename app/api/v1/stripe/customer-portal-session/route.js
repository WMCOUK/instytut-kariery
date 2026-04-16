import { isAuthFailure, requireAuth } from "@/utils/apiAuth"
import { baseUrl } from "@/utils/baseUrl"
import Stripe from "stripe"

export const POST = async (request) => {
	const authResult = await requireAuth()
	if (isAuthFailure(authResult)) return authResult

	const stripeCustomerId = authResult.user.stripeCustomerId

	if (!stripeCustomerId) {
		return Response.json({ message: "No Stripe Customer ID" }, { status: 400 })
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2024-06-20",
	})

	const session = await stripe.billingPortal.sessions.create({
		customer: stripeCustomerId,
		return_url: `${baseUrl}/subscription`,
	})

	return Response.json({ session }, { status: 200 })
}
