"use client"

import { ArrowUpRight, CalendarDays, Eye, PlusCircle } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { fetchLatestPost } from "@/fetchSwr"
import { formatTime } from "@/utils"

export default function RecentPosts() {
	const { posts, isLoading, error } = fetchLatestPost()

	if (isLoading) {
		return <Card className="w-full p-4 sm:p-6">Loading...</Card>
	}

	if (error) {
		return <Card className="w-full p-4 sm:p-6">Error loading posts</Card>
	}

	return (
		<div className="w-full">
			<div className="flex flex-col xs:flex-row items-start xs:items-center justify-between space-y-2 xs:space-y-0 pb-2">
				<div className="text-lg font-bold">Recent Blog Posts</div>
				<div className="flex flex-wrap gap-2 w-full xs:w-auto">
					<Button variant="outline" size="sm" className="flex-shrink-0">
						<PlusCircle className="mr-2 h-4 w-4" />
						New post
					</Button>
					<Button variant="ghost" size="sm" className="flex-shrink-0">
						View all
						<ArrowUpRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</div>
			<div>
				<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
					{posts.map((post) => (
						<Card key={post.id} className="overflow-hidden">
							<CardHeader className="p-0">
								<Image
									src={post.img || "/placeholder.svg"}
									alt={post.title}
									width={300}
									height={150}
									className="w-full h-[120px] object-cover"
								/>
							</CardHeader>
							<CardContent className="p-3 sm:p-4">
								<h3 className="text-sm font-medium line-clamp-2 mb-2">{post.title}</h3>
								<div className="flex items-center justify-between text-xs text-muted-foreground">
									<div className="flex items-center">
										<CalendarDays className="mr-1 h-3 w-3" />
										{formatTime(new Date(post.createdAt))}
									</div>
									<div className="flex items-center">
										<Eye className="mr-1 h-3 w-3" />
										{post.views || 0}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}

