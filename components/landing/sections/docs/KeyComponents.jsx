'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Layers } from "lucide-react"

const componentsData = [
	{
		title: "Admin Dashboard (app/(dashboard)/admin)",
		items: [
			"AdminJobChart.jsx: Visualizes job posting trends using Recharts.",
			"DashboardStats.jsx: Displays metrics (e.g., total jobs, users).",
			"JobTable.jsx, UserTable.jsx: Data tables for managing jobs and users.",
			"JobModerationTable.jsx: Moderation interface for job statuses.",
		],
	},
	{
		title: "Candidate Dashboard (app/(dashboard)/candidate)",
		items: [
			"CandidateProfileCard.jsx: Summarizes candidate profile details.",
			"CandidateCvList.jsx: Displays CVs with edit/delete options.",
			"AppliedJob.jsx: Lists applied jobs with status tracking.",
			"CandidateSettingsForm.jsx: Form for updating candidate preferences.",
		],
	},
	{
		title: "Recruiter Dashboard (app/(dashboard)/recruiter)",
		items: [
			"RecruiterProfileCard.jsx: Shows recruiter profile and company details.",
			"JobListings.jsx: Manages job postings.",
			"RecruiterJobChart.jsx: Visualizes job performance metrics.",
			"RecruiterCreateForm.jsx, RecruiterEditForm.jsx: Forms for profile management.",
		],
	},
	{
		title: "Public Pages (app/(public))",
		items: [
			"HeroSection1.js to HeroSection7.js: Dynamic hero sections for landing pages.",
			"JobGrid1.js, JobList1.js: Display job listings in various formats.",
			"CandidateGrid1.js: Showcase candidate profiles.",
			"MapSection1.jsx: Display job locations using Leaflet.",
		],
	},
	{
		title: "UI Components (components/ui)",
		items: [
			"button.jsx, dialog.jsx, dropdown-menu.jsx: Reusable Radix UI components.",
			"form.jsx: Form wrapper with React Hook Form integration.",
			"toast.jsx, toaster.jsx: Notification components using Sonner.",
		],
	},
]

export default function KeyComponents({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				{/* <h2 className="text-2xl font-semibold text-foreground">{title || "Key Components"}</h2> */}

				{componentsData.map(({ title, items }, idx) => (
					<Card key={idx} className="border">
						<CardHeader className="flex items-center space-x-2">
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

				<Separator className="my-6" />
			</div>
		</DocsContent>
	)
}
