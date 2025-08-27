import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UnpaidInvoiceAlert() {
	return (
		<>
			<Alert variant="destructive">
				<ExclamationTriangleIcon className="h-4 w-4" />
				<AlertTitle>Unpaid Invoice</AlertTitle>
				<AlertDescription>
					You have unpaid invoice. See your invoice history to pay the outstanding invoice and avoid
					late payment fees.
				</AlertDescription>
			</Alert>
		</>
	)
}
