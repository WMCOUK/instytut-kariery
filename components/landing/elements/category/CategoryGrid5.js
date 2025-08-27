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

export default function CategoryGrid5({ item, style }) {
	const IconComponent = iconMapping[item.title] || Heart

	const title = item?.title
	const words = title?.split(' ')

	return (
		<>
		
				<Link href={`/jobs?jobIndustrySlug=${item.slug}`} className="group">
					<div className="px-5 py-5 border border-border rounded-2xl group-hover:border-primary transition duration-150">
						<span className="bg-muted rounded-xl px-3 py-1 inline-block text-primary text-sm group-hover:bg-primary group-hover:text-primary-foreground transition duration-150">{item?.job?.length} Open Position</span>
						<div className="py-8">
							<div className="h-12 w-12 text-5xl text-primary">
								<IconComponent className="h-12 w-12 mx-auto" />
							</div>
						</div>
						<h4 className="mb-0 text-lg font-semibold group-hover:text-primary transition duration-150">
							{item?.title}
						</h4>
					</div>
				</Link>
				
		</>
	)
}

