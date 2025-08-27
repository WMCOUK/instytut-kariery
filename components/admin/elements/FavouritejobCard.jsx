'use client'

import FavouriteJobButton from "@/components/landing/elements/candidates/FavouriteJobButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"

function getDaysAgo(dateString) {
	const createdDate = new Date(dateString)
	const now = new Date()
	const diffTime = Math.abs(now - createdDate)
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
	return diffDays
}

export default function FavouritejobCard({ job }) {
	// memoize days ago calculation to avoid recalculations
	const daysAgo = useMemo(() => getDaysAgo(job.createdAt), [job.createdAt])

	return (
		<Card className="overflow-hidden hover:shadow-sm transition-shadow duration-200">
			{/* Job Image */}
			<div className="relative w-full h-48 rounded-t-md overflow-hidden">
				<Image
					src={job.image}
					alt={job.title}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					style={{ objectFit: "cover" }}
					priority={false}
					placeholder="blur"
					blurDataURL="/images/placeholder.svg"
				/>
				{/* Favourite Toggle Button */}
				{job.isFavourite && (
					<div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md">
						<FavouriteJobButton
							jobTitle={job?.title}
							jobSlug={job?.slug}
							initialFavourite={job?.isFavourite}
							className="h-6 w-6"
							aria-label={`Toggle favourite for ${job.title}`}
						/>
					</div>
				)}
			</div>

			<CardHeader className="pt-4 px-4">
				<CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
				<div className="flex flex-wrap gap-2 mt-1">
					{job.jobType?.title && <Badge variant="secondary">{job.jobType.title}</Badge>}
					{job.workMode && <Badge variant="outline">{job.workMode}</Badge>}
				</div>
			</CardHeader>

			<CardContent className="px-4 space-y-4 text-sm text-muted-foreground">
				{/* Description */}
				<p className="line-clamp-3">{job.description}</p>

				{/* Location */}
				<div className="flex items-center">
					<MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
					<span>{job.location || "Location not specified"}</span>
				</div>

				{/* Salary */}
				<div className="flex items-center">
					<DollarSign className="w-4 h-4 mr-1" aria-hidden="true" />
					<span>
						{job.minSalary?.toLocaleString()} - {job.maxSalary?.toLocaleString()} {job.currency?.toUpperCase()} / year
					</span>
				</div>

				{/* Skills */}
				<div className="flex flex-wrap gap-1">
					{job.skills?.map((skill) => (
						<Badge key={skill} variant="outline">
							{skill}
						</Badge>
					))}
				</div>
			</CardContent>

			<CardFooter className="flex justify-between items-center px-4 py-3">
				<Button variant="default" asChild>
					<Link href={`/jobs/${job.slug}`}>
						<span>View Details</span>
					</Link>
				</Button>
				<span className="text-xs text-muted-foreground">
					Posted {daysAgo === 0 ? "today" : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
				</span>
			</CardFooter>
		</Card>
	)
}
