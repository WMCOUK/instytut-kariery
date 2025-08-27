"use client"

import { Button } from "@/components/ui/button"
import currentUserClient from "@/utils/currentUserClient"
import { useRouter } from "next/navigation"
import { toast } from "sonner" // Import sonner for toast notifications

export default function CancelSubscription() {
	const currentUser = currentUserClient()
	// console.log(currentUser);

	const router = useRouter()

	// Check if currentUser exists and has an id
	if (!currentUser || !currentUser.id) {
		return (
			<Button variant="destructive" className="mt-4" disabled>
				User not found
			</Button>
		)
	}

	const { id } = currentUser

	const handleCancelSubscription = async () => {
		try {
			// Step 1: Cancel the subscription with Stripe
			const res = await fetch("/api/v1/stripe/cancel-subscription")
			const { subscription } = await res.json()

			// Handle response validation for Stripe cancellation
			if (!res.ok || !subscription) {
				throw new Error("Failed to cancel subscription")
			}
			console.log(subscription)

			// Step 2: Remove the user's subPriceId (or reset subscription) on the backend
			const updateRes = await fetch(`/api/v1/user/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ subPriceId: null }), // Or pass the subPriceId from the subscription object if needed
			})

			if (!updateRes.ok) {
				throw new Error("Failed to remove subPriceId from user")
			}

			// Step 3: Show success toast
			toast.success("Your subscription has been successfully cancelled!")

			// Redirect to subscription page
			router.push("/subscription")
		} catch (error) {
			console.error(error)
			// Show error toast if there was an issue
			toast.error("There was an issue canceling your subscription. Please try again.")
		}
	}

	return (
		<Button
			variant="destructive" // or choose another variant based on your preference
			className="mt-4"
			onClick={handleCancelSubscription}
		>
			Cancel Subscription
		</Button>
	)
}
