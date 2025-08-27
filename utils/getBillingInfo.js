import { baseUrl } from "./baseUrl"

export async function getBillingInfo(stripeCustomerId, subscriptionID) {
	if (!stripeCustomerId || !subscriptionID) return null

	const res = await fetch(`${baseUrl}/api/v1/stripe/user-billing-info`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ stripeCustomerId, subscriptionID })
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch billing info: ${res.status} ${res.statusText}`)
	}

	const data = await res.json()
	return data
}