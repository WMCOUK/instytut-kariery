'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { brandName } from "@/utils"

const models = [
	{
		name: "User",
		fields: [
			"id",
			"email",
			"password (hashed)",
			"role (admin, candidate, recruiter, moderator)",
			"createdAt",
			"updatedAt",
		],
		relations: [
			"Links to Candidate, Recruiter, and Personal",
		],
	},
	{
		name: "Candidate",
		fields: [
			"id",
			"userId",
			"bio",
			"createdAt",
			"updatedAt",
		],
		relations: [
			"Links to CandidateCv, CandidateEducation, CandidateExperience, CandidateSkill, Application",
		],
	},
	{
		name: "Recruiter",
		fields: [
			"id",
			"userId",
			"companyName",
			"companyDescription",
			"createdAt",
			"updatedAt",
		],
		relations: [
			"Links to Job, Rating",
		],
	},
	{
		name: "Job",
		fields: [
			"id",
			"title",
			"slug",
			"description",
			"status (draft, pending, approved, rejected, closed)",
			"createdAt",
			"updatedAt",
		],
		relations: [
			"Links to JobBenefit, JobExperience, JobIndustry, JobLocation, JobPosition, JobType, JobWorkMode, Application",
		],
	},
	{
		name: "Post",
		fields: [
			"id",
			"title",
			"slug",
			"content",
			"createdAt",
			"updatedAt",
		],
		relations: [
			"Links to Category",
		],
	},
	{
		name: "Application",
		fields: [
			"id",
			"candidateId",
			"jobId",
			"status",
			"createdAt",
			"updatedAt",
		],
	},
	{
		name: "Subscription",
		fields: [
			"id",
			"userId",
			"stripeCustomerId",
			"stripeSubscriptionId",
			"status",
			"createdAt",
			"updatedAt",
		],
	},
]

export default function DatabaseSchema({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				<p className="text-muted-foreground leading-relaxed">
					{brandName} uses <strong>Prisma</strong> with <strong>PostgreSQL</strong> for data storage. The schema is defined in <code>prisma/schema.prisma</code>. Key models include:
				</p>

				{models.map(({ name, fields, relations }, idx) => (
					<Card key={idx} className="border">
						<CardHeader>
							<h3 className="text-lg font-semibold text-foreground">{name}</h3>
						</CardHeader>
						<CardContent>
							<div className="mb-3">
								<div className="font-medium text-foreground mb-1">Fields:</div>
								<ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
									{fields.map((field, i) => (
										<li key={i}>{field}</li>
									))}
								</ul>
							</div>
							{relations && relations.length > 0 && (
								<div>
									<div className="font-medium text-foreground mb-1">Relations:</div>
									<ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
										{relations.map((relation, i) => (
											<li key={i}>{relation}</li>
										))}
									</ul>
								</div>
							)}
						</CardContent>
					</Card>
				))}

				<p className="text-muted-foreground leading-relaxed">
					The schema includes additional models for attributes (e.g., <code>JobBenefit</code>, <code>JobIndustry</code>) and user preferences (<code>Preference</code>, <code>SocialLink</code>). Migrations are stored in <code>prisma/migrations/</code>.
				</p>

				<Separator className="my-6" />
			</div>
		</DocsContent>
	)
}
