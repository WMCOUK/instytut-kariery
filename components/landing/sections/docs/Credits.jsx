'use client'

import DocsContent from '@/components/landing/layout/docs/content'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
const packages = [
	{
		"name": "Next.js",
		"link": "https://nextjs.org/",
	},
	{
		"name": "Stripe",
		"link": "https://stripe.com/",
	},
	{
		"name": "Prisma",
		"link": "https://www.prisma.io/",
	},
	{
		"name": "Radix UI",
		"link": "https://www.radix-ui.com/",
	},
	{
		"name": "Tailwind CSS",
		"link": "https://tailwindcss.com/",
	},
	{
		"name": "React",
		"link": "https://reactjs.org/",
	},
	{
		"name": "Yup",
		"link": "https://github.com/jquense/yup",
	},
	{
		"name": "Sonner",
		"link": "https://github.com/sonnerjs/sonner",
	},
	{
		"name": "SWR",
		"link": "https://swr.vercel.app/",
	},
	{
		"name": "bcrypt",
		"link": "https://www.npmjs.com/package/bcrypt",
	},
	{
		"name": "clsx",
		"link": "https://github.com/lukeed/clsx",
	},
	{
		"name": "cmdk",
		"link": "https://github.com/pacocoursey/cmdk",
	},
	{
		"name": "date-fns",
		"link": "https://date-fns.org/",
	},
	{
		"name": "embla-carousel-react",
		"link": "https://www.embla-carousel.com/",
	},
	{
		"name": "input-otp",
		"link": "https://www.npmjs.com/package/input-otp",
	},
	{
		"name": "lucide-react",
		"link": "https://github.com/lucide-icons/lucide",
	},
	{
		"name": "moment",
		"link": "https://momentjs.com/",
	},
	{
		"name": "next-auth",
		"link": "https://next-auth.js.org/",
	},
	{
		"name": "next-cloudinary",
		"link": "https://github.com/cloudinary/next-cloudinary",
	},
	{
		"name": "next-intl",
		"link": "https://github.com/amannn/next-intl",
	},
	{
		"name": "next-share",
		"link": "https://next-share.vercel.app/",
	},
	{
		"name": "next-themes",
		"link": "https://github.com/pacocoursey/next-themes",
	},
	{
		"name": "react-day-picker",
		"link": "https://github.com/wojtekmaj/react-day-picker",
	},
	{
		"name": "react-flag-kit",
		"link": "https://github.com/aaroniker/react-flag-kit",
	},
	{
		"name": "react-hook-form",
		"link": "https://react-hook-form.com/",
	},
	{
		"name": "react-modal-video",
		"link": "https://github.com/rammyblog/react-modal-video",
	},
	{
		"name": "react-parallax-mouse",
		"link": "https://github.com/itsjamie/react-parallax-mouse",
	},
	{
		"name": "react-quill",
		"link": "https://github.com/zenoamaro/react-quill",
	},
	{
		"name": "react-resizable-panels",
		"link": "https://github.com/bvaughn/react-resizable-panels",
	},
	{
		"name": "react-tagsinput",
		"link": "https://github.com/olahol/react-tagsinput",
	},
	{
		"name": "resend",
		"link": "https://github.com/resend/resend",
	},
	{
		"name": "swiper",
		"link": "https://swiperjs.com/",
	},
	{
		"name": "tailwind-merge",
		"link": "https://github.com/dcastil/tailwind-merge",
	},
	{
		"name": "tailwindcss-animate",
		"link": "https://github.com/axeldelafosse/tailwindcss-animate",
	},
	{
		"name": "use-react-countries",
		"link": "https://github.com/arnabsen1809/use-react-countries",
	},
	{
		"name": "vaul",
		"link": "https://github.com/vaul/react",
	}
]

export default function Credits({ title = "Credits", path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{packages.map((pkg) => (
					<Card
						key={pkg.name}
						className="flex items-center justify-between p-2 hover:shadow-sm transition-shadow duration-300"
						as="article"
					>
						<CardContent className="flex items-center justify-between p-0">
							<span className=" font-semibold truncate pr-2">{pkg.name}</span>
							<Link
								href={pkg.link}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Visit ${pkg.name} website`}
								className="text-primary hover:text-primary/80 transition-colors text-sm"
							>
								<ExternalLink className="h-4 w-4" />
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</DocsContent>
	)
}
