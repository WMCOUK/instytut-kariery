import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SubscriptionPastDueAlert() {
  return (
	<>
		<Alert variant="warning">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Payment Past Due</AlertTitle>
      <AlertDescription>
        Your latest payment has failed. Update your payment method to continue this plan.
      </AlertDescription>
    </Alert>
	</>
  )
}
