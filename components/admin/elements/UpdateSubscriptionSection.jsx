import { Switch } from "@/components/ui/switch"
// import { SubscriptionCard } from './SubscriptionCard'
export default function UpdateSubscriptionSection() {
	return (
		<>
			<div className='flex'>
				<h2 className="text-xl">Subscription Plans</h2>
				<p className="max-w-3xl">
					Pick a monthly or yearly subscription plan to unlock all the features of [App Name].
					You can cancel your subscription anytime after subscribing.
				</p>
				<div className="flex-row">
					<span>Monthly</span>
					<Switch checked={true} /> {/* Static switch without functionality */}
					<span>Yearly</span>
				</div>


				{/* <SubscriptionCard
					key={"price-id-1"}
					price={{ interval: "month", amount: "10.00" }}
					isCurrentSubscription={false}
				/> */}


				{/* <SubscriptionCard
					key={"price-id-2"}
					price={{ interval: "year", amount: "100.00" }}
					isCurrentSubscription={false}
				/> */}
			</div>

		</>
	)
}
