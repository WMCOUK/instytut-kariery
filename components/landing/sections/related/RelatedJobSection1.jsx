'use client'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import fetchRelatedJob from "@/fetchSwr/job"
import {
	Briefcase,
	Clock,
	DollarSign,
	MapPin,
} from "lucide-react"
import Link from "next/link"

export default function RelatedJobSection1({ slug }) {
	const { relatedJobs, isLoading, isError } = fetchRelatedJob(slug)

	if (isLoading) return <div>Loading related jobs...</div>
	if (isError) return <div>Failed to load related jobs.</div>
	if (!relatedJobs?.length) return <div>No related jobs found.</div>

	return (
		<div className="w-full mt-10">
			<h2 className="text-xl font-semibold mb-4">Related Jobs</h2>
			<div className="space-y-4">
				<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
					{relatedJobs.slice(0, 4).map((job) => {
						const daysLeft = job.closingDate
							? Math.max(
								0,
								Math.ceil((new Date(job.closingDate) - new Date()) / (1000 * 60 * 60 * 24))
							)
							: null

						return (
							<Card
								key={job.id}
								className="transition-shadow hover:shadow-md group"
							>
								<CardContent className="p-5">
									<div className="flex gap-4">
										{/* <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border">
											<img
												src={job.image || "/images/placeholder.svg"}
												alt={job.title}
												className="w-full h-full object-cover"
											/>
										</div> */}

										<div className="flex-1">
											<Link href={`/jobs/${job.slug}`}>
												<h3 className="text-lg font-semibold text-primary group-hover:underline">
													{job.title}
												</h3>
											</Link>

											{job.company && (
												<p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
													<Briefcase className="w-4 h-4" />
													{job.company}
												</p>
											)}

											<div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 mb-2">
												{job.jobLocationSlug && (
													<span className="flex items-center gap-1">
														<MapPin className="w-4 h-4" />
														{job.jobLocationSlug}
													</span>
												)}
												<span className="flex items-center gap-1">
													<Clock className="w-4 h-4" />
													{new Date(job.createdAt).toLocaleDateString()}
												</span>
											</div>

											<div className="flex flex-wrap gap-2 mb-3">
												{job.jobTypeSlug && (
													<Badge variant="secondary" className="rounded-md capitalize">
														{job.jobTypeSlug}
													</Badge>
												)}
												{job.jobIndustrySlug && (
													<Badge variant="secondary" className="rounded-md capitalize">
														{job.jobIndustrySlug}
													</Badge>
												)}
											</div>

											{/* {job.description && (
										<p className="text-sm text-muted-foreground line-clamp-2 mb-4">
											{job.description}
										</p>
									)} */}

											<div className="flex items-center justify-between pt-4 mt-4 border-t text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<DollarSign className="w-4 h-4" />
													<span>
														{job.minSalary} - {job.maxSalary} {job.salaryRange}
													</span>
												</div>

												{daysLeft !== null && (
													<span>{daysLeft} days left</span>
												)}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>

			</div>
		</div>
	)
}
