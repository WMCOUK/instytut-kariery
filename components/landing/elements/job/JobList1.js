"use client"

import { formatTime } from "@/utils"
import { Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function JobList1({ item }) {
	const formattedTime = formatTime(item?.createdAt)

	return (
		<div className="group">
			<div className="relative p-4 rounded-xl bg-card border group-hover:bg-primary transition duration-150">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Image
							width={40}
							height={40}
							src={item?.recruiter?.image || item?.job?.recruiter?.image}
							alt={`${item?.recruiter?.title} logo`}
							className="rounded-xl"
						/>
						<div className="ml-4">
							<h5 className="font-medium text-primary group-hover:text-primary-foreground transition duration-150">
								{item?.recruiter?.title}
							</h5>
							<span className="flex items-center text-sm text-muted-foreground group-hover:text-primary-foreground transition duration-150">
								<MapPin className="mr-1 h-3 w-3" />
								{item?.jobLocation?.title}
							</span>
						</div>
					</div>
					<div className="flex items-center text-muted-foreground group-hover:text-primary-foreground transition duration-150">
						<Clock className="h-4 w-4" />
						<span className="ml-2 text-sm">{formattedTime}</span>
					</div>
				</div>

				<div className="flex items-center justify-between mt-3">
					<div>
						<Link href={`/jobs/${item?.slug}`} className="group-hover:text-primary-foreground transition duration-150">
							<h4 className="text-md font-semibold text-foreground  group-hover:text-primary-foreground">{item?.title}</h4>
						</Link>
						<div className="mt-3 flex flex-wrap gap-2">
							{item?.skills?.slice(0, 2).map((skill, i) => (
								<span
									key={i}
									className="bg-primary/10 shadow-sm text-xs px-3 py-1 rounded-xl text-primary capitalize group-hover:bg-primary-foreground group-hover:text-primary transition duration-150"
								>
									{skill}
								</span>
							))}
						</div>
					</div>
					<div className="text-foreground group-hover:text-primary-foreground transition duration-150">
						${item?.minSalary}k
						<small className="ml-1 text-sm text-muted-foreground group-hover:text-primary-foreground transition duration-150">
							/ Yearly
						</small>
					</div>
				</div>
			</div>
		</div>
	)
}

