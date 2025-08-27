
// Get active subscription
export function getActiveSubscription(data) {
	if (!data.subscriptions) return null

	return data.subscriptions.data.find((subscription) => {
		return subscriptionIsConsideredActive(subscription)
	}) || null  // Return null if not found
}

// Check if subscription is considered active
export function subscriptionIsConsideredActive(subscription) {
	const isNotUnpaidOrCanceled = !["canceled", "unpaid"].includes(subscription.status)
	const cancelAtIsInTheFuture =
		!subscription.cancel_at || subscription.cancel_at * 1000 > Date.now()

	return isNotUnpaidOrCanceled && cancelAtIsInTheFuture
}

// Check if user is on a trial subscription
export function isOnTrial(data) {
	const activeSubscription = getActiveSubscription(data)
	if (!activeSubscription) return false

	return activeSubscription.status === "trialing"
}

// Check if any subscription is past due
export function isSubscriptionPastDue(data) {
	if (!data.subscriptions) return false

	const pastDueSubscription = data.subscriptions.data.find((subscription) => {
		return subscription.status === "past_due"
	})

	return Boolean(pastDueSubscription)
}

// Check if there are any past due invoices
export function hasPastDueInvoice(data) {
	if (!data.invoices) return false

	return data.invoices.data.some((invoice) => {
		return invoice.status === "open" && invoice.attempted && invoice.amount_remaining > 0
	})
}
