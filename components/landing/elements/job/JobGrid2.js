import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Layers, MapPin, Plus, Star, Users } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const JobGrid2 = ({ item }) => {
	return (
		<Card className="group cursor-pointer rounded-xl bg-card border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary">
			<CardContent className="p-6">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between">
					<div className="flex items-center">
						<Image
							width={50}
							height={50}
							src={item?.recruiter?.image}
							alt={item?.title}
							className="rounded-lg object-cover bg-muted"
						/>
						<div className="ml-3">
							<h4 className="flex items-center text-base font-medium">
								{item?.recruiter?.title}
								<CheckCircle className="ml-3 h-4 w-4 text-primary" />
							</h4>
							<div className="flex mt-1 space-x-3 text-sm text-muted-foreground">
								<div className="flex items-center">
									<MapPin className="mr-1 w-4 h-4" />
									{item?.jobLocation?.title}
								</div>
								<div className="flex items-center">
									<Users className="mr-1 w-4 h-4" />
									10-20
								</div>
								<div className="flex items-center">
									<Star className="mr-1 w-4 h-4 text-primary" />
									<span className="text-primary mr-1">5.0</span>
									(5 Reviews)
								</div>
							</div>
						</div>
					</div>
					<Button
						variant="outline"
						className="mt-4 md:mt-0 flex items-center text-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
					>
						<Plus className="mr-1 w-4 h-4" />
						Follow
					</Button>
				</div>

				<Link href={`/jobs/${item.slug}`}>
					<h4 className="mt-5 text-lg font-medium transition-colors group-hover:text-primary">
						{item?.title}
					</h4>
				</Link>

				<div className="my-3">
					{item?.skills?.slice(0, 2).map((skill, i) => (
						<span key={i} className='bg-primary/10 shadow-sm text-xs px-3 py-1 rounded-xl mr-2 text-primary capitalize group-hover:bg-primary-foreground group-hover:text-primary'>{skill}</span>
					))}
				</div>

				<div className="flex items-center justify-between mt-5">
					<div className="text-sm text-primary">
						{item?.numberOfPositions} <span className="text-muted-foreground">Jobs Available</span>
					</div>
					<Badge className="flex items-center px-3 py-1 bg-primary/10 text-primary">
						<Layers className="w-4 h-4 text-primary" />
						<span className="ml-2">{item?.jobIndustry?.title}</span>
					</Badge>
				</div>
			</CardContent>
		</Card>
	)
}

export default JobGrid2

