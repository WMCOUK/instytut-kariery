"use client"

import { cn } from "@/utils"
import { BarChart, Code, Columns, DollarSign, Edit, Heart, Megaphone, Monitor, Paintbrush, ShoppingBag, Users } from 'lucide-react'
import Link from 'next/link'

// Define the mapping of job titles to their corresponding icons
const iconMapping = {
	'Software Engineer': Code,
	'Data Scientist': BarChart,
	'Web Developer': Monitor,
	'Graphic Designer': Paintbrush,
	'Project Manager': Columns,
	'Marketing Specialist': Megaphone,
	'Financial Analyst': DollarSign,
	'Human Resources': Users,
	'Sales Representative': ShoppingBag,
	'Content Writer': Edit,
}



export default function CategoryGrid1({ item }) {
	const IconComponent = iconMapping[item.title] || Heart

	const title = item?.title
	const words = title?.split(' ')

	return (
		<Link
			href={`/jobs?jobIndustrySlug=${item.slug}`}
			className="block group"
		>
			<div className="p-4 bg-card hover:bg-primary/95 transition-all duration-200 rounded-xl border border-border hover:border-primary shadow-sm hover:shadow-md">
				<div className="flex flex-col items-center space-y-4">
					<div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground transition-colors duration-200">
						<IconComponent className="h-7 w-7" />
					</div>

					<h3 className="text-base font-medium leading-tight text-center text-foreground group-hover:text-primary-foreground transition-colors duration-200">
						{words.length > 1 ? (
							<>
								{words[0]} <br />
								{words[1]}
							</>
						) : (
							title
						)}
					</h3>

					<span className={cn(
						"text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-200",
						"inline-flex items-center gap-1"
					)}>
						<span className="font-medium">{item?.job?.length || 0}</span>
						<span>{item?.job?.length === 1 ? "Position" : "Positions"}</span>
					</span>
				</div>
			</div>
		</Link>
	)
}
