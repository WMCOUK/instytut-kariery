"use client"

import { fetchAppliedJob } from "@/fetchSwr"
import { ArrowRight, CheckCircle2, Globe, MapPin } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AppliedJob() {
	const { applications, isLoading } = fetchAppliedJob()

	return (
		<div className="w-full">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
				<h2 className="text-xl font-semibold">Recently Applied</h2>
				<Button variant="ghost" size="sm" className="text-primary px-0 h-auto" asChild>
					<Link href="/applied-jobs" className="flex items-center gap-1 text-sm font-medium">
						View all
						<ArrowRight className="w-4 h-4" />
					</Link>
				</Button>
			</div>

			<div className="border rounded-xl overflow-hidden">
				{/* Table Header (hidden on mobile) */}
				<div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-4 py-3 bg-muted/50 border-b">
					<span className="text-sm font-medium text-muted-foreground">Job</span>
					<span className="text-sm font-medium text-muted-foreground text-right">Date Applied</span>
					<span className="text-sm font-medium text-muted-foreground text-center">Status</span>
					<span className="text-sm font-medium text-muted-foreground text-right">Action</span>
				</div>

				{/* Job Rows */}
				<div className="divide-y">
					{applications?.map((application, index) => {
						const job = application.job
						const recruiter = application.recruiter
						return (
							<div
								key={index}
								className="flex flex-col md:grid md:grid-cols-[1fr_auto_auto_auto] items-start md:items-center gap-4 px-4 py-4"
							>
								{/* Job Info */}
								<div className="flex items-start gap-3 w-full">
									<div className="w-10 h-10 bg-primary text-white rounded-md flex items-center justify-center font-semibold text-sm shrink-0">
										{recruiter?.title?.charAt(0)}
									</div>
									<div>
										<div className="flex items-center gap-2 flex-wrap">
											<h3 className="font-medium text-base">{job?.title}</h3>
											<Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
												{recruiter?.title}
											</Badge>
										</div>
										<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
											<span className="flex items-center gap-1">
												<MapPin className="w-4 h-4" />
												{job?.jobLocationSlug || "Remote"}
											</span>
											<span className="flex items-center gap-1">
												<Globe className="w-4 h-4" />
												{job?.minSalary} - {job?.maxSalary} {job?.currency} ({job?.salaryRange})
											</span>
										</div>
									</div>
								</div>

								{/* Mobile Layout */}
								<div className="md:hidden flex justify-between items-center w-full mt-3">
									<div className="text-sm text-muted-foreground">
										{new Date(application.appliedAt).toLocaleDateString()}
									</div>
									<div className="flex items-center gap-1 text-green-600">
										<CheckCircle2 className="w-4 h-4" />
										<span className="text-sm capitalize">{application.status}</span>
									</div>
								</div>

								{/* Desktop Date */}
								<div className="hidden md:block text-sm text-muted-foreground w-32 text-right">
									{new Date(application.appliedAt).toLocaleDateString()}
								</div>

								{/* Desktop Status */}
								<div className="hidden md:flex items-center justify-center gap-1 text-green-600 w-24">
									<CheckCircle2 className="w-4 h-4" />
									<span className="text-sm capitalize">{application.status}</span>
								</div>

								{/* View Button */}
								<div className="w-full md:w-28 md:text-right">
									<Button
										variant="outline"
										className="text-primary w-full md:w-auto"
										size="sm"
										asChild
									>
										<Link href={`/jobs/${job?.slug}`}>View</Link>
									</Button>
								</div>
							</div>
						)
					})}

					{/* Empty State */}
					{!isLoading && (!applications || applications.length === 0) && (
						<div className="text-center text-sm text-muted-foreground py-10">
							You haven’t applied to any jobs yet.
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
