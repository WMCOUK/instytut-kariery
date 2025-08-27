'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Download, ServerCog, Settings } from "lucide-react"

const paymentIntegration = [
	{
		title: "Overview",
		items: [
			"Recruitly integrates **Stripe** for subscription and billing management.",
			"Key API endpoints include:",
			"- **Checkout Sessions**: Create subscriptions via `/api/v1/stripe/checkout-session`.",
			"- **Customer Portal**: Manage subscriptions via `/api/v1/stripe/customer-portal-session`.",
			"- **Webhooks**: Handle payment events (e.g., subscription updates) via `/api/v1/webhooks`.",
		],
	},
	{
		title: "Components",
		items: [
			"`SubscriptionCard.jsx`: Displays subscription plans.",
			"`CancelSubscription.jsx`, `ResumeSubscription.jsx`: Manage subscription status.",
		],
	},
	{
		title: "Testing Stripe Integration",
		items: [
			"Use Stripe’s test keys in `.env`.",
			"Run `npm run webhooks` to listen for webhook events.",
			"Test checkout flows using Stripe’s test cards.",
		],
	},
]

function Step({ number, title, children, icon }) {
	return (
		<section className="space-y-3">
			<div className="flex items-center space-x-3">
				<div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
					{number}
				</div>
				<h2 className="text-xl font-semibold">{title}</h2>
				{icon && <div className="text-primary">{icon}</div>}
			</div>
			<div className="pl-11">{children}</div>
		</section>
	)
}

export default function PaymentIntegration({ title = "Payment Integration", path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-10">
				<Card className="bg-card border-primary/20 shadow-md">
					<CardHeader>
						<CardTitle className="text-2xl">Setting Up Stripe with Next.js</CardTitle>
						<CardDescription className="text-base max-w-prose">
							Integrate Stripe into your Next.js project for seamless payment processing,
							including Checkout, API routes, and Webhooks.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-8">
						<Step number={1} title="Install Stripe" icon={<Download className="w-5 h-5" />}>
							<p>
								To get started, install the Stripe Node.js SDK in your Next.js project. This SDK lets you
								create Checkout sessions, handle webhooks, and process payments securely.
							</p>
							<pre className="bg-primary/10 p-4 rounded-md font-mono text-sm select-all">
								npm install stripe
							</pre>
						</Step>

						<Step number={2} title="Configure Your <code>.env</code> File" icon={<Settings className="w-5 h-5" />}>
							<p>Stripe requires several keys to interact with its API. Add these to your environment variables:</p>
							<pre className="bg-primary/10 p-4 rounded-md font-mono text-sm whitespace-pre-wrap select-all">
								{`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_publishable_key>
STRIPE_SECRET_KEY=<your_secret_key>
STRIPE_WEBHOOK_SECRET=<your_webhook_secret>`}
							</pre>
							<div className="mt-3 space-y-1 text-sm">
								<p><code className="font-mono bg-muted px-1 rounded">your_publishable_key</code>: Public key for front-end operations like creating Checkout sessions.</p>
								<p><code className="font-mono bg-muted px-1 rounded">your_secret_key</code>: Secret key for backend API calls (e.g., creating customers).</p>
								<p><code className="font-mono bg-muted px-1 rounded">your_webhook_secret</code>: Secret to verify Stripe webhook events.</p>
							</div>
						</Step>

						<Step number={3} title="Create API Routes" icon={<ServerCog className="w-5 h-5" />}>
							<p>
								Create API routes to handle Stripe Checkout sessions and webhook events. Your webhook route
								will receive events like subscription updates and update your database accordingly.
							</p>
							<h3 className="font-semibold mt-4 mb-2">Webhook API Route Example</h3>
							<div className="bg-muted p-4 rounded-md font-mono text-xs max-h-72 overflow-auto whitespace-pre-wrap">
								{`import prisma from "@/utils/prismadb"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" })
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req) {
  try {
    const buf = await req.text()
    const sig = req.headers.get("stripe-signature")

    let event
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err) {
      console.error("Webhook Error:", err.message)
      return NextResponse.json({ error: { message: err.message } }, { status: 400 })
    }

    const subscription = event.data.object
    switch (event.type) {
      case "customer.subscription.created":
        await prisma.user.update({
          where: { stripeCustomerId: subscription.customer },
          data: { isSubscription: true, subscriptionID: subscription.id, subPriceId: subscription.metadata.subPriceId }
        })
        break
      case "customer.subscription.deleted":
        await prisma.user.update({
          where: { stripeCustomerId: subscription.customer },
          data: { isSubscription: false }
        })
        break
      default:
        console.warn("Unhandled event type:", event.type)
    }
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Unhandled Error:", error.message)
    return NextResponse.json({ error: { message: "Method Not Allowed" } }, { status: 405 })
  }
}`}
							</div>
						</Step>

						<Step number={4} title="Front-End Integration">
							<p>Use Stripe’s JS SDK to redirect users to the Checkout page.</p>
							<pre className="bg-primary/10 p-4 rounded-md font-mono text-sm select-all">
								{`import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-publishable-key");

async function redirectToCheckout() {
  const stripe = await stripePromise;
  const response = await fetch("/api/v1/stripe/checkout-session", { method: "POST" });
  const session = await response.json();

  if (session.id) {
    await stripe.redirectToCheckout({ sessionId: session.id });
  } else {
    console.error("Failed to create checkout session");
  }
}`}
							</pre>
						</Step>

						<Step number={5} title="Handle Webhook Events">
							<p>
								Use Stripe webhooks to listen for events like successful payments and update your backend accordingly.
							</p>
							<pre className="bg-primary/10 p-4 rounded-md font-mono text-sm select-all">
								{`const stripe = new Stripe('your-secret-key');
stripe.webhooks.constructEvent(req.body, sig, 'your-webhook-secret');`}
							</pre>
						</Step>
					</CardContent>
				</Card>

				<Separator className="my-8" />

				{paymentIntegration.map(({ title, items }, idx) => (
					<Card key={idx} className="border shadow-sm">
						<CardHeader className="flex items-center space-x-2">
							<CreditCard className="h-5 w-5 text-primary" />
							<h3 className="text-lg font-semibold text-foreground">{title}</h3>
						</CardHeader>
						<CardContent>
							<ul
								className="list-disc list-inside space-y-2 text-muted-foreground text-sm whitespace-pre-wrap"
								dangerouslySetInnerHTML={{
									__html: items
										.map(item =>
											item
												.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
												.replace(/`([^`]+)`/g, '<code class="bg-muted px-1 rounded">$1</code>')
												.replace(/\n/g, '<br/>')
										)
										.join(""),
								}}
							/>
						</CardContent>
					</Card>
				))}
			</div>
		</DocsContent>
	)
}
