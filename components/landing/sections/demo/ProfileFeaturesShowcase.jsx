"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { Bell, Building2, Globe, Mail, MapPin, Shield, Upload, UserCircle } from "lucide-react"
import Image from "next/image"
import DemoTitle from "./DemoTitle"

const FeatureCard = ({ icon: Icon, title, description }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		viewport={{ once: true }}
		className="flex items-start space-x-4 bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors"
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

const NotificationSetting = ({ label }) => (
	<div className="flex items-center justify-between py-2">
		<span className="text-sm">{label}</span>
		<Switch />
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

export default function ProfileFeaturesShowcase() {
	return (
		<section className="py-24 bg-gradient-to-b from-background to-muted/30" id="profiles">
			<div className="container px-4 md:px-6">
				<DemoTitle
					badge="Profile Management"
					title="Complete Profile Control"
					description="Manage your professional presence and communication preferences in one place"
				/>

				<div className="grid md:grid-cols-2 gap-12 items-stretch mb-16">
					<div className="space-y-6">
						<div className="space-y-4">
							<FeatureCard
								icon={UserCircle}
								title="Professional Profile"
								description="Create a detailed professional profile showcasing your skills, experience, and achievements to stand out to potential employers."
							/>
							<FeatureCard
								icon={Bell}
								title="Smart Notifications"
								description="Customize your notification preferences for job alerts, application updates, and recruiter messages."
							/>
							<FeatureCard
								icon={Shield}
								title="Privacy Controls"
								description="Manage your profile visibility and control who can see your information with granular privacy settings."
							/>
							<FeatureCard
								icon={Upload}
								title="Document Management"
								description="Upload and manage multiple versions of your CV, resumes, and portfolios in one secure location."
							/>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="h-full"
					>
						<ImageWithCaption
							src="/images/demo/admin/profile.png"
							alt="Profile Management Interface"
							caption="Comprehensive Profile Management"
						/>
					</motion.div>
				</div>

				<div className="grid md:grid-cols-3 gap-8 mt-16">
					{/* Profile Information */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
						className="bg-card rounded-lg p-6 border border-border"
					>
						<h4 className="text-lg font-semibold mb-4 flex items-center">
							<UserCircle className="w-5 h-5 mr-2 text-primary" />
							Profile Information
						</h4>
						<div className="space-y-3">
							<div className="flex items-center text-sm">
								<Building2 className="w-4 h-4 mr-2 text-muted-foreground" />
								<span>Company & Role</span>
							</div>
							<div className="flex items-center text-sm">
								<Mail className="w-4 h-4 mr-2 text-muted-foreground" />
								<span>Contact Details</span>
							</div>
							<div className="flex items-center text-sm">
								<MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
								<span>Location</span>
							</div>
							<div className="flex items-center text-sm">
								<Globe className="w-4 h-4 mr-2 text-muted-foreground" />
								<span>Website & Social</span>
							</div>
						</div>
					</motion.div>

					{/* Notification Settings */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
						className="bg-card rounded-lg p-6 border border-border"
					>
						<h4 className="text-lg font-semibold mb-4 flex items-center">
							<Bell className="w-5 h-5 mr-2 text-primary" />
							Notification Settings
						</h4>
						<div className="space-y-2">
							<NotificationSetting label="Job Alerts" />
							<NotificationSetting label="Application Updates" />
							<NotificationSetting label="Recruiter Messages" />
							<NotificationSetting label="Profile Views" />
						</div>
					</motion.div>

					{/* Privacy Controls */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						viewport={{ once: true }}
						className="bg-card rounded-lg p-6 border border-border"
					>
						<h4 className="text-lg font-semibold mb-4 flex items-center">
							<Shield className="w-5 h-5 mr-2 text-primary" />
							Privacy Controls
						</h4>
						<div className="space-y-2">
							<NotificationSetting label="Public Profile" />
							<NotificationSetting label="Show Resume" />
							<NotificationSetting label="Available for Hire" />
							<NotificationSetting label="Show Contact Info" />
						</div>
					</motion.div>
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

