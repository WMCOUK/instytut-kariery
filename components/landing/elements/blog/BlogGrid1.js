import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/utils"
import { ArrowRight, Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const BlogGrid1 = ({ item }) => {
	// Safely extract data with fallbacks
	console.log(item);
	
	const {
		slug = "",
		title = "Untitled Blog Post",
		img = "/images/placeholder.svg",
		subTitle = "",
		user,
		blogCategory,
	} = item || {}

	const date = item?.createdAt ? formatDate(item.createdAt) : "No date"
	const categoryTitle = item?.catSlug || "Uncategorized"
	const authorName = user?.personal?.name || "Anonymous"
	const authorAvatar = user?.avatar || "/images/placeholder.svg"

	return (
		<Card className="group w-full h-full rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
			<Link href={`/blog/${slug}`} className="block h-full flex flex-col">
				{/* Image container with overlay and hover effect */}
				<div className="relative w-full aspect-video overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
					<Image
						src={img || "/placeholder.svg"}
						alt={title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>

					{/* Category badge positioned on image */}
					<div className="absolute top-4 left-4 z-20">
						<Badge className="py-1 px-3 text-xs font-medium bg-primary/90 text-primary-foreground hover:bg-primary rounded-full capitalize">
							{categoryTitle}
						</Badge>
					</div>
				</div>

				<CardContent className="flex-1 flex flex-col p-5">
					{/* Meta information */}
					<div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
						<div className="flex items-center">
							<Calendar className="h-3.5 w-3.5 mr-1.5" />
							<span>{date}</span>
						</div>

						<div className="flex items-center">
							<User className="h-3.5 w-3.5 mr-1.5" />
							<span>{authorName}</span>
						</div>
					</div>

					{/* Title with hover effect */}
					<h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
						{title}
					</h3>
				</CardContent>
			</Link>
		</Card>
	)
}

export default BlogGrid1

