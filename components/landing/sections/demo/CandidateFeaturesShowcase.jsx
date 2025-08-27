"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Briefcase, Clock, Download, FileText, GraduationCap, Star, UserCircle } from "lucide-react"
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

const SkillBar = ({ skill, percentage }) => (
	<div className="space-y-2">
		<div className="flex justify-between text-sm">
			<span className="font-medium">{skill}</span>
			<span className="text-muted-foreground">{percentage}%</span>
		</div>
		<Progress value={percentage} className="h-2" />
	</div>
)

const ImageWithCaption = ({ src, alt, caption }) => (
	<div className="flex flex-col h-full">
		<div className="relative flex-grow rounded-xl overflow-hidden border border-border">
			<Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
		</div>
		<h3 className="text-2xl font-bold mt-4 text-center">{caption}</h3>
	</div>
)

export default function CandidateFeaturesShowcase() {
	return (
		<section className="py-24" id="candidates">
			<div className="container px-4 md:px-6">
				<DemoTitle
					badge="Candidate Tools"
					title="Build Your Career Profile"
					description="Create a powerful professional profile and connect with top employers"
				/>

				<div className="grid md:grid-cols-2 gap-12 items-stretch">
					<div className="space-y-6">
						<FeatureItem
							icon={UserCircle}
							title="Showcase Your Expertise"
							description="Create a comprehensive profile highlighting your skills, experience, and achievements. Stand out to potential employers."
						/>
						<FeatureItem
							icon={Star}
							title="Skills Assessment"
							description="Showcase your expertise with our skills assessment system. Display proficiency levels and certifications."
						/>
						<FeatureItem
							icon={Briefcase}
							title="Work Experience Timeline"
							description="Present your professional journey with a clear, visually appealing timeline of your work experience."
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
							src="/images/demo/landing/6.png"
							alt="Candidate Profiles"
							caption="Professional Profile Builder"
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
							src="/images/demo/landing/7.png"
							alt="Candidate Profile Details"
							caption="Smart Career Management"
						/>
					</motion.div>
					<div className="space-y-6 md:order-1">
						<FeatureItem
							icon={FileText}
							title="Resume Management"
							description="Upload and manage multiple versions of your resume. Track your application history and status."
						/>
						<FeatureItem
							icon={Clock}
							title="Application Tracking"
							description="Keep track of all your job applications in one place. Get real-time status updates and interview schedules."
						/>
						<FeatureItem
							icon={GraduationCap}
							title="Education & Certifications"
							description="Showcase your academic achievements, certifications, and continuing education credentials."
						/>
						<FeatureItem
							icon={Download}
							title="Profile Export"
							description="Export your profile as a professionally formatted resume or portfolio to share with employers."
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
						Create Your Profile
					</Button>
				</motion.div>
			</div>
		</section>
	)
}

