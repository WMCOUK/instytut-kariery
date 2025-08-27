"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { fetchLatestPost } from "@/fetchSwr"
import { formatTime } from "@/utils"
import { ArrowUpRight, CalendarDays, Eye, PlusCircle } from "lucide-react"
import Image from "next/image"

export default function RecentPosts() {
	const { posts, isLoading, error } = fetchLatestPost()

	if (isLoading) {
		return <Card className="w-full p-6">Loading...</Card>
	}

	if (error) {
		return <Card className="w-full p-6">Error loading posts</Card>
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Recent Blog Posts</h2>
				<div className="flex gap-2">
					<Button variant="ghost" size="sm">
						View all
						<ArrowUpRight className="w-4 h-4 ml-1" />
					</Button>
				</div>
			</div>

			<div className="space-y-3">
				{posts.map((post) => (
					<Card key={post.id} className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow">
						<Image
							src={post.img || "/placeholder.svg"}
							alt={post.title}
							width={64}
							height={64}
							className="rounded-md object-cover"
						/>
						<CardContent className="p-0 flex-1 space-y-1">
							<h3 className="font-medium text-sm line-clamp-2">{post.title}</h3>
							<div className="flex items-center gap-4 text-xs text-muted-foreground">
								<span className="flex items-center gap-1">
									<CalendarDays className="w-3 h-3" />
									{formatTime(new Date(post.createdAt))}
								</span>
								<span className="flex items-center gap-1">
									<Eye className="w-3 h-3" />
									{post.views || 0}
								</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
