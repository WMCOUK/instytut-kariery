import { brandName, cn } from "@/utils"
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export function SiteFooter({ className, ...props }) {
	return (
		<footer
			className={cn("container fixed bottom-0 left-0 right-0 z-40 md:left-[260px]", className)}
			{...props}
		>
			<div className="flex h-16 items-center justify-between">
				<p className="text-sm text-muted-foreground bg-card  shadow-sm px-4 py-2 rounded-full">
					© Copyright {new Date().getFullYear()} <span className="text-primary">{brandName}</span> | All Rights Reserved
				</p>
				<div className="flex items-center space-x-4 bg-card  shadow-sm px-4 py-2 rounded-full">
					<Link href="#" className="text-muted-foreground hover:text-foreground">
						<Facebook className="h-4 w-4" />
						<span className="sr-only">Facebook</span>
					</Link>
					<Link href="#" className="text-muted-foreground hover:text-foreground">
						<Twitter className="h-4 w-4" />
						<span className="sr-only">Twitter</span>
					</Link>
					<Link href="#" className="text-muted-foreground hover:text-foreground">
						<Linkedin className="h-4 w-4" />
						<span className="sr-only">LinkedIn</span>
					</Link>
					<Link href="#" className="text-muted-foreground hover:text-foreground">
						<Youtube className="h-4 w-4" />
						<span className="sr-only">YouTube</span>
					</Link>
				</div>
			</div>
		</footer>
	)
}

