"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Briefcase, Building2, Clock, DollarSign, Filter, Search, Star } from "lucide-react"
import Image from "next/image"
import DemoTitle from "./DemoTitle"

const FeatureItem = ({ icon: Icon, title, description }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		viewport={{ once: true }}
		className="flex items-start space-x-4 bg-card rounded-lg p-4 border border-border hover:border-primary transition-colors"
	>
		<div className="bg-primary/10 p-3 rounded-full">
			<Icon className="w-6 h-6 text-primary" />
		</div>
		<div>
			<h4 className="text-lg font-semibold mb-2">{title}</h4>
			<p className="text-muted-foreground">{description}</p>
		</div>
	</motion.div>
)

const ImageWithCaption = ({ src, alt, caption }) => (
	<div className="flex flex-col h-full">
		<div className="relative flex-grow rounded-xl overflow-hidden border border-border">
			<Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
		</div>
		<p className="text-sm font-semibold text-center mt-4">{caption}</p>
	</div>
)

export default function JobFeaturesShowcase() {
	return (
		<section id="jobs" className="py-24">
			<div className="container px-4 md:px-6">
				<DemoTitle
					badge="Job Seeker Tools"
					title="Find Your Dream Job"
					description="Discover powerful features designed to streamline your job search and application process"
				/>

				<div className="space-y-24">
					{/* Job Search Features */}
					<div className="grid md:grid-cols-2 gap-12 items-stretch">
						<div className="space-y-6">
							<FeatureItem
								icon={Filter}
								title="Advanced Filters"
								description="Filter by industry, job type, experience level, location, and posting date. Toggle between freelance and full-time positions."
							/>
							<FeatureItem
								icon={Search}
								title="Comprehensive Search"
								description="Search by job title, description, or required skills. Our search understands industry terminology."
							/>
							<FeatureItem
								icon={Clock}
								title="Real-time Updates"
								description="Get the latest job postings with salary ranges from $40K to $200K+ yearly. View posting dates and set alerts."
							/>
						</div>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="h-full"
						>
							<ImageWithCaption src="/images/demo/landing/2.png" alt="Job Search Interface" caption="Smart Job Search" />
						</motion.div>
					</div>

					{/* Job Details Features */}
					<div className="grid md:grid-cols-2 gap-12 items-stretch">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="md:order-2 h-full"
						>
							<ImageWithCaption
								src="/images/demo/landing/3.png"
								alt="Job Details Interface"
								caption="Detailed Job Information"
							/>
						</motion.div>
						<div className="space-y-6 md:order-1">
							<FeatureItem
								icon={Building2}
								title="Complete Company Details"
								description="View company size, founding year, location, and contact details. Make informed decisions about your next career move."
							/>
							<FeatureItem
								icon={DollarSign}
								title="Transparent Compensation"
								description="Clear salary information for all positions, ranging from $40K to $650K per year, helping you understand your market value."
							/>
							<FeatureItem
								icon={Briefcase}
								title="Comprehensive Benefits"
								description="Access information about flexible schedules, remote work options, insurance coverage, and professional development opportunities."
							/>
							<FeatureItem
								icon={Star}
								title="Company Reviews"
								description="Read authentic reviews from current and former employees. Get insights into company culture and work environment."
							/>
						</div>
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="mt-16 text-center"
				>
					<Button size="lg" className="rounded-full px-8 py-6 text-lg font-semibold">
						Start Your Job Search
					</Button>
				</motion.div>
			</div>
		</section>
	)
}

