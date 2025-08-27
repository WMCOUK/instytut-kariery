import { loadStripe } from '@stripe/stripe-js'

let stripePromise

const getStripe = () => {
	if (!stripePromise) {
		const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
		if (!stripeKey) {
			throw new Error('Stripe publishable key is not set in environment variables')
		}
		stripePromise = loadStripe(stripeKey)
	}
	return stripePromise
}

export default getStripe
