"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import getStripe from "@/utils/getStripe"
import { Check, Loader2 } from 'lucide-react'
import { useState } from 'react'

export const SubscriptionCard = ({ planType, price, subPriceId, isCurrentSubscription, features, popular }) => {
	const [isLoading, setIsLoading] = useState(false)

	const handleCreateCheckoutSession = async () => {
		if (isCurrentSubscription || isLoading) return

		setIsLoading(true)

		try {
			const res = await fetch("/api/v1/stripe/checkout-session", {
				method: "POST",
				body: JSON.stringify({ subPriceId: subPriceId }),
				headers: {
					"Content-Type": "application/json",
				},
			})

			if (!res.ok) {
				throw new Error(`Error: ${res.statusText}`)
			}

			const { session } = await res.json()
			if (!session || !session.id) {
				throw new Error("Invalid session returned from server")
			}

			const stripe = await getStripe()
			const { error } = await stripe.redirectToCheckout({
				sessionId: session.id,
			})

			if (error) {
				console.error("Error redirecting to checkout:", error)
			}
		} catch (error) {
			console.error("Error creating checkout session:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card className={`
      relative
      h-full
      flex flex-col
      ${!isCurrentSubscription ? "hover:scale-102" : ""} 
      transition-all duration-300 
      border-2 ${popular ? 'border-primary' : 'border-muted'}
      ${popular ? 'shadow-lg shadow-primary/20' : 'shadow-md'}
    `}>
			{popular && (
				<div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
					Popular
				</div>
			)}
			<CardHeader className="pb-4">
				<CardTitle className="text-2xl font-bold">{planType}</CardTitle>
				<div className="text-3xl font-bold mt-2">
					{price}<span className="text-base font-normal text-muted-foreground">/month</span>
				</div>
			</CardHeader>
			<CardContent className="flex-grow">
				<ul className="space-y-2">
					{features.map((feature, index) => (
						<li key={index} className="flex items-start">
							<Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
							<span className="text-sm text-muted-foreground">{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="pt-4">
				<Button
					variant={isCurrentSubscription ? "secondary" : "default"}
					className="w-full font-semibold"
					disabled={isCurrentSubscription || isLoading}
					onClick={handleCreateCheckoutSession}
				>
					{isCurrentSubscription ? (
						"Current Plan"
					) : isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Processing...
						</>
					) : (
						"Subscribe Now"
					)}
				</Button>
			</CardFooter>
		</Card>
	)
}

