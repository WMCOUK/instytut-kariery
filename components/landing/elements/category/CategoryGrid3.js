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

export default function CategoryGrid3({ item, style }) {
	const IconComponent = iconMapping[item.title] || Heart

	const title = item?.title
	const words = title?.split(' ')

	return (
		<>
			<Link href={`/jobs?jobIndustrySlug=${item.slug}`} className="group">
				<div className="px-3 py-3 rounded-2xl text-center">
					<div className="py-6">
						<div className="h-12 w-12 mx-auto text-5xl text-primary group-hover:text-primary/80 transition duration-150">
							<IconComponent className="h-12 w-12 mx-auto" />
						</div>
					</div>
					<h4 className="mb-3 text-lg font-semibold group-hover:text-primary transition duration-150">
						{item?.title}
					</h4>
					<span className="text-muted-foreground text-sm group-hover:text-muted-foreground/80 transition duration-150">{item?.job?.length} Open Position</span>
				</div>
			</Link>
		</>
	)
}

