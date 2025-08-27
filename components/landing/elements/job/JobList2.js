"use client"

import { Badge } from "@/components/ui/badge"
import { formatTime } from "@/utils"
import { Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import FavouriteJobButton from "../candidates/FavouriteJobButton"

export default function JobList2({ item }) {
	const formattedTime = formatTime(item?.createdAt)

	return (
		<Link href={`/jobs/${item?.slug}`} className="block transition-colors duration-200">
			<div className="group py-2">
				<div className="relative p-5 rounded-xl bg-card border border-border/60 group-hover:bg-primary transition-all duration-200 ease-in-out">

					{/* Sponsored + Favourite */}
					<div className="flex items-center space-x-2 absolute top-2 right-2">
						{item?.isSponsored && (
							<Badge variant="destructive">
								Sponsored
							</Badge>
						)}
						<FavouriteJobButton
							jobTitle={item?.title}
							jobSlug={item?.slug}
							initialFavourite={item?.isFavourite}
							className="h-4 w-4"
						/>
					</div>

					<div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:justify-between">
						{/* Company and job info */}
						<div className="space-y-3 md:max-w-[40%]">
							<div className="flex items-center">
								<div className="relative h-12 w-12 overflow-hidden rounded-lg border border-border/30 shadow-sm">
									<Image
										fill
										sizes="48px"
										src={item?.recruiter?.image || item?.job?.recruiter?.image}
										alt={`${item?.recruiter?.title} logo`}
										className="object-cover"
									/>
								</div>
								<div className="ml-4">
									<h5 className="font-semibold text-sm group-hover:text-primary-foreground transition-colors duration-200">
										{item?.recruiter?.title}
									</h5>
									<span className="flex items-center text-xs text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-200">
										<MapPin className="mr-1 h-3 w-3" />
										{item?.jobLocation?.title}
									</span>
								</div>
							</div>
							<div>
								<h4 className="text-base font-bold text-foreground group-hover:text-primary-foreground">
									{item?.title}
								</h4>
							</div>
						</div>

						{/* Skills */}
						<div className="flex flex-wrap gap-2 md:text-left">
							{item?.skills?.slice(0, 2).map((skill, i) => (
								<span
									key={i}
									className="bg-primary/10 shadow-sm text-xs px-3 py-1.5 rounded-full text-primary font-medium capitalize group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground transition-colors duration-200"
								>
									{skill}
								</span>
							))}
						</div>

						{/* Salary and time */}
						<div className="flex items-center justify-between md:flex-col md:items-end md:space-y-3 border-t pt-4 mt-2 md:border-t-0 md:pt-0 md:mt-0 border-border/30">
							<div className="text-foreground font-bold group-hover:text-primary-foreground transition-colors duration-200">
								${item?.minSalary}k
								<small className="ml-1 text-xs font-normal text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-200">
									/ Yearly
								</small>
							</div>
							<div className="flex items-center text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-200">
								<Clock className="h-3.5 w-3.5" />
								<span className="ml-2 text-xs">{formattedTime}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
