"use client"

import { ArrowUpRight, CalendarDays, Eye, PlusCircle } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchLatestPost } from "@/fetchSwr"
import { formatTime } from "@/utils"

export default function RecentPosts() {
	const { posts, isLoading, error } = fetchLatestPost()

	if (isLoading) {
		return (
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-lg font-bold">Recent Blog Posts</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{[...Array(4)].map((_, i) => (
							<Card key={i} className="overflow-hidden">
								<CardHeader className="p-0">
									<Skeleton className="w-full h-[120px]" />
								</CardHeader>
								<CardContent className="p-4">
									<Skeleton className="h-4 w-full mb-2" />
									<Skeleton className="h-4 w-3/4 mb-2" />
									<div className="flex items-center justify-between mt-4">
										<Skeleton className="h-3 w-16" />
										<Skeleton className="h-3 w-10" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>
		)
	}

	if (error) {
		return (
			<Card className="w-full">
				<CardContent className="p-6 text-center">
					<p className="text-muted-foreground">Error loading posts</p>
					<Button variant="outline" size="sm" className="mt-4">
						Try again
					</Button>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
				<CardTitle className="text-lg font-bold">Recent Blog Posts</CardTitle>
				<div className="flex flex-wrap gap-2">
					<Button variant="outline" size="sm" className="h-8">
						<PlusCircle className="mr-2 h-3.5 w-3.5" />
						New post
					</Button>
					<Button variant="ghost" size="sm" className="h-8">
						View all
						<ArrowUpRight className="ml-2 h-3.5 w-3.5" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
					{posts.map((post) => (
						<Card key={post.id} className="overflow-hidden">
							<CardHeader className="p-0">
								<div className="relative w-full h-[120px]">
									<Image
										src={post.img || "/placeholder.svg"}
										alt={post.title}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
										className="object-cover"
									/>
								</div>
							</CardHeader>
							<CardContent className="p-3 sm:p-4">
								<h3 className="text-xs sm:text-sm font-medium line-clamp-2 mb-2">{post.title}</h3>
								<div className="flex items-center justify-between text-xs text-muted-foreground">
									<div className="flex items-center">
										<CalendarDays className="mr-1 h-3 w-3" />
										<span className="truncate max-w-[80px]">{formatTime(new Date(post.createdAt))}</span>
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
			</CardContent>
		</Card>
	)
}

