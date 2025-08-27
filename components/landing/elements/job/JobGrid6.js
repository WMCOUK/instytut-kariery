import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formatTime } from '@/utils'
import { Clock, ExternalLink, MapPin, Plus, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function JobGrid6({ item }) {
	const formattedTime = formatTime(item?.createdAt)

	return (
		<Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-background hover:bg-primary/[0.03] dark:hover:bg-primary/10">
			<CardHeader className="p-6 bg-card group-hover:bg-primary/10 transition-colors duration-300">
				<div className="flex items-center justify-between">
					<div className='flex items-center space-x-4'>
						<Image
							width={60}
							height={60}
							src={item?.recruiter?.image}
							alt={item?.recruiter?.title}
							className="rounded-lg object-cover"
						/>
						<div>
							<h3 className='text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300'>
								{item?.recruiter?.title}
							</h3>
							<div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
								<span className="flex items-center">
									<MapPin className='mr-1 h-4 w-4' />
									{item?.jobLocation?.title}
								</span>
								<span className="flex items-center">
									<Users className='mr-1 h-4 w-4' />
									{item?.numberOfPositions} openings
								</span>
								<span className="flex items-center">
									<Star className='mr-1 h-4 w-4 text-yellow-400' />
									<span className='font-medium text-foreground'>5.0</span>
									<span className="ml-1">(5 Reviews)</span>
								</span>
							</div>
						</div>
					</div>
					<Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
						<Plus className='mr-1 h-4 w-4' />
						Follow
					</Button>
				</div>
			</CardHeader>

			<CardContent className="p-6 space-y-4 group-hover:bg-transparent transition-colors duration-300">
				<Link href={`/jobs/${item?.slug}`} className="group/link">
					<h2 className='text-2xl font-bold text-foreground group-hover/link:text-primary transition-colors duration-300 flex items-center'>
						{item?.title}
						<ExternalLink className="ml-2 h-5 w-5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
					</h2>
				</Link>

				<p className='text-base text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-300'>
					{item?.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque optio perferendis veniam quasi quisquam vero deleniti nemo harum in? Perferendis.'}
				</p>

				<div className="flex flex-wrap gap-2">
					{(item?.skills || []).slice(0, 5).map((skill, i) => (
						<Badge key={i} variant="secondary" className="text-xs font-medium capitalize px-3 py-1 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
							{skill}
						</Badge>
					))}
				</div>
			</CardContent>

			<CardFooter className="px-6 py-4 bg-muted/50 group-hover:bg-card flex items-center justify-between text-sm transition-colors duration-300">
				<div className="flex items-center text-muted-foreground group-hover:text-foreground/80">
					<Clock className="h-4 w-4 mr-2" />
					<span>{formattedTime}</span>
				</div>
				<div className="font-semibold group-hover:text-foreground/90">
					${item?.minSalary}k - ${item?.maxSalary}k <span className='text-muted-foreground font-normal group-hover:text-foreground/70'>/ Yearly</span>
				</div>
			</CardFooter>
		</Card>
	)
}

