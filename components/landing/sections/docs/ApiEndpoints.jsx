'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const apiSections = [
	{
		title: "Authentication",
		endpoints: [
			{ method: "POST", path: "/api/auth/[...nextauth]", description: "Handles sign-in, sign-up, and session management (NextAuth.js)." },
			{ method: "POST", path: "/api/v1/reset-password", description: "Initiates password reset process." },
			{ method: "POST", path: "/api/v1/verify-email", description: "Verifies user email addresses." },
		],
	},
	{
		title: "Job Management",
		endpoints: [
			{ method: "GET", path: "/api/v1/job/[slug]", description: "Fetch job details by slug." },
			{ method: "GET", path: "/api/v1/job/all", description: "List all jobs." },
			{ method: "GET", path: "/api/v1/job/approved, /pending, /draft, /closed, /rejected", description: "Filter jobs by status." },
			{ method: "POST", path: "/api/v1/job", description: "Create a new job." },
			{ method: "PUT", path: "/api/v1/job/[slug]", description: "Update a job." },
			{ method: "GET", path: "/api/v1/job/featured, /latest, /trending", description: "Fetch featured, recent, or trending jobs." },
		],
	},
	{
		title: "Candidate Management",
		endpoints: [
			{ method: "GET", path: "/api/v1/candidate/[id]", description: "Fetch candidate details." },
			{ method: "GET", path: "/api/v1/candidate/all", description: "List all candidates." },
			{ method: "POST", path: "/api/v1/candidate/cv, /education, /experience, /skill", description: "Create candidate attributes." },
			{ method: "PUT", path: "/api/v1/candidate/cv/[slug], /education/[slug], etc.", description: "Update candidate attributes." },
		],
	},
	{
		title: "Recruiter Management",
		endpoints: [
			{ method: "GET", path: "/api/v1/recruiter/[slug]", description: "Fetch recruiter details." },
			{ method: "GET", path: "/api/v1/recruiter/all", description: "List all recruiters." },
			{ method: "POST", path: "/api/v1/recruiter", description: "Create a recruiter profile." },
			{ method: "PUT", path: "/api/v1/recruiter/[slug]", description: "Update a recruiter profile." },
		],
	},
	{
		title: "Payment Integration",
		endpoints: [
			{ method: "POST", path: "/api/v1/stripe/checkout-session", description: "Create a Stripe checkout session." },
			{ method: "POST", path: "/api/v1/stripe/customer-portal-session", description: "Access the Stripe customer portal." },
			{ method: "POST", path: "/api/v1/stripe/cancel-subscription", description: "Cancel a subscription." },
			{ method: "POST", path: "/api/v1/stripe/resume-subscription", description: "Resume a subscription." },
			{ method: "POST", path: "/api/v1/stripe/update-subscription", description: "Update a subscription plan." },
			{ method: "POST", path: "/api/v1/webhooks", description: "Handle Stripe webhook events." },
		],
	},
	{
		title: "Other Endpoints",
		endpoints: [
			{ method: "GET/POST", path: "/api/v1/post/[slug]", description: "Manage blog posts." },
			{ method: "POST", path: "/api/v1/newsletter", description: "Subscribe to newsletters." },
			{ method: "GET", path: "/api/v1/tag/[slug]", description: "Filter content by tags." },
			{ method: "GET/POST", path: "/api/v1/comment/[id]", description: "Manage comments on posts." },
		],
	},
]

export default function ApiEndpoints({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				{/* <h2 className="text-2xl font-semibold text-foreground">{title || "API Endpoints"}</h2> */}

				{apiSections.map(({ title, endpoints }, idx) => (
					<Card key={idx} className="border">
						<CardHeader>
							<h3 className="text-lg font-semibold text-foreground">{title}</h3>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm text-muted-foreground">
								{endpoints.map(({ method, path, description }, i) => (
									<li key={i} className="flex flex-wrap gap-2">
										<code className="font-mono font-semibold bg-muted px-2 rounded">{method}</code>
										<code className="font-mono text-primary">{path}</code>
										<span>- {description}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				))}

				<Separator className="my-6" />
			</div>
		</DocsContent>
	)
}
