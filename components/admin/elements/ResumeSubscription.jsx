"use client"

import { Button } from "@/components/ui/button"
// import div from "@/components/ui/flex-col"
export default function ResumeSubscription() {
	return (
		<>
			<div className="gap-12">
				<h2 className="text-xl">Resume Subscription</h2>
				<div className="p-4 bg-secondary shadow-lg max-w-4xl rounded-lg">
					<p>
						You cancelled your subscription and you will lose access to paid features when your
						current period ends. Having second thoughts? You can resume your subscription before
						your current period ends, to maintain access to paid features.
					</p>
					<p>
						<span className="font-bold">Current Period Ends:</span> [Insert Date]
					</p>
					<Button className="mt-4">Resume Subscription</Button>
				</div>
			</div>

		</>
	)
}
