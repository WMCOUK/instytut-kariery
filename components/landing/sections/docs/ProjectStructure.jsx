'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProjectStructure({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				{/* Key Directories Section */}
				<Card className="border">
					<CardHeader>
						<h2 className="text-2xl font-semibold text-foreground">Key Directories</h2>
					</CardHeader>
					<CardContent>
						<ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
							<li><strong>app/(auth)</strong>: Handles sign-in, sign-up, reset-password, and email verification.</li>
							<li><strong>app/(dashboard)</strong>: Role-based dashboards (admin, candidate, recruiter) with sub-routes for managing jobs, profiles, and settings.</li>
							<li><strong>app/(public)</strong>: Public pages like About, FAQs, Jobs, and Candidate profiles.</li>
							<li><strong>app/api</strong>: RESTful API endpoints for CRUD operations on jobs, candidates, recruiters, and more.</li>
							<li><strong>components/admin</strong>: Admin-specific components for dashboards, forms, and tables.</li>
							<li><strong>components/landing</strong>: UI components for public landing pages (hero sections, job grids, etc.).</li>
							<li><strong>components/ui</strong>: Reusable UI primitives (buttons, modals, tables) using Radix UI.</li>
							<li><strong>fetchSwr</strong>: SWR hooks for efficient data fetching and caching.</li>
							<li><strong>prisma</strong>: PostgreSQL schema and migrations for database management.</li>
						</ul>
					</CardContent>
				</Card>

				{/* Directory Tree Section */}
				<pre className="bg-muted p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap">
					{`├── app/                          # Next.js pages and API routes
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # Protected dashboard routes for admin, candidate, recruiter
│   ├── (public)/                 # Public-facing pages
│   ├── api/                      # API routes for data operations
│   ├── favicon.ico               # Site favicon
│   ├── global.css                # Global styles
│   ├── layout.js                 # Root layout
│   ├── loading.js                # Loading states
│   └── page.js                   # Home page
├── components/                   # Reusable React components
│   ├── admin/                    # Admin dashboard components
│   ├── landing/                  # Public landing page components
│   ├── ui/                       # Reusable UI components (Radix UI)
│   └── logo.jsx                  # Application logo
├── fetchSwr/                     # SWR hooks for data fetching
├── i18n/                         # Internationalization files
├── prisma/                       # Prisma ORM configuration
│   ├── migrations/               # Database migrations
│   └── schema.prisma             # Database schema
├── public/                       # Static assets (images, icons)
├── utils/                        # Utility functions (auth, billing, etc.)
├── .eslintrc.json                # ESLint configuration
├── components.json               # Component metadata
├── i18n.js                       # Internationalization config
├── jsconfig.json                 # JavaScript configuration
├── middleware.js                 # Next.js middleware
├── next.config.mjs               # Next.js configuration
├── package.json                  # Project dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration`}
				</pre>
			</div>
		</DocsContent>
	)
}
