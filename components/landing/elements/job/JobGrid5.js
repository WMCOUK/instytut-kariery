import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUpRight, Bookmark, MapPin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const JobGrid5 = ({ item }) => {
	return (
		<Card className="group overflow-hidden rounded-xl hover:shadow-md hover:border-primary transition-all duration-300">
			<div className="relative px-6 pt-6 pb-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Image
							width={50}
							height={50}
							src={item?.recruiter?.image}
							alt={item?.title || "Title"}
							className="rounded-lg border"
						/>
						<div>
							<h5 className="text-base font-semibold text-foreground">
								{item?.recruiter?.title || "Recruiter"}
							</h5>
							<p className="text-sm text-muted-foreground">
								{item?.title || "Company Name"}
							</p>
						</div>
					</div>
				</div>

				<div className="absolute top-6 right-6 flex space-x-2">
					<Button variant="ghost" size="icon" className="rounded-full">
						<Bookmark className="h-4 w-4" />
						<span className="sr-only">Bookmark job</span>
					</Button>
					<Button variant="ghost" size="icon" className="rounded-full">
						<ArrowUpRight className="h-4 w-4" />
						<span className="sr-only">View job details</span>
					</Button>
				</div>

				<div className="mt-4">
					<Link href={`/jobs/${item.slug}`} className="group/link">
						<h4 className="text-lg font-bold text-foreground leading-tight transition-colors duration-300 group-hover/link:text-primary/80">
							{item?.title || "Job Title"}
						</h4>
					</Link>
					<p className="mt-3 text-sm text-muted-foreground leading-relaxed">
						{item?.description || "A short description about the job position goes here."}
					</p>
				</div>

				<div className="mt-4 flex flex-wrap gap-2">
					{(item?.skills || []).slice(0, 3).map((skill, i) => (
						<Badge
							key={i}
							variant="secondary"
							className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
						>
							{skill}
						</Badge>
					))}
					<Badge
						variant="outline"
						className="flex items-center hover:bg-secondary hover:text-secondary-foreground"
					>
						<MapPin className="mr-1 h-4 w-4" />
						{item.location || "Location"}
					</Badge>
				</div>
			</div>
		</Card>
	)
}

export default JobGrid5

