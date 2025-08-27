

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/utils"
import Image from "next/image"
import Link from "next/link"

const BlogList1 = ({ item }) => {
	const { slug, title, img, subTitle, catSlug } = item || {}
	const date = formatDate(item?.createdAt)

	return (
		<Card className="w-full mb-4 rounded-xl border overflow-hidden">
			<Link href={`/blog/${slug}`} className="flex">
				<div className="relative w-1/4 aspect-[4/3]">
					<Image
						src={img || "/placeholder.svg"}
						alt={title || "Blog Image"}
						fill
						sizes="(max-width: 768px) 25vw, 20vw"
						className="object-cover"
					/>
				</div>
				<CardContent className="flex-1 py-4 px-6">
					<div className="mb-2">
						<Badge className="inline-block py-1 px-2 text-xs font-semibold bg-primary/30 text-primary rounded-xl mr-3 capitalize">
							{catSlug}
						</Badge>
						<span className="text-muted-foreground text-xs">{date}</span>
					</div>
					<h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-1">{title}</h3>
					<p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{subTitle}</p>
				</CardContent>
			</Link>
		</Card>
	)
}

export default BlogList1



