'use client'

import DocsContent from '@/components/landing/layout/docs/content'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
	Briefcase,
	Cpu,
	Globe,
	Shield,
	User,
} from 'lucide-react'

const featuresData = [
	{
		title: 'Candidate Features',
		icon: User,
		items: [
			'Profile Management: Create/edit profiles with CVs, education, experience, and skills.',
			'Job Applications: Apply to jobs and track application status.',
			'Favorite Jobs: Save jobs for later review.',
			'Subscriptions: Manage premium subscriptions via Stripe.',
			'Settings: Customize preferences, social links, and personal details.',
		],
	},
	{
		title: 'Recruiter Features',
		icon: Briefcase,
		items: [
			'Job Management: Create, edit, and moderate job postings with attributes (benefits, location, experience, etc.).',
			'Applicant Tracking: View and manage candidate applications.',
			'Billing: Handle subscriptions and invoices via Stripe.',
			'Profile Customization: Build recruiter profiles with company details.',
		],
	},
	{
		title: 'Admin Features',
		icon: Shield,
		items: [
			'User Management: Manage candidates, recruiters, and moderators.',
			'Job Moderation: Approve, reject, or mark jobs as pending/closed.',
			'Attribute Management: Define job attributes (industries, locations, positions, etc.).',
			'Analytics: View dashboards with job, user, and post statistics.',
			'Backup/Restore: Export and import PostgreSQL data.',
		],
	},
	{
		title: 'Public Features',
		icon: Globe,
		items: [
			'Job Browsing: Filter and view job listings by category, location, or type.',
			'Candidate/Recruiter Profiles: Explore public profiles.',
			'Informational Pages: Access About, FAQs, Contact, and Demo pages.',
			'Multi-Language Support: Switch between supported languages (English, French, Spanish, German).',
		],
	},
	{
		title: 'Technical Features',
		icon: Cpu,
		items: [
			'Rich Text Editing: Tiptap for creating job descriptions and posts.',
			'Media Uploads: Cloudinary for image and file management.',
			'Analytics: Vercel Analytics for tracking user interactions.',
			'Responsive Design: Tailwind CSS and Radix UI for a modern, accessible UI.',
		],
	},
]

function highlightKeyword(text) {
	const [keyword, rest] = text.split(':')
	return (
		<>
			<strong className="font-semibold text-foreground">{keyword}:</strong>{rest}
		</>
	)
}

export default function KeyFeatures({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">

				{/* 4-column grid with responsive breakpoints */}
				<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
					{featuresData.map(({ title, icon: Icon, items }, idx) => (
						<Card key={idx} className="border">
							<CardHeader className="flex items-center space-x-3">
								<Icon className="h-5 w-5 text-primary" />
								<h3 className="text-lg font-semibold text-foreground">{title}</h3>
							</CardHeader>
							<CardContent>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
									{items.map((item, i) => (
										<li key={i}>{highlightKeyword(item)}</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>

				<Separator className="my-6" />
			</div>
		</DocsContent>
	)
}
