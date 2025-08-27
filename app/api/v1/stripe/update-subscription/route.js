import Stripe from "stripe"


export async function POST(request) {

	// const body = await request.json()
	// const { stripeCustomerId, subscriptionID } = body

	const stripeCustomerId = 'cus_QxDrsxCfSSS07L'
	const subscriptionID = 'sub_1Q5JQbRqE9xgf3eDl1aIzvRT'
	const newPriceId = 'price_1PW3EgRqE9xgf3eD8TWH88tu'

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2024-06-20",
	})

	if (!stripeCustomerId || !subscriptionID) {
		throw new Error("User not subscribed!")
	}

	const subscription = await stripe.subscriptions.retrieve(subscriptionID)

	await stripe.subscriptions.update(subscriptionID, {
		cancel_at_period_end: false,
		trial_end: "now",
		items: [
			...subscription.items.data.map((item) => ({
				id: item.id,
				deleted: true,
			})),
			{
				price: newPriceId,
			}
		]
	})

	return Response.json({ subscription }, { status: 200 })

}