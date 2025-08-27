import Stripe from "stripe"
export const POST = async (request) => {
	const body = await request.json()
	const { stripeCustomerId, subscriptionID } = body

	// const stripeCustomerId = 'cus_QxDrsxCfSSS07L'
	// const subscriptionID = 'sub_1Q5JQbRqE9xgf3eDl1aIzvRT'

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2024-06-20",
	})
	try {


		if (!stripeCustomerId) {
			return Response.json({ message: "No Stripe Customer ID" }, { status: 400 })
		}

		let subscriptions = null

		if (subscriptionID) {
			subscriptions = await stripe.subscriptions.list({
				customer: stripeCustomerId,
				limit: 1
			})
		}

		const [customer, paymentMethods, invoices] = await Promise.all([
			stripe.customers.retrieve(stripeCustomerId),
			stripe.paymentMethods.list({
				customer: stripeCustomerId,
			}),
			stripe.invoices.list({
				customer: stripeCustomerId,
				limit: 100
			})
		])

		return Response.json({ customer, paymentMethods, invoices, subscriptions }, { status: 200 })

	} catch (error) {
		return Response.json({ message: "Get Error", error }, { status: 500 })
	}
	// }
}