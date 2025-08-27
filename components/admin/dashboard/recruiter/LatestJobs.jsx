"use client"

import { Badge } from "@/components/ui/badge"
import { fetchLatestJob } from "@/fetchSwr"
import { formatTime } from "@/utils"
import Image from "next/image"
import Link from "next/link"

export default function LatestJobs() {
	const { jobs } = fetchLatestJob()

	return (
		<>
			{jobs?.slice(0, 6).map((job) => (
				<div key={job.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border">
					<Image
						src={job?.image || "/placeholder.svg"}
						alt={job?.title}
						width={48}
						height={48}
						className="rounded-lg"
					/>
					<div className="flex-1 min-w-0 w-full">
						<div className="flex flex-col sm:flex-row items-start justify-between gap-2">
							<Link href={`/recruiter/job/${job.slug}`} className="w-full sm:w-auto">
								<h3 className="font-semibold text-base">{job.title}</h3>
								<div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
									<span>{job.jobType?.title}</span>
									<span className="hidden sm:inline">•</span>
									<span>{formatTime(job.createdAt)}</span>
									<span className="hidden sm:inline">•</span>
									<span>{job.jobLocation?.title}</span>
								</div>
							</Link>
							<div className="text-primary font-semibold whitespace-nowrap mt-2 sm:mt-0">{job.salary}</div>
						</div>
						<div className="flex flex-wrap gap-2 mt-3">
							{job?.skills?.map((skill) => (
								<Badge key={skill} variant="secondary" className="rounded-md">
									{skill}
								</Badge>
							))}
						</div>
					</div>
				</div>
			))}
		</>
	)
}

