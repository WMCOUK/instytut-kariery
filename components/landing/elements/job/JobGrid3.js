import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function JobGrid3({ item }) {
	const isNew = new Date(item?.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
	const daysLeft = Math.max(0, Math.ceil((new Date(item?.closingDate) - new Date()) / (1000 * 60 * 60 * 24)))

	return (
		<Card className="group overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary">
			<CardContent className="p-6 relative">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center mr-3">
						<div className="relative overflow-hidden rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105">
							<Image
								width={60}
								height={60}
								src={item?.recruiter?.image}
								alt={item?.title || 'Title'}
								className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
							/>
							{isNew && (
								<Badge variant="destructive" className="absolute top-0 right-0 px-2 py-0.5 text-[10px]">
									NEW
								</Badge>
							)}
						</div>
						<div className="ml-4">
							<h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 ease-in-out">
								{item?.title}
							</h3>
							<p className="text-sm text-muted-foreground">
								by <span className="font-medium">{item?.recruiter?.title}</span> in{' '}
								<span className="font-medium text-foreground">
									{item?.jobLocation?.title}
								</span>
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap gap-2 mb-4">
					{(item?.skills || []).slice(0, 3).map((skill, i) => (
						<Badge key={i} variant="secondary" className="bg-secondary text-secondary-foreground">
							{skill}
						</Badge>
					))}
				</div>

				<div className="flex items-center justify-between text-sm">
					<div className="font-medium text-foreground">
						{item.numberOfPositions}{' '}
						<span className="text-muted-foreground font-normal">
							Jobs Available
						</span>
					</div>
					<div className="flex items-center font-medium text-muted-foreground">
						<Clock className="w-4 h-4 mr-1" />
						<span>{daysLeft} days left to apply</span>
					</div>
				</div>

				<Link href={`/jobs/${item.slug}`} className="absolute inset-0 z-10 bg-transparent">
					<span className="sr-only">View job details</span>
				</Link>
			</CardContent>
		</Card>
	)
}

