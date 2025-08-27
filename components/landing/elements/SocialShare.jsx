"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { baseUrl } from "@/utils/baseUrl"
import { Facebook, RssIcon as Reddit, Share, X } from "lucide-react"
import { FacebookShareButton, RedditShareButton, TwitterShareButton } from "next-share"

export default function ShareDropdown() {
	const shareTitle = "Next.js Full stack Recruitment application."

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="rounded-full bg-transparent">
					<Share className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48 shadow-none">
				{" "}
				{/* Adjusted width and padding */}
				<div className="grid grid-cols-3 gap-2">
					{" "}
					{/* Using grid for a cleaner layout */}
					<FacebookShareButton url={baseUrl} quote={shareTitle}>
						<div className="flex flex-col items-center gap-1 w-full h-auto py-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
							<Facebook className="h-5 w-5 text-blue-600" /> {/* Slightly larger icon */}
							{/* <span className="text-xs">Facebook</span> */}
						</div>
					</FacebookShareButton>
					<TwitterShareButton url={baseUrl} title={shareTitle}>
						<div className="flex flex-col items-center gap-1 w-full h-auto py-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
							<X className="h-5 w-5 text-gray-950" />
							{/* <span className="text-xs">X</span> */}
						</div>
					</TwitterShareButton>
					<RedditShareButton url={baseUrl} title={shareTitle}>
						<div className="flex flex-col items-center gap-1 w-full h-auto py-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
							<Reddit className="h-5 w-5 text-orange-600" />
							{/* <span className="text-xs">Reddit</span> */}
						</div>
					</RedditShareButton>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
