import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req) {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2024-06-20",
		})
		const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
		const buf = await req.text()
		const sig = req.headers.get("stripe-signature")

		let event
		try {
			event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
		} catch (err) {
			const errorMessage = err ? err.message : "Unknown error"
			console.error(`Webhook Error: ${errorMessage}`)
			return NextResponse.json(
				{ error: { message: `Webhook Error: ${errorMessage}` } },
				{ status: 400 }
			)
		}

		// Idempotency: insert eventId BEFORE processing.
		// On duplicate (Stripe retried an already-processed event), the create
		// throws P2002 — we catch it and ack with 200 so Stripe stops retrying
		// without re-running side effects.
		try {
			await prisma.stripeWebhookEvent.create({
				data: { eventId: event.id, type: event.type },
			})
		} catch (e) {
			if (e?.code === "P2002") {
				return NextResponse.json({ received: true, deduplicated: true })
			}
			throw e
		}

		const subscription = event.data.object
		const subscriptionId = subscription.id

		switch (event.type) {
			case "customer.subscription.created":
				await prisma.user.update({
					where: { stripeCustomerId: subscription.customer },
					data: {
						isSubscription: true,
						subscriptionID: subscriptionId,
						subPriceId: subscription.metadata.subPriceId,
					},
				})
				break
			case "customer.subscription.deleted":
				await prisma.user.update({
					where: { stripeCustomerId: subscription.customer },
					data: { isSubscription: false },
				})
				break
			case "checkout.session.completed":
				await prisma.user.update({
					where: { stripeCustomerId: subscription.customer },
					data: { sponPriceId: subscription.metadata.sponPriceId },
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
			{ error: { message: `Method Not Allowed` } },
			{ status: 405 }
		)
	}
}
