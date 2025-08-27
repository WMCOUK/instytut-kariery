'use client'

import DocsContent from '@/components/landing/layout/docs/content'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
	Layers,
	LayoutDashboard,
	Server,
	Toolbox,
} from 'lucide-react'

const techStackData = [
	{
		title: 'Frontend',
		icon: LayoutDashboard,
		items: [
			<>
				<strong>Next.js 15.1.5</strong>: React-based framework for server-side rendering and static site generation.
			</>,
			<>
				<strong>React 18</strong>: Core UI library.
			</>,
			<>
				<strong>Tailwind CSS 3.4.17</strong>: Utility-first CSS framework.
			</>,
			<>
				<strong>Radix UI</strong>: Accessible, unstyled UI components (accordion, dialog, dropdown, etc.).
			</>,
			<>
				<strong>Tiptap 2.11.3</strong>: Rich text editor for job descriptions and posts.
			</>,
			<>
				<strong>Framer Motion 12.0.0</strong>: Animations for smooth UI transitions.
			</>,
			<>
				<strong>Leaflet 1.9.4</strong>: Interactive maps for job locations.
			</>,
			<>
				<strong>React Hook Form 7.54.2</strong>: Form management with validation.
			</>,
			<>
				<strong>Next-Intl 3.26.3</strong>: Internationalization support.
			</>,
		],
	},
	{
		title: 'Backend',
		icon: Server,
		items: [
			<>
				<strong>Prisma 6.11.0</strong>: ORM for PostgreSQL database interactions.
			</>,
			<>
				<strong>NextAuth.js 4.24.11</strong>: Authentication with OAuth providers (GitHub, Google).
			</>,
			<>
				<strong>Stripe 17.5.0</strong>: Payment processing and subscription management.
			</>,
			<>
				<strong>Cloudinary (via next-cloudinary 6.16.0)</strong>: Media storage and optimization.
			</>,
		],
	},
	{
		title: 'Dev Tools',
		icon: Toolbox,
		items: [
			<>
				<strong>ESLint 9</strong>: Code linting for consistent code quality.
			</>,
			<>
				<strong>PostCSS 8</strong>: CSS processing with Tailwind integration.
			</>,
			<>
				<strong>Vercel Analytics 1.5.0</strong>: Usage tracking and analytics.
			</>,
			<>
				<strong>Prisma CLI</strong>: Database migrations and schema management.
			</>,
		],
	},
]

export default function TechnologyStack({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				{/* <h2 className="text-2xl font-semibold text-foreground">{title || 'Technology Stack'}</h2> */}

				<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{techStackData.map(({ title, icon: Icon, items }, idx) => (
						<Card key={idx} className="border">
							<CardHeader className="flex items-center space-x-3">
								<Layers className="h-5 w-5 text-primary" />
								<h3 className="text-lg font-semibold text-foreground">{title}</h3>
							</CardHeader>
							<CardContent>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
									{items.map((item, i) => (
										<li key={i}>{item}</li>
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
