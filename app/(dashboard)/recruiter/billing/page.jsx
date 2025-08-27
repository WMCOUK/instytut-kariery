
// import ActiveSubscriptionSection from "@/components/elements/ActiveSubscriptionSection"
// import CancelSubscription from "@/components/admin/elements/CancelSubscription"
// import InvoiceDownload from "@/components/admin/elements/InvoiceDownload"
// import ResumeSubscription from "@/components/elements/ResumeSubscription"
import { PaymentCard } from "@/components/admin/elements/PaymentCard"
import { SubscriptionCard } from "@/components/admin/elements/SubscriptionCard"
// import SubscriptionPastDueAlert from "@/components/elements/SubscriptionPastDueAlert"
// import UnpaidInvoiceAlert from "@/components/elements/UnpaidInvoiceAlert"
// import UpdateSubscriptionSection from "@/components/elements/UpdateSubscriptionSection"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
// import { getActiveSubscription, hasPastDueInvoice, isOnTrial, isSubscriptionPastDue } from "@/utils/billing"
import currentUserServer from "@/utils/currentUserServer"
// import { getBillingInfo } from "@/utils/getBillingInfo"
import { sponsorPackage, subscription } from "@/utils/subscription"
// import { redirect } from "next/navigation"

export default async function PlanBilling() {
	const user = await currentUserServer()
	// if (!user) {
	// 	redirect('/signin')
	// }
	// console.log("user========================>>>>>>>>>>>>>>>>>>>>>", user)

	const { stripeCustomerId, subscriptionID, subPriceId, sponPriceId } = user || {}
	// const isBillingInfo = await getBillingInfo(stripeCustomerId, subscriptionID)

	// const userSubscription = getActiveSubscription(isBillingInfo)
	// const isTrialing = isOnTrial(isBillingInfo)
	// const subscriptionIsPastDue = isSubscriptionPastDue(isBillingInfo)
	// const hasUnpaidInvoice = hasPastDueInvoice(isBillingInfo)
	// const willBeCancelledAtPeriodEnd = userSubscription?.cancel_at_period_end

	return (
		<LayoutAdmin>

			<div className="m-auto w-fit flex flex-col justify-center pt-12">
				<div className="grid lg:grid-cols-3 gap-5">
					{subscription?.map((sub, i) => (
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
					{sponsorPackage?.map((sub, i) => (
						<PaymentCard
							key={i}
							packageType={sub.packageType}
							price={sub.price}
							sponPriceId={sub.sponPriceId}
							isCurrentSponsorPackage={sub.sponPriceId === sponPriceId}
							features={sub.features}
							popular={sub.popular}
						/>
					))}
				</div>
				{/* <InvoiceDownload user={user} isBillingInfo={isBillingInfo} /> */}
				{/* <CancelSubscription /> */}

				{/* <SubscriptionPastDueAlert />

				<UnpaidInvoiceAlert />

				<ActiveSubscriptionSection />

				<UpdateSubscriptionSection />

				<ResumeSubscription /> */}

			</div>
		</LayoutAdmin>
	)
}


