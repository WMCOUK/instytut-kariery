import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req) {
	try {
		const buf = await req.text()
		const sig = req.headers.get("stripe-signature")

		let event

		try {
			event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
			console.log(`Received webhook with event: ${event}`)
		} catch (err) {
			const errorMessage = err ? err.message : "Unknown error"
			console.error(`Webhook Error: ${errorMessage}`)
			return NextResponse.json(
				{
					error: {
						message: `Webhook Error: ${errorMessage}`,
					},
				},
				{ status: 400 }
			)
		}

		// console.log("✅ Success:", event.id)

		const subscription = event.data.object
		const subscriptionId = subscription.id

		switch (event.type) {
			case "customer.subscription.created":
				await prisma.user.update({
					where: {
						stripeCustomerId: subscription.customer,
					},
					data: {
						isSubscription: true,
						subscriptionID: subscriptionId,
						subPriceId: subscription.metadata.subPriceId,
					},
				})
				break
			case "customer.subscription.deleted":
				await prisma.user.update({
					where: {
						stripeCustomerId: subscription.customer,
					},
					data: {
						isSubscription: false,
					},
				})
				break
			case "checkout.session.completed":
				await prisma.user.update({
					where: {
						stripeCustomerId: subscription.customer,
					},
					data: {
						// isSubscription: true,
						// subscriptionID: subscriptionId,
						sponPriceId: subscription.metadata.sponPriceId,
					},
				})
				break
			default:
				console.warn(`Unhandled event type: ${event.type}`)
				break
		}

		return NextResponse.json({ received: true })
	} catch (error) {
		console.error(`Unhandled Error: ${error.message}`)
		return NextResponse.json(
			{
				error: {
					message: `Method Not Allowed`,
				},
			},
			{ status: 405 }
		)
	}
}
