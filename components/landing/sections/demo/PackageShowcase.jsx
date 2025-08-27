"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Package, Star } from "lucide-react"
import Link from "next/link"
import Marquee from "react-fast-marquee"

const packages = [
	{
		name: "Next.js",
		short_title: "React Framework",
		link: "https://nextjs.org/",
		description: "A React framework for building server-side rendered applications.",
		popularity: 98
	},
	{
		name: "React",
		short_title: "JavaScript Library",
		link: "https://reactjs.org/",
		description: "A JavaScript library for building user interfaces.",
		popularity: 97
	},
	{
		name: "Tailwind CSS",
		short_title: "CSS Framework",
		link: "https://tailwindcss.com/",
		description: "A utility-first CSS framework for building modern user interfaces.",
		popularity: 95
	},
	{
		name: "Prisma",
		short_title: "Database Toolkit",
		link: "https://www.prisma.io/",
		description: "A modern database toolkit used to manage database schemas and queries.",
		popularity: 92
	},
	{
		name: "Stripe",
		short_title: "Payment Platform",
		link: "https://stripe.com/",
		description: "Payment processing platform for handling subscriptions and transactions.",
		popularity: 90
	},
	{
		name: "SWR",
		short_title: "Data Fetching Hooks",
		link: "https://swr.vercel.app/",
		description: "A React Hooks library for data fetching.",
		popularity: 88
	},
	{
		name: "Radix UI",
		short_title: "UI Components",
		link: "https://www.radix-ui.com/",
		description: "A library of unstyled, accessible UI components for building high-quality design systems.",
		popularity: 86
	},
	{
		name: "React Hook Form",
		short_title: "Form Handling",
		link: "https://react-hook-form.com/",
		description: "A performant, flexible, and extensible forms library for React.",
		popularity: 85
	},
	{
		name: "Next Auth",
		short_title: "Authentication",
		link: "https://next-auth.js.org/",
		description: "Authentication for Next.js applications.",
		popularity: 84
	},
	{
		name: "Lucide React",
		short_title: "Lucide Icons",
		link: "https://github.com/lucide-icons/lucide",
		description: "A collection of SVG icons for React.",
		popularity: 82
	},
	{
		name: "Yup",
		short_title: "Validation Library",
		link: "https://github.com/jquense/yup",
		description: "A JavaScript schema builder for value parsing and validation.",
		popularity: 80
	},
	{
		name: "Sonner",
		short_title: "Toast Notifications",
		link: "https://github.com/sonnerjs/sonner",
		description: "A simple toast notification library.",
		popularity: 78
	},
	{
		name: "Swiper",
		short_title: "Image Carousel",
		link: "https://swiperjs.com/",
		description: "A modern touch slider library for creating image carousels.",
		popularity: 76
	},
	{
		name: "Date-fns",
		short_title: "Date Utilities",
		link: "https://date-fns.org/",
		description: "Modern JavaScript date utility library.",
		popularity: 75
	},
	{
		name: "Next Themes",
		short_title: "Theme Switcher",
		link: "https://github.com/pacocoursey/next-themes",
		description: "A lightweight theme-switching library for Next.js.",
		popularity: 74
	},
	{
		name: "Resend",
		short_title: "Email Service",
		link: "https://github.com/resend/resend",
		description: "A platform for sending transactional and marketing emails.",
		popularity: 72
	}
]

const PackageCard = ({ pkg, index }) => (
	<Card className="w-72 flex flex-col m-2 shrink-0">
		<CardHeader className="pb-0">
			<CardTitle className="flex items-center justify-between text-base">
				<span className="truncate mr-2">{pkg.name}</span>
				<Link
					href={pkg.link}
					target="_blank"
					rel="noopener noreferrer"
					className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
				>
					<ExternalLink className="w-4 h-4" />
					<span className="sr-only">Visit {pkg.name}</span>
				</Link>
			</CardTitle>
		</CardHeader>
		<CardContent className="flex-grow flex flex-col pt-2">
			<p className="text-xs font-medium text-muted-foreground mb-2">{pkg.short_title}</p>
			<p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3  truncate">{pkg.description}</p>
			<div className="flex items-center justify-between mt-auto">
				<div className="flex items-center">
					<Star className="w-3 h-3 text-yellow-400 mr-1" />
					<span className="text-xs font-medium">{pkg.popularity}%</span>
				</div>
				<Badge variant="secondary" className="text-xs">
					<Package className="w-3 h-3 mr-1" />#{index + 1}
				</Badge>
			</div>
		</CardContent>
	</Card>
)

export default function PackageShowcase() {
	const sortedPackages = [...packages].sort((a, b) => b.popularity - a.popularity)

	return (
		<section className="py-16 bg-muted/20 overflow-hidden" id="packages">
			<div className="px-4">
				<div className="text-center mb-12">
					<Badge variant="outline" className="mb-2">
						Essential Tools
					</Badge>
					<h2 className="text-3xl font-bold mb-4">Popular Development Packages</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Explore our curated list of widely-used packages that power modern web development. These tools are
						essential for building robust and efficient applications.
					</p>
				</div>
				<Marquee className="mb-8" gradient={false} speed={40}>
					{sortedPackages.slice(0, 8).map((pkg, index) => (
						<PackageCard key={pkg.name} pkg={pkg} index={index} />
					))}
				</Marquee>
				<Marquee className="mb-8" gradient={false} speed={40} direction="right">
					{sortedPackages.slice(8).map((pkg, index) => (
						<PackageCard key={pkg.name} pkg={pkg} index={index + 8} />
					))}
				</Marquee>
			</div>
		</section>
	)
}

