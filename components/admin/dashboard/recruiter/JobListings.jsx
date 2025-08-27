'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchLatestJob } from "@/fetchSwr"
import { MoreVertical, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function JobListings() {
	const { jobs, error, mutate, isLoading } = fetchLatestJob()

	const getDaysRemaining = (closingDate) => {
		const days = Math.ceil((new Date(closingDate) - new Date()) / (1000 * 60 * 60 * 24))
		return days > 0 ? `${days} days remaining` : "Expired"
	}

	const getStatus = (status) => {
		const active = status === "published"
		return {
			label: active ? "Active" : "Expired",
			color: active ? "bg-green-500 text-green-600" : "bg-red-500 text-red-600"
		}
	}

	if (isLoading) {
		return <div className="p-4">Loading jobs...</div>
	}

	return (
		<div className="w-full p-2 sm:p-4">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg sm:text-xl font-semibold">Recently Posted Jobs</h2>
				<Button variant="link" className="text-primary px-2 sm:px-4">View all →</Button>
			</div>

			{/* Mobile view */}
			<div className="md:hidden space-y-4">
				{jobs.map((job) => {
					const statusInfo = getStatus(job.status)
					return (
						<div key={job.id} className="border rounded-lg p-4 hover:bg-primary/5">
							<div className="flex items-center space-x-3 mb-3">
								<Image src={job.recruiter.image} alt={job.title} className="rounded-full" width={40} height={40} />
								<div>
									<h3 className="font-medium">{job.title}</h3>
									<div className="text-xs text-muted-foreground flex gap-1">
										<span>{job.jobType.title}</span>•<span>{getDaysRemaining(job.closingDate)}</span>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-2 mb-3 text-sm">
								<div>
									<div className="text-muted-foreground mb-1">Status</div>
									<div className="flex items-center gap-2">
										<div className={`w-2 h-2 rounded-full ${statusInfo.color.split(" ")[0]}`} />
										<span className={statusInfo.color.split(" ")[1]}>{statusInfo.label}</span>
									</div>
								</div>
								<div>
									<div className="text-muted-foreground mb-1">Applications</div>
									<div className="flex items-center gap-2 text-muted-foreground">
										<User className="w-4 h-4" />
										<span>{job.application.length}</span>
									</div>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<Link href={`/recruiter/job/${job.slug}`} className="text-primary font-semibold">View Applications</Link>
								{/* <Button variant="ghost" size="sm" className="text-primary">View Applications</Button> */}
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>Promote Job</DropdownMenuItem>
										<DropdownMenuItem>
											<Link href={`/recruiter/job/${job.slug}`} className="text-primary font-semibold">View Applications</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>Mark as expired</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					)
				})}
			</div>

			{/* Desktop view */}
			<div className="hidden md:block">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[300px]">JOBS</TableHead>
							<TableHead>STATUS</TableHead>
							<TableHead>APPLICATIONS</TableHead>
							<TableHead className="text-right">ACTIONS</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{jobs.map((job) => {
							const statusInfo = getStatus(job.status)
							return (
								<TableRow key={job.id} className="group hover:bg-primary/5">
									<TableCell>
										<div className="flex items-center space-x-4">
											<Image src={job.recruiter.image} alt={job.title} className="rounded-full" width={40} height={40} />
											<div>
												<h3 className="font-medium">{job.title}</h3>
												<div className="text-sm text-muted-foreground flex gap-2">
													<span>{job.jobType.title}</span>•<span>{getDaysRemaining(job.closingDate)}</span>
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<div className={`w-2 h-2 rounded-full ${statusInfo.color.split(" ")[0]}`} />
											<span className={statusInfo.color.split(" ")[1]}>{statusInfo.label}</span>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2 text-muted-foreground">
											<User className="w-5 h-5" />
											<span>{job.application.length} Applications</span>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex items-center justify-end space-x-2">
											<Link href={`/recruiter/job/${job.slug}`} className="text-primary font-semibold">View Applications</Link>
											{/* <Button variant="ghost" className="text-primary">View Applications</Button> */}
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>Promote Job</DropdownMenuItem>
													<DropdownMenuItem>View Detail</DropdownMenuItem>
													<DropdownMenuItem>Mark as expired</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
