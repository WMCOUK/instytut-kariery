"use client"

import { Card, CardContent } from "@/components/ui/card"
import { fetchLatestJob } from "@/fetchSwr"
import { DollarSign, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LatestJobs() {
	const { jobs } = fetchLatestJob()

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Latest Jobs</h2>
				<Link
					href="/jobs"
					className="text-primary hover:text-primary/80 transition-colors duration-200"
				>
					All jobs
				</Link>
			</div>

			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{jobs?.slice(0, 8).map((job) => (
					<Card key={job.id} className="relative flex items-center gap-4 p-4 hover:shadow-sm transition-shadow">
						<Image
							src={job?.image || "/placeholder.svg"}
							alt={job.title}
							width={64}
							height={64}
							className="rounded-md object-cover"
						/>

						<CardContent className="p-0 flex-1 space-y-1">
							<h3 className="text-md font-medium">{job.title}</h3>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<MapPin className="w-4 h-4" />
								<span>{job.jobLocation?.title}</span>
							</div>
							<div className="flex items-center gap-1 text-sm text-primary font-semibold">
								<DollarSign className="w-4 h-4" />
								<span>{job.minSalary}</span> - <span>{job.maxSalary}</span>
							</div>
						</CardContent>

						<Link href={`/recruiter/job/${job.slug}`} className="absolute inset-0">
							<span className="sr-only">View job</span>
						</Link>
					</Card>
				))}
			</div>
		</div>
	)
}
