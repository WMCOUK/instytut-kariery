"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { fetchLatestPost } from "@/fetchSwr"
import { formatTime } from "@/utils"
import Image from "next/image"

export default function RecentPosts() {
	const { posts, isLoading, error } = fetchLatestPost()

	if (isLoading)
		return (
			<TableRow>
				<TableCell colSpan={3}>Loading...</TableCell>
			</TableRow>
		)
	if (error)
		return (
			<TableRow>
				<TableCell colSpan={3}>Error loading posts</TableCell>
			</TableRow>
		)

	return (
		<>
			{posts.map((post) => (
				<TableRow key={post.id} className="[&>td]:py-2 sm:[&>td]:py-4">
					<TableCell className="w-12 sm:w-16">
						<div className="relative w-10 h-10 sm:w-12 sm:h-12">
							<Image
								src={post.img || "/placeholder.svg"}
								alt={post.title}
								fill
								sizes="(max-width: 640px) 40px, 48px"
								className="rounded-md object-cover"
							/>
						</div>
					</TableCell>
					<TableCell className="font-medium max-w-[120px] sm:max-w-[200px] md:max-w-none">
						<a href="#" className="hover:underline text-xs sm:text-sm line-clamp-2 sm:line-clamp-1">
							{post.title}
						</a>
					</TableCell>
					<TableCell className="text-right text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
						{formatTime(new Date(post.createdAt))}
					</TableCell>
				</TableRow>
			))}
		</>
	)
}

