import { Badge } from "@/components/ui/badge"
import { formatTime } from "@/utils"
import { Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function RecruiterJobGrid1({ item }) {
	const formattedTime = formatTime(item?.createdAt)

	if (!item) return null

	return (
		<div className="group">
			<Link href={`/jobs/${item?.slug}`} className="block">
				<div className="relative px-6 py-6 rounded-xl bg-card border border-border/40 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-200 shadow-sm">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div className="flex-1">
							<div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
								<Clock className="h-4 w-4" />
								<span>{formattedTime || "Recently posted"}</span>
								{item?.location && (
									<>
										<span className="mx-1">•</span>
										<MapPin className="h-4 w-4" />
										<span>{item.location}</span>
									</>
								)}
							</div>

							<h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
								{item?.title}
							</h3>

							<div className="mt-3 flex flex-wrap gap-2">
								{item?.skills?.slice(0, 3).map((skill, i) => (
									<Badge key={i} variant="outline" className="bg-primary/5 text-primary capitalize">
										{skill}
									</Badge>
								))}
								{item?.skills?.length > 3 && (
									<Badge variant="outline" className="bg-muted text-muted-foreground">
										+{item.skills.length - 3} more
									</Badge>
								)}
							</div>
						</div>

						<div className="flex items-center justify-between sm:justify-end gap-4 mt-4 sm:mt-0">
							{item?.jobType && (
								<Badge variant="secondary" className="whitespace-nowrap">
									{item.jobType}
								</Badge>
							)}
							<div className="text-foreground font-medium whitespace-nowrap">
								${item?.minSalary || "0"}k{item?.maxSalary && ` - $${item.maxSalary}k`}
								<span className="text-sm text-muted-foreground ml-1">/ Yearly</span>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

