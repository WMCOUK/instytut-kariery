// import DocsContent from '@/components/layout/docs/content'
import DocsContent from '@/components/landing/layout/docs/content'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Payments({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<Card className="bg-card border-primary/10">
				<CardHeader>
					<CardTitle>Setting Up Stripe with Next.js</CardTitle>
					<CardDescription>
						Integrate Stripe into your Next.js project for seamless payment processing, including Checkout, API routes, and Webhooks.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<h2 className="text-xl font-semibold">1. Install Stripe</h2>
					<p>
						To get started, you'll need to install the Stripe Node.js SDK in your Next.js project. This allows you to handle payment processing, Checkout sessions, and webhooks securely.
					</p>
					<pre className="bg-primary/10 p-4 rounded-md">
						<code>npm install stripe</code>
					</pre>

					<h2 className="text-xl font-semibold">2. Configure Your .env File</h2>
					<p>
						Stripe requires several keys to interact with its API. These keys should be stored in your environment variables. Create or modify your `.env` file with the following keys:
					</p>
					<pre className="bg-primary/10 p-4 rounded-md">
						<code>{`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_publishable_key>
STRIPE_SECRET_KEY=<your_secret_key>
STRIPE_WEBHOOK_SECRET=<your_webhook_secret>
						`}</code>
					</pre>
					<p>
						- `<span className="font-mono">your_publishable_key</span>`: Your Stripe public key used for front-end operations (e.g., creating checkout sessions).
					</p>
					<p>
						- `<span className="font-mono">your_secret_key</span>`: Your Stripe secret key used for backend API calls (e.g., creating customers, processing payments).
					</p>
					<p>
						- `<span className="font-mono">your_webhook_secret</span>`: Your Stripe webhook secret key used to verify events from Stripe webhooks.
					</p>

					<h2 className="text-xl font-semibold">3. Create API Routes</h2>
					<p>
						Create API routes for Stripe Checkout sessions and webhooks. This will ensure that your app can process payments securely. Below is an example of how to handle Stripe webhook events in your application:
					</p>

					<h3 className="text-lg font-semibold">Webhook API Route</h3>
					<p>
						Stripe webhooks allow your server to listen for events that occur in your Stripe account. The most common events to listen for are `customer.subscription.created` and `customer.subscription.deleted`, which can trigger updates to your user data.
					</p>
					{/* <pre className="bg-primary/10 p-4 rounded-md">
						<code>
							{`import prisma from "@/utils/prismadb"
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
		} catch (err) {
			const errorMessage = err ? err.message : "Unknown error"
			console.error(\`Webhook Error: \${errorMessage}\`)
			return NextResponse.json(
				{
					error: {
						message: \`Webhook Error: \${errorMessage}\`,
					},
				},
				{ status: 400 }
			)
		}

		console.log("✅ Success:", event.id)

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
			default:
				console.warn(\`Unhandled event type: \${event.type}\`)
				break
		}

		return NextResponse.json({ received: true })
	} catch (error) {
		console.error(\`Unhandled Error: \${error.message}\`)
		return NextResponse.json(
			{
				error: {
					message: \`Method Not Allowed\`,
				},
			},
			{ status: 405 }
		)
	}
}
							`}
						</code>
					</pre> */}

					<h2 className="text-xl font-semibold">4. Front-End Integration</h2>
					<p>
						On the front-end, you can use the Stripe Checkout integration to redirect the user to a payment page. Here’s a simple example of how to trigger the checkout flow:
					</p>
					<pre className="bg-primary/10 p-4 rounded-md">
						<code>
							{`
const stripe = await Stripe('your-publishable-key');

const session = await fetch("/api/v1/checkout-session", { method: "POST" });

stripe.redirectToCheckout({ sessionId: session.id });
              `}
						</code>
					</pre>

					<h2 className="text-xl font-semibold">5. Handle Webhook Events</h2>
					<p>
						You can set up Stripe webhooks to listen for events like successful payments and take actions based on these events.
					</p>
					<pre className="bg-primary/10 p-4 rounded-md">
						<code>
							{`
const stripe = new Stripe('your-secret-key');

stripe.webhooks.constructEvent(req.body, sig, 'your-webhook-secret');
              `}
						</code>
					</pre>
				</CardContent>
			</Card>
		</DocsContent>
	)
}
