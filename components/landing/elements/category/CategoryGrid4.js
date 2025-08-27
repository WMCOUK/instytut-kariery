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

export default function CategoryGrid4({ item, style }) {
	const IconComponent = iconMapping[item.title] || Heart

	const title = item?.title
	const words = title?.split(' ')

	return (
		<>
		
				<Link href={`/jobs?jobIndustrySlug=${item.slug}`} className="group">
					<div className="py-5 rounded-2xl text-left bg-card px-5 group-hover:bg-primary transition duration-150">
						<div className="h-20 w-20 flex items-center justify-center text-primary bg-primary/20 transition duration-150 rounded-xl mb-5 group-hover:bg-primary-foreground group-hover:text-primary">
							<div className="h-12 w-12 text-5xl">
								<IconComponent className="h-12 w-12 mx-auto" />
							</div>
						</div>
						<h4 className="mb-2 text-lg font-semibold group-hover:text-primary-foreground transition duration-150">{item?.title}
						</h4>
						<span className="text-muted-foreground text-sm group-hover:text-primary-foreground/80 transition duration-150">{item?.job?.length} Open Position</span>
					</div>
				</Link>
				
		</>
	)
}

