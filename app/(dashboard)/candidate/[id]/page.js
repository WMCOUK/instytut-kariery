import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import CandidateApplicationList from "@/components/landing/elements/candidates/CandidateApplicationList"
import { CandidateCvList } from "@/components/landing/elements/candidates/CandidateCvList"
import { CandidateEducationTimeline } from "@/components/landing/elements/candidates/CandidateEducationTimeline"
import { CandidateExperienceTimeline } from "@/components/landing/elements/candidates/CandidateExperienceTimeline"
import { CandidateSkillsList } from "@/components/landing/elements/candidates/CandidateSkillsList"
import LayoutLanding1 from "@/components/landing/layout/landing/LayoutLanding1"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/utils"
import { getCandidateDetails } from "@/utils/fetchServer"
import { ChevronRight, Download, FileText, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import { Suspense } from "react"

export async function generateMetadata({ params }) {
	const { id } = params
	const candidate = await getCandidateDetails(id)
	return {
		title: candidate?.personal?.name || "Candidate Profile",
		description: `View the profile of ${candidate?.personal?.name || "candidate"}, ${candidate?.personal?.designation || ""}`,
	}
}

function CandidateInfoSkeleton() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-72 w-full rounded-xl" />
			<div className="flex items-center gap-4">
				<Skeleton className="h-24 w-24 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-6 w-48" />
					<Skeleton className="h-4 w-32" />
				</div>
			</div>
		</div>
	)
}

function CandidateDetailContent({ candidate }) {
	if (!candidate) return <div className="text-center py-10">Candidate not found</div>

	const formattedDate = formatDate(candidate?.createdAt)
	const skills = candidate?.candidateSkill || []
	const experiences = candidate?.candidateExperience || []
	const educations = candidate?.candidateEducation || []
	const cvs = candidate?.candidateCv || []
	const applications = candidate?.application || []

	return (
		<>
			<div className="relative">
				<div className="h-72 mt-10 rounded-xl relative bg-muted overflow-hidden">
					{candidate?.personal?.coverPhoto ? (
						<Image
							src={candidate.personal.coverPhoto || "/placeholder.svg"}
							alt="Cover photo"
							fill
							priority
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 1200px"
						/>
					) : (
						<div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>
					)}
				</div>

				<div className="absolute -bottom-16 left-8 sm:left-10 border-4 border-background rounded-2xl shadow-lg">
					<Image
						src={candidate?.personal?.image || "/images/placeholder.svg"}
						alt={candidate?.personal?.name || "Profile"}
						height={128}
						width={128}
						className="rounded-xl h-32 w-32 object-cover"
						priority
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 mt-20">
				<div className="lg:col-span-2 space-y-10">
					<div>
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
							<div>
								<h1 className="text-2xl font-bold">{candidate?.personal?.name}</h1>
								<p className="text-muted-foreground">{candidate?.personal?.designation}</p>
							</div>
							<div className="flex gap-2 flex-wrap">
								{candidate?.personal?.tags?.map((tag, index) => (
									<Badge key={index} variant="outline" className="px-3 py-1">
										{tag}
									</Badge>
								))}
							</div>
						</div>

						<Card className="border-none shadow-none bg-muted/50">
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-4">About {candidate?.personal?.name}</h2>
								<p className="text-muted-foreground leading-relaxed">
									{candidate?.personal?.about ||
										`As a ${candidate?.personal?.designation}, you will work within a Product Delivery Team fused with UX,
                    engineering, product and data talent. You will help the team design beautiful interfaces that solve
                    business challenges for our clients. We work with a number of Tier 1 banks on building web-based
                    applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are
                    looking to segue your career into the FinTech or Big Data arenas.`}
								</p>
							</CardContent>
						</Card>
					</div>

					<div>
						<h2 className="text-xl font-semibold mb-6">Skills & Expertise</h2>
						<CandidateSkillsList skills={skills} />
					</div>

					<div>
						<h2 className="text-xl font-semibold mb-6">Work Experience</h2>
						<CandidateExperienceTimeline experiences={experiences} />
					</div>

					<div>
						<h2 className="text-xl font-semibold mb-6">Education & Training</h2>
						<CandidateEducationTimeline educations={educations} />
					</div>

					<div>
						<h2 className="text-xl font-semibold mb-6">CV/Resume</h2>
						<CandidateCvList cvs={cvs} />
					</div>
				</div>

				<div className="space-y-8">
					<Card className="bg-primary/5 border-none shadow-sm">
						<CardHeader>
							<CardTitle className="text-primary text-lg">Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-start gap-3">
								<Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
								<div>
									<p className="text-sm font-medium text-muted-foreground">Phone</p>
									<p className="font-medium">{candidate?.personal?.phone || "Not provided"}</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
								<div>
									<p className="text-sm font-medium text-muted-foreground">Email</p>
									<p className="font-medium break-all">{candidate?.email || "Not provided"}</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
								<div>
									<p className="text-sm font-medium text-muted-foreground">Location</p>
									<p className="font-medium">{candidate?.personal?.city || "Not provided"}</p>
								</div>
							</div>

							{candidate?.personal?.hourlyRate && (
								<div className="pt-2 mt-2 border-t">
									<p className="text-sm font-medium text-muted-foreground">Hourly Rate</p>
									<p className="font-medium">${candidate.personal.hourlyRate}/hr</p>
								</div>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">Active Applications</CardTitle>
						</CardHeader>
						<CardContent className="pb-4">
								<>
									<CandidateApplicationList applications={applications.slice(0, 3)} />
								</>
						</CardContent>
					</Card>

					{cvs.length > 0 && (
						<Card>
							<CardHeader className="pb-3">
								<CardTitle>Download Resume</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<FileText className="w-6 h-6 text-muted-foreground" />
										<div>
											<p className="font-medium">{candidate?.personal?.name}</p>
											<p className="text-sm text-muted-foreground">PDF</p>
										</div>
									</div>
									<Button variant="outline" size="icon" className="h-10 w-10">
										<Download className="h-5 w-5" />
										<span className="sr-only">Download resume</span>
									</Button>
								</div>
							</CardContent>
						</Card>
					)}

					<div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
						<p>Profile created: {formattedDate || "Recently"}</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default async function CandidateDetails({ params }) {
	const { id } = params

	if (!id) {
		return (
			<LayoutLanding1 headerStyle={2}>
				<div className="container py-20 text-center">
					<h1 className="text-2xl font-bold">Candidate not found</h1>
					<p className="text-muted-foreground mt-2">The candidate ID is missing or invalid.</p>
				</div>
			</LayoutLanding1>
		)
	}

	const candidate = await getCandidateDetails(id)

	return (
		<LayoutAdmin>
			<Suspense fallback={<CandidateInfoSkeleton />}>
				<CandidateDetailContent candidate={candidate} />
			</Suspense>
		</LayoutAdmin>
	)
}

