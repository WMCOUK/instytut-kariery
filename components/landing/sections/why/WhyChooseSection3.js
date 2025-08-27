import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Card, CardContent } from "@/components/ui/card"
import { Bell, BookOpen, Layers, Search, Shield, Smartphone } from 'lucide-react'

const data = [
	{
		title: "Job Opportunities",
		desc: "We provide our customers with access to a vast and diverse range of job opportunities across various industries and sectors.",
		icon: <Layers className="w-8 h-8" />
	},
	{
		title: "Search and Filtering",
		desc: "Our powerful search and filtering options allow users to refine their job searches based on specific criteria such as location, industry, and job type.",
		icon: <Search className="w-8 h-8" />
	},
	{
		title: "Resources and Advice",
		desc: "In addition to job listings, we offer a wealth of career resources and advice. Our blog, articles, and guides cover a wide range of topics to support your career growth.",
		icon: <BookOpen className="w-8 h-8" />
	},
	{
		title: "Trust and Reliability",
		desc: "We have established a reputation for trust and reliability in the industry. Our commitment to quality job listings and data security ensures a safe and effective job search experience.",
		icon: <Shield className="w-8 h-8" />
	},
	{
		title: "User-Friendly Interface",
		desc: "Our platform features an intuitive and easy-to-use interface, making it simple for job seekers to navigate and find relevant opportunities quickly.",
		icon: <Smartphone className="w-8 h-8" />
	},
	{
		title: "Personalized Job Alerts",
		desc: "Stay informed about new job opportunities that match your preferences with our customizable job alert system, ensuring you never miss out on relevant openings.",
		icon: <Bell className="w-8 h-8" />
	},
]


export default function WhyChooseSection3() {
	return (
		<section className="py-12">
			<div className="container mx-auto">
				<SectionTitle
					style={1}
					title="Why choose us?"
					subTitle="At our job website, we prioritize delivering an exceptional customer experience that sets us apart from the competition. Here are some reasons why our customers love"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12">
					{data.map((item, i) => (
						<Card
							key={i}
							className="group transition-all duration-300 ease-in-out hover:bg-primary hover:shadow-lg"
						>
							<CardContent className="p-7">
								<div className="text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-5">
									{item.icon}
								</div>
								<h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary-foreground transition-colors duration-300">
									{item.title}
								</h3>
								<p className="text-muted-foreground group-hover:text-primary-foreground/90 transition-colors duration-300">
									{item.desc}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}


