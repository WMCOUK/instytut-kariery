import { SubscriptionCard } from "@/components/admin/elements/SubscriptionCard"
import currentUserClient from "@/utils/currentUserClient"
import { subscription } from "@/utils/subscription"
import { redirect } from "next/navigation"

export default function PricingDialog() {
	const user = currentUserClient()
	if (!user) {
		redirect('/signin')
	}
	// console.log("user========================>>>>>>>>>>>>>>>>>>>>>", user)

	const { stripeCustomerId, subscriptionID, subPriceId } = user || {}

	return (
		<>
			<div className="grid lg:grid-cols-3 gap-5">
				{subscription.map((sub, i) => (
					<SubscriptionCard
						key={i}
						planType={sub.planType}
						price={sub.price}
						subPriceId={sub.subPriceId}
						isCurrentSubscription={sub.subPriceId === subPriceId}
						features={sub.features}
						popular={sub.popular}
					/>
				))}
			</div>
		</>
	)
}



