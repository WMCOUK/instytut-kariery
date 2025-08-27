"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BarChart, Briefcase, Building2, FileText, Mail, Search, Users } from "lucide-react"
import Image from "next/image"

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
		<h3 className="text-2xl font-bold mt-4 text-center">{caption}</h3>
	</div>
)

export default function RecruiterFeaturesShowcase() {
	return (
		<section className="py-24" id="recruiters">
			<div className="container px-4 md:px-6">
				<div className="text-center mb-16">
					<Badge variant="outline" className="mb-2">
						For Recruiters
					</Badge>
					<h2 className="text-4xl font-bold mb-4">Powerful Recruiting Tools</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Streamline your hiring process and find top talent with our advanced recruiter features
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12 items-stretch">
					<div className="space-y-6">
						<FeatureItem
							icon={Search}
							title="Advanced Candidate Search"
							description="Use powerful filters to search candidates by skills, experience, location, and more. Find the perfect match for your open positions."
						/>
						<FeatureItem
							icon={Users}
							title="Applicant Tracking System"
							description="Manage your hiring pipeline efficiently. Track applicants, schedule interviews, and collaborate with your team in one place."
						/>
						<FeatureItem
							icon={Briefcase}
							title="Job Posting Management"
							description="Create and manage job postings with ease. Set custom application questions and screening criteria to attract qualified candidates."
						/>
					</div>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="h-full"
					>
						<ImageWithCaption
							src="/images/demo/landing/4.png"
							alt="Recruiter Dashboard"
							caption="Efficient Talent Acquisition"
						/>
					</motion.div>
				</div>

				<div className="mt-24 grid md:grid-cols-2 gap-12 items-stretch">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="h-full md:order-2"
					>
						<ImageWithCaption
							src="/images/demo/landing/5.png"
							alt="Company Profile Management"
							caption="Enhance Your Employer Brand"
						/>
					</motion.div>
					<div className="space-y-6 md:order-1">
						<FeatureItem
							icon={Building2}
							title="Customizable Company Profile"
							description="Showcase your company culture, values, and open positions with a fully customizable company profile page."
						/>
						<FeatureItem
							icon={BarChart}
							title="Analytics and Insights"
							description="Gain valuable insights into your job postings' performance, applicant demographics, and hiring trends to optimize your recruitment strategy."
						/>
						<FeatureItem
							icon={FileText}
							title="Resume Parsing and Management"
							description="Automatically extract key information from resumes and easily manage candidate documents in one centralized location."
						/>
						<FeatureItem
							icon={Mail}
							title="Automated Communication"
							description="Set up automated email templates for applicant updates, interview scheduling, and follow-ups to keep candidates informed throughout the process."
						/>
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
						Start Recruiting Now
					</Button>
				</motion.div>
			</div>
		</section>
	)
}

