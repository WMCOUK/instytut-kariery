import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatTime } from "@/utils"
import { MapPin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const JobGrid4 = ({ item }) => {
	// Generate a random number for applicants
	const applicants = Math.floor(Math.random() * (item.maxApplicants || 1000))
	const progress = item.maxApplicants
		? Math.min((applicants / item.maxApplicants) * 100, 100)
		: 0
	const formattedTime = formatTime(item?.createdAt)

	return (
		<Card className="group overflow-hidden rounded-xl transition-all duration-300 hover:shadow-md">
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Image
							width={50}
							height={50}
							src={item?.recruiter?.image}
							alt={item?.title || 'Title'}
							className="rounded-lg object-cover bg-muted"
						/>
						<div className="ml-4">
							<h5 className="text-md font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
								{item.recruiter?.title}
							</h5>
							<p className="text-sm text-muted-foreground">{formattedTime}</p>
						</div>
					</div>
					<Badge variant="secondary" className="px-3 py-1 text-sm">
						{item?.jobType?.title}
					</Badge>
				</div>

				<div className="mt-5">
					<Link href={`/jobs/${item.slug}`}>
						<h4 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
							{item?.title}
						</h4>
					</Link>
					<div className="mt-5">
						<div className="w-full bg-secondary rounded-full h-2">
							<div
								className="bg-primary h-2 rounded-full transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-between">
					<span className="flex items-center text-sm font-medium text-muted-foreground">
						<MapPin className="mr-1 w-4 h-4" />
						{item?.jobLocation?.title}
					</span>
					<div className="text-sm font-medium text-muted-foreground">
						{applicants} applied <span className="text-muted-foreground/60">of {item?.maxApplicants}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default JobGrid4

