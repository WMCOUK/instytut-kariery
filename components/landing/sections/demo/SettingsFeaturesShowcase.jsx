"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { Bell, Camera, LinkIcon, Shield, User } from "lucide-react"
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

const SettingsSection = ({ title, children }) => (
	<div className="bg-card rounded-lg p-6 border border-border">
		<h4 className="text-lg font-semibold mb-4">{title}</h4>
		{children}
	</div>
)

const ToggleSetting = ({ label }) => (
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

export default function SettingsFeaturesShowcase() {
	return (
		<section className="py-24 bg-gradient-to-b from-background to-muted/30" id="settings">
			<div className="container px-4 md:px-6">
				<DemoTitle
					badge="Settings & Preferences"
					title="Customizable User Settings"
					description="Take control of your account with comprehensive settings and preferences"
				/>

				<div className="grid md:grid-cols-2 gap-12 items-stretch mb-16">
					<div className="space-y-6">
						<div className="space-y-4">
							<FeatureCard
								icon={User}
								title="Profile Settings"
								description="Manage your personal information, professional details, and account status with ease."
							/>
							<FeatureCard
								icon={LinkIcon}
								title="Social Integration"
								description="Connect and manage your social media accounts to enhance your professional presence."
							/>
							<FeatureCard
								icon={Bell}
								title="Notification Controls"
								description="Fine-tune your notification preferences for job alerts, applications, and updates."
							/>
							<FeatureCard
								icon={Shield}
								title="Privacy Management"
								description="Control your profile visibility and manage who can see your information."
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
							alt="Settings Interface"
							caption="Complete Account Management"
						/>
					</motion.div>
				</div>

				<div className="grid md:grid-cols-3 gap-8 mt-16">
					{/* Profile Settings Demo */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
					>
						<SettingsSection title="Profile Settings">
							<div className="space-y-4">
								<div className="relative w-24 h-24 mx-auto mb-6">
									<Image
										src="/images/placeholder.svg?height=96&width=96"
										alt="Profile"
										width={96}
										height={96}
										className="rounded-full border border-border"
									/>
									<button className="absolute bottom-0 right-0 p-1 rounded-full bg-primary text-white">
										<Camera className="w-4 h-4" />
									</button>
								</div>
								<Input placeholder="Username" defaultValue="john.doe" />
								<Input placeholder="Email" defaultValue="john@example.com" />
								<Input placeholder="Job Title" defaultValue="Software Engineer" />
							</div>
						</SettingsSection>
					</motion.div>

					{/* Notification Settings Demo */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<SettingsSection title="Notification Preferences">
							<div className="space-y-2">
								<ToggleSetting label="Job Alerts" />
								<ToggleSetting label="Application Updates" />
								<ToggleSetting label="Profile Views" />
								<ToggleSetting label="Messages" />
								<ToggleSetting label="Newsletter" />
							</div>
						</SettingsSection>
					</motion.div>

					{/* Privacy Settings Demo */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						viewport={{ once: true }}
					>
						<SettingsSection title="Privacy Controls">
							<div className="space-y-2">
								<ToggleSetting label="Public Profile" />
								<ToggleSetting label="Show Resume" />
								<ToggleSetting label="Available for Hire" />
								<ToggleSetting label="Show Contact Info" />
								<ToggleSetting label="Allow Messages" />
							</div>
						</SettingsSection>
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
						Customize Your Settings
					</Button>
				</motion.div>
			</div>
		</section>
	)
}

