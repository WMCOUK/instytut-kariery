import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export default function CompleteCandidateProfileBanner() {
	return (
		<>
			<div className="bg-primary rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-primary-foreground  mb-5">
				<Image
					src="/images/placeholder.svg?height=48&width=48"
					alt="Profile picture"
					width={48}
					height={48}
					className="rounded-full"
				/>
				<div className="flex-1 text-center sm:text-left">
					<h2 className="font-medium text-base sm:text-lg">Your profile editing is not completed.</h2>
					<p className="text-xs sm:text-sm text-primary-foreground/90">
						Complete your profile editing & build your custom Resume
					</p>
				</div>
				<Button variant="secondary" className="whitespace-nowrap gap-2 mt-3 sm:mt-0 w-full sm:w-auto">
					Edit Profile
					<ArrowRight className="w-4 h-4" />
				</Button>
			</div>
		</>
	)
}

