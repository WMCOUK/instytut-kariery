"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, Rocket, Sliders, Users, Zap } from "lucide-react"
import Image from "next/image"
import DemoTitle from "./DemoTitle"

const WhyPurchaseItem = ({ icon: Icon, title, description }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		className="flex items-start space-x-4 bg-card p-6 rounded-xl border border-border hover:border-primary transition-colors"
	>
		<div className="flex-shrink-0">
			<div className="p-3 bg-primary/10 rounded-full">
				<Icon className="h-6 w-6 text-primary" />
			</div>
		</div>
		<div>
			<h4 className="font-semibold text-lg mb-2">{title}</h4>
			<p className="text-muted-foreground">{description}</p>
		</div>
	</motion.div>
)

export default function WhyPurchaseSection() {
	const benefits = [
		{
			icon: Briefcase,
			title: "Comprehensive Solution",
			description: "Complete Recruitment platform with tailored dashboards for all user types.",
		},
		{
			icon: Users,
			title: "User-Centric Design",
			description: "Intuitive interfaces ensuring smooth experience for job seekers and hiring managers.",
		},
		{
			icon: Zap,
			title: "Powerful Features",
			description: "Advanced functionalities including job tracking, resume building, and real-time analytics.",
		},
		{
			icon: Sliders,
			title: "Customizable and Scalable",
			description: "Adaptable platform that grows with your user base without compromising performance.",
		},
		{
			icon: Rocket,
			title: "Time and Cost Efficient",
			description: "Ready-to-deploy solution saving development time and resources for quick launch.",
		},
	]

	return (
		<section className="py-24 bg-gradient-to-b from-muted/30 to-background" id="why">
			<div className="container px-4 md:px-6">
				<DemoTitle
					badge="Why Choose Us"
					title="Elevate Your Recruitment Process"
					description="Discover the advantages of our comprehensive Recruitment solution"
				/>

				<div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
					<div className="grid gap-6">
						{benefits.map((benefit, index) => (
							<WhyPurchaseItem
								key={index}
								icon={benefit.icon}
								title={benefit.title}
								description={benefit.description}
							/>
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="relative w-full h-full min-h-[500px] lg:min-h-[600px] border border-border rounded-3xl overflow-hidden"
					>
						<Image src="/images/demo/landing/1.png" alt="Why Purchase Illustration" fill className="object-cover" />
						<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
						<div className="absolute bottom-6 left-6 right-6">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border"
							>
								<h3 className="text-2xl font-bold mb-2">Ready to Transform Your Recruitment?</h3>
								<p className="text-muted-foreground mb-4">
									Join thousands of satisfied customers and streamline your hiring process today.
								</p>
								<Button className="w-full">
									Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}

