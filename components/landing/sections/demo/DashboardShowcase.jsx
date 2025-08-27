"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BarChart, Bell, Briefcase, Building2, CheckCircle, Clock, FileText, Mail, Search, Users } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import DemoTitle from "./DemoTitle"

const DashboardImage = ({ title, image }) => (
	<motion.div
		initial={{ opacity: 0, scale: 0.9 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
		className="relative rounded-xl overflow-hidden border border-border hover:border-primary transition-colors h-full"
	>
		<Image src={image || "/images/placeholder.svg"} alt={`${title} Dashboard`} fill className="object-cover" />
		<h3 className="absolute bottom-0 left-0 right-0 bg-background/80 text-foreground p-4 text-xl font-bold text-center">
			{title}
		</h3>
	</motion.div>
)

const FeatureList = ({ title, description, features }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		className="space-y-6"
	>
		<ul className="space-y-4">
			{features.map((feature, index) => (
				<li
					key={index}
					className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border hover:border-primary transition-colors"
				>
					<div className="p-2 rounded-full bg-primary text-primary-foreground">
						<feature.icon className="w-5 h-5 flex-shrink-0" />
					</div>
					<div>
						<h4 className="font-semibold">{feature.title}</h4>
						<p className="text-sm text-muted-foreground">{feature.description}</p>
					</div>
				</li>
			))}
		</ul>
	</motion.div>
)

const dashboards = [
	{
		title: "Candidate Dashboard",
		description: "Streamlined job search and application tracking for job seekers",
		image: "/images/demo/admin/candidate-dashboard.png",
		features: [
			{
				icon: Briefcase,
				title: "Job Application Tracking",
				description: "Monitor all your job applications in one place",
			},
			{
				icon: FileText,
				title: "Resume Builder",
				description: "Create and manage multiple resumes tailored for different roles",
			},
			{ icon: Bell, title: "Custom Job Alerts", description: "Set up personalized notifications for new job postings" },
			{ icon: Clock, title: "Application History", description: "Review past applications and their outcomes" },
			{
				icon: CheckCircle,
				title: "Skills Assessment",
				description: "Take skill tests to showcase your abilities to employers",
			},
		],
	},
	{
		title: "Admin Dashboard",
		description: "Comprehensive platform management and analytics for administrators",
		image: "/images/demo/admin/admin-dashboard.png",
		features: [
			{ icon: BarChart, title: "Real-time Analytics", description: "Monitor key platform metrics and user activity" },
			{
				icon: Users,
				title: "User Management",
				description: "Manage accounts for job seekers, recruiters, and companies",
			},
			{
				icon: Building2,
				title: "Company Verification",
				description: "Review and approve company profiles and job postings",
			},
			{
				icon: Search,
				title: "Content Moderation",
				description: "Ensure all posted content adheres to platform guidelines",
			},
			{ icon: Mail, title: "Communication Center", description: "Manage system-wide notifications and announcements" },
		],
	},
	{
		title: "Recruiter Dashboard",
		description: "Efficient job posting and candidate management for hiring teams",
		image: "/images/demo/admin/recruiter-dashboard.png",
		features: [
			{
				icon: Briefcase,
				title: "Job Posting Management",
				description: "Create, edit, and track job listings with ease",
			},
			{
				icon: Users,
				title: "Applicant Tracking",
				description: "Organize and evaluate candidates throughout the hiring process",
			},
			{
				icon: BarChart,
				title: "Recruitment Analytics",
				description: "Gain insights into your hiring funnel and job performance",
			},
			{
				icon: Building2,
				title: "Company Profile",
				description: "Showcase your company culture and benefits to attract top talent",
			},
			{
				icon: Mail,
				title: "Candidate Communication",
				description: "Streamline messaging with applicants and schedule interviews",
			},
		],
	},
]

export default function DashboardShowcase() {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<section className="py-24 bg-gradient-to-b from-background to-muted/30" id="dashboard">
			<div className="container px-4 md:px-6">
				<DemoTitle
					badge="User Interfaces"
					title="Intuitive Dashboards"
					description="Explore our tailored dashboards for administrators, recruiters, and job seekers"
				/>

				<div className="mt-12">
					{/* Tab Menu */}
					<div className="flex flex-wrap justify-center mb-12">
						{dashboards.map((dashboard, index) => (
							<Button
								key={index}
								variant={activeTab === index ? "default" : "ghost"}
								onClick={() => setActiveTab(index)}
								className="m-2"
							>
								{dashboard.title}
							</Button>
						))}
					</div>

					{/* Content */}
					<div className="grid lg:grid-cols-2 gap-12 items-stretch">
						{/* Dashboard Image (first on larger screens) */}
						<motion.div className="order-2 lg:order-1 h-full" layout>
							<DashboardImage title={dashboards[activeTab].title} image={dashboards[activeTab].image} />
						</motion.div>

						{/* Features */}
						<motion.div className="order-1 lg:order-2" layout>
							<FeatureList
								title={dashboards[activeTab].title}
								description={dashboards[activeTab].description}
								features={dashboards[activeTab].features}
							/>
						</motion.div>
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="mt-20 text-center"
				>
					<Button size="lg" className="rounded-full px-12 py-8 text-xl font-bold">
						Start Your Free Trial
					</Button>
				</motion.div>
			</div>
		</section>
	)
}

