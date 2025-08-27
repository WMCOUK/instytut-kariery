"use client"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { fetchAllRecruiter } from "@/fetchSwr"

export default function TopRecruiters() {
	const { recruiters } = fetchAllRecruiter(1)
	return (
		<>
			{recruiters?.slice(0, 5).map((recruiter, index) => (
				<Card key={index}>
					<CardContent className="p-3 sm:p-4">
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
							<Image
								src={recruiter?.image || "/placeholder.svg"}
								alt=""
								width={48}
								height={48}
								className="rounded-full w-12 h-12 sm:w-[48px] sm:h-[48px]"
							/>
							<div className="flex-1 min-w-0 w-full">
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
									<h5 className="font-semibold text-sm sm:text-base truncate">{recruiter.title}</h5>
									<div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											className="w-3 h-3 sm:w-4 sm:h-4"
										>
											<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
											<circle cx="12" cy="10" r="3" />
										</svg>
										<span>{recruiter.country}</span>
									</div>
								</div>
								<p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-0">{recruiter.description}</p>
								<div className="flex items-center gap-1 mt-2 sm:mt-1">
									{Array.from({ length: 5 }).map((_, i) => (
										<svg
											key={i}
											className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
										>
											<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
										</svg>
									))}
									<span className="text-xs sm:text-sm text-muted-foreground ml-1">({5})</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</>
	)
}

