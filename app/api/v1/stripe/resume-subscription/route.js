import Stripe from "stripe"

export const POST = async (request) => {

	// const body = await request.json()
	// const { stripeCustomerId, subscriptionID } = body

	// const user = await currentUserServer()

	// console.log('****************************',user)

	const stripeCustomerId = 'cus_QxDrsxCfSSS07L'
	const subscriptionID = 'sub_1Q5JQbRqE9xgf3eDl1aIzvRT'

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2024-06-20",
	})

	if (!stripeCustomerId || !subscriptionID) {
		throw new Error("User not subscribed!")
	}

	const resumedSubscription = await stripe.subscriptions.update(subscriptionID, {
		cancel_at_period_end: false,
	})

	return Response.json({ resumedSubscription }, { status: 200 })
}