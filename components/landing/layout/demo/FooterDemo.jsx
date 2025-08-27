import { brandName } from "@/utils"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

const FooterSection = ({ title, links }) => (
	<div>
		<h3 className="font-semibold mb-4">{title}</h3>
		<ul className="space-y-2">
			{links.map((link, index) => (
				<li key={index}>
					<Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	</div>
)

export default function FooterDemo() {
	const currentYear = new Date().getFullYear()

	const footerSections = [
		{
			title: "For Job Seekers",
			links: [
				{ label: "Browse Jobs", href: "#" },
				{ label: "Companies", href: "#" },
				{ label: "Career Advice", href: "#" },
				{ label: "Salary Calculator", href: "#" },
				{ label: "Resume Builder", href: "#" },
			],
		},
		{
			title: "For Employers",
			links: [
				{ label: "Post a Job", href: "#" },
				{ label: "Pricing", href: "#" },
				{ label: "Recruitment Solutions", href: "#" },
				{ label: "Employer Branding", href: "#" },
				{ label: "Applicant Tracking", href: "#" },
			],
		},
		{
			title: "Company",
			links: [
				{ label: "About Us", href: "#" },
				{ label: "Press", href: "#" },
				{ label: "Careers", href: "#" },
				{ label: "Contact Us", href: "#" },
				{ label: "Partnerships", href: "#" },
			],
		},
		{
			title: "Resources",
			links: [
				{ label: "Help Center", href: "#" },
				{ label: "Privacy Policy", href: "#" },
				{ label: "Terms of Service", href: "#" },
				{ label: "Cookie Policy", href: "#" },
				{ label: "Accessibility", href: "#" },
			],
		},
	]

	return (
		<footer className="bg-background border-t">
			<div className="container mx-auto px-4 py-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<p className="text-sm text-muted-foreground">© {currentYear} {brandName} All rights reserved.</p>
					<div className="flex space-x-4">
						<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
							<Facebook className="h-5 w-5" />
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
							<Twitter className="h-5 w-5" />
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
							<Linkedin className="h-5 w-5" />
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
							<Instagram className="h-5 w-5" />
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
							<Youtube className="h-5 w-5" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

