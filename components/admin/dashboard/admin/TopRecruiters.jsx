"use client"

import { Card, CardContent } from "@/components/ui/card"
import { fetchAllRecruiter } from "@/fetchSwr"
import Image from "next/image"

export default function TopRecruiters() {
	const { recruiters } = fetchAllRecruiter(1)

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Top Recruiters</h2>
			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				{recruiters?.slice(0, 8).map((recruiter, index) => (
					<Card key={index} className="flex items-center gap-4 p-4">
						<Image
							src={recruiter?.image || "/placeholder.svg"}
							alt={recruiter.title}
							width={48}
							height={48}
							className="rounded-full object-cover"
						/>
						<CardContent className="p-0">
							<p className="font-medium">{recruiter.title}</p>
							<p className="text-sm text-muted-foreground">
								{recruiter.country}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
