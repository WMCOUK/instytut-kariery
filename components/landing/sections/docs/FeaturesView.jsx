import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { brandName } from "@/utils"
import { CodeIcon, GlobeIcon, GridIcon, LockIcon, ShieldIcon, WalletIcon } from 'lucide-react'

const features = [
	{
		name: "User Authentication",
		description:
			"Log in securely using email & password, Magic Link, or authenticate with platforms like Google, Facebook, Twitter, and GitHub.",
		Icon: ShieldIcon,
	},
	{
		name: "Role-Based Authorization",
		description:
			"Implement role-based access control. Manage and secure your routes easily, determining which users can access specific features.",
		Icon: LockIcon,
	},
	{
		name: "Management Dashboard",
		description: "A full-fledged admin panel to control users, manage roles, set permissions, and much more.",
		Icon: GridIcon,
	},
	{
		name: "Billing & Subscriptions",
		description:
			"Fully integrated with Stripe for managing payments. Users can subscribe, cancel, or update their billing information effortlessly.",
		Icon: WalletIcon,
	},
	{
		name: "Email Notifications & Templates",
		description:
			"Send out custom HTML emails for various scenarios such as welcome messages, magic links, and more, using built-in templates.",
		Icon: CodeIcon,
	},
	{
		name: "Internationalization",
		description:
			"Multi-language support including English, French, and Spanish with the option to easily add more.",
		Icon: GlobeIcon,
	},
]

export default function FeaturesView({ user }) {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="scroll-m-20 text-3xl font-semibold tracking-tight text-primary mb-4">
				Welcome, {user?.personal?.name || "You"}! to {brandName} Demo
			</h1>
			<p className="text-base text-muted-foreground mb-6">
				This Job Listing Directory offers a comprehensive view of the key features available through <strong>Full Stack Application</strong>. It's designed to save you time by offering out-of-the-box solutions for common functionalities.
			</p>

			<Separator className="my-6" />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{features.map((feature) => (
					<div key={feature.name} className="flex flex-col space-y-2 p-4 bg-card rounded-lg">
						<div className="flex items-center space-x-3">
							<div className="flex-shrink-0 p-2 bg-primary/10 rounded-md">
								<feature.Icon className="w-6 h-6 text-primary" />
							</div>
							<h3 className="text-base font-medium">
								{feature.name}
							</h3>
						</div>
						<p className="text-sm text-muted-foreground">
							{feature.description}
						</p>
					</div>
				))}
			</div>

			<p className="text-base mt-6 mb-6">
				With Full Stack Kit, you also get a rich collection of reusable components, utility functions, and design patterns. These tools help you build your app faster and more efficiently while maintaining high quality and a clean codebase.
			</p>

			<Separator className="my-6" />

			<div className="flex justify-center">
				<a href="/docs" target="_blank" rel="noopener noreferrer">
					<Button variant="outline" size="default">
						Explore the documentation →
					</Button>
				</a>
			</div>
		</div>
	)
}

