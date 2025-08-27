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

export default function CategoryGrid2({ item, style }) {
	const IconComponent = iconMapping[item.title] || Heart

	const title = item?.title
	const words = title?.split(' ')

	return (
		<>

			<Link href={`/jobs?jobIndustrySlug=${item.slug}`} className="group">
				<div className="flex items-center border border-border rounded-xl group-hover:border-primary transition duration-150">
					<div className="py-6 px-6 text-primary bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition duration-150">
						<div className="h-12 w-12 text-5xl">
							<IconComponent className="h-12 w-12 mx-auto" />
						</div>
					</div>
					<div className="ml-4">
						<h4 className="mb-1 text-lg font-semibold">
							{item?.title}
						</h4>
						<span className="text-muted-foreground text-sm">{item?.job?.length} Open Position</span>
					</div>
				</div>
			</Link>
		</>
	)
}

