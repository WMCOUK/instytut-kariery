import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function CompleteRecruiterProfileBanner() {
	return (
		<div className="bg-primary rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-primary-foreground my-6 sm:my-8">
			<Image
				src="/images/placeholder.svg?height=48&width=48"
				alt="Profile picture"
				width={48}
				height={48}
				className="rounded-full"
			/>
			<div className="flex-1 text-center sm:text-left">
				<h2 className="font-medium text-base sm:text-lg">Your profile editing is not completed.</h2>
				<p className="text-sm text-primary-foreground/90">Complete your profile editing & build your custom Resume</p>
			</div>
			<Button variant="secondary" className="whitespace-nowrap gap-2 mt-2 sm:mt-0" size="sm">
				Edit Profile
				<ArrowRight className="w-4 h-4" />
			</Button>
		</div>
	)
}

