"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { fetcher } from "@/fetchSwr/common"
import { Circle, Facebook, Instagram, Linkedin, MapPin, Twitter } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import SocialShare from "../../elements/SocialShare"
import FavouriteJobButton from "../../elements/candidates/FavouriteJobButton"
import { JobAppliedForm } from "../../form/JobAppliedForm"

// Lazy load related jobs (client-only)
const RelatedJobSection1 = dynamic(() => import("../related/RelatedJobSection1"), { ssr: false })

export default function JobDetails1({ job }) {
	const { data } = useSWR(`/api/v1/job/${job.slug}`, fetcher, {
		fallbackData: job,
		revalidateOnMount: false,
	})

	const formattedDate = data?.createdAt
		? new Date(data.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
		: ""

	return (
		<div className="container mx-auto px-4">
			{/* Cover Photo (LCP) */}
			<div className="h-72 mt-10 rounded-3xl relative bg-muted">
				{data?.recruiter?.coverPhoto && (
					<Image
						src={data.recruiter.coverPhoto}
						alt={data.recruiter.title || "Cover Photo"}
						fill
						className="object-cover rounded-3xl overflow-hidden"
						priority
						fetchPriority="high"
						quality={60} // smaller image
					/>
				)}
				<Image
					height={100}
					width={100}
					src={data?.recruiter?.image || "/images/placeholder.webp"}
					alt={data?.recruiter?.title || "Logo"}
					className="rounded-2xl absolute -bottom-10 left-10 border-4 border-background"
					priority
					quality={60}
				/>
			</div>

			{/* Job Header */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-16 mb-16">
				<div>
					<span className="text-muted-foreground text-base">{data?.recruiter?.title}</span>
					<h2 className="text-3xl font-bold text-foreground mt-2 mb-3">{data?.title}</h2>
					<div>
						<span className="flex items-center text-muted-foreground">
							<MapPin className="mr-1 h-4 w-4" />
							{data?.recruiter?.city}
						</span>
						<p className="mt-3 text-muted-foreground text-sm">Created on: {formattedDate}</p>
					</div>
				</div>

				<div className="mt-4 md:mt-0 flex items-center space-x-3">
					<FavouriteJobButton jobTitle={data?.title} jobSlug={data?.slug} initialFavourite={data?.isFavourite} format="button" />
					<SocialShare />
					<JobAppliedForm jobSlug={data?.slug} recruiterSlug={data?.recruiter?.slug} />
				</div>
			</div>

			{/* Job Content */}
			<div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-16 mb-24">
				<div className="lg:col-span-3 xl:col-span-4">
					{/* Description */}
					<div className="overview mb-10">
						<h4 className="text-xl font-semibold mb-3">Description</h4>
						<p className="text-muted-foreground leading-relaxed">{data?.description}</p>
					</div>

					{/* Content */}
					<div dangerouslySetInnerHTML={{ __html: data?.content || "" }} className="text-muted-foreground leading-relaxed mb-10" />

					{/* Benefits */}
					<div className="mb-10">
						<h4 className="text-xl font-semibold mb-3">Benefits</h4>
						<div className="space-y-3">
							{data?.benefit?.map((b, i) => (
								<div key={i} className="flex items-center gap-3 text-muted-foreground">
									<Circle className="h-2 w-2 text-primary" /> {b}
								</div>
							))}
						</div>
					</div>

					{/* Skills */}
					<div className="mb-10">
						<h4 className="text-xl font-semibold mb-3">Skills</h4>
						<div className="flex flex-wrap gap-2">
							{data?.skills?.map((s, i) => (
								<Badge key={i} variant="secondary">
									<Link href={`/jobs?search=${s.toLowerCase()}`}>{s}</Link>
								</Badge>
							))}
						</div>
					</div>

					<RelatedJobSection1 slug={data?.slug} /> {/* lazy-loaded */}
				</div>

				{/* Sidebar */}
				<div className="lg:col-span-2 xl:col-span-2 space-y-8">
					<Card>
						<CardContent className="px-7 py-10">
							<JobInfoItem label="Experience" value={data?.jobExperience?.title} />
							<JobInfoItem label="Work Level" value={data?.jobPosition?.title} />
							<JobInfoItem label="Employment Type" value={data?.jobType?.title} />
							<JobInfoItem label="Salary" value={`${data?.minSalary}k - ${data?.maxSalary}k / year`} />
						</CardContent>
						<CardFooter>
							<JobAppliedForm className="w-full" jobSlug={data?.slug} candidateId={data?.user?.id} />
						</CardFooter>
					</Card>

					<Card>
						<CardContent className="px-7 py-10">
							<div className="flex items-center mb-6">
								<Image
									width={50}
									height={50}
									src={data?.recruiter?.image || "/images/placeholder.webp"}
									alt=""
									className="rounded-xl"
									quality={60}
								/>
								<div className="ml-3">
									<h5 className="font-medium text-foreground">{data?.recruiter?.title}</h5>
									<Link className="text-sm flex items-center text-primary" href={`/recruiters/${data?.recruiter?.slug}`}>View Profile</Link>
								</div>
							</div>

							<JobInfoItem label="Industry" value={data?.jobIndustry?.title} />
							<JobInfoItem label="Company size" value={`${data?.recruiter?.numberOfEmployees} employees`} />
							<JobInfoItem label="Founded in" value={data?.recruiter?.yearFounded} />
							<JobInfoItem label="Phone" value={data?.recruiter?.phone} />
							<JobInfoItem label="Email" value={data?.recruiter?.email} />
							<JobInfoItem label="Location" value={data?.recruiter?.city} />
							<JobInfoItem label="Website" value={data?.recruiter?.website} isLink />

							<div className="flex pt-4 space-x-4">
								<SocialLink href="#" Icon={Facebook} />
								<SocialLink href="#" Icon={Linkedin} />
								<SocialLink href="#" Icon={Twitter} />
								<SocialLink href="#" Icon={Instagram} />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

function JobInfoItem({ label, value, isLink = false }) {
	return (
		<div className="mb-5 last:mb-0">
			<span className="text-sm text-muted-foreground block mb-1">{label}</span>
			{isLink ? (
				<Link href={value} className="text-md font-medium text-primary hover:underline">{value}</Link>
			) : (
				<h5 className="text-md font-medium text-foreground">{value}</h5>
			)}
		</div>
	)
}

function SocialLink({ href, Icon }) {
	return (
		<Link href={href} className="inline-block text-muted-foreground hover:text-primary transition-colors">
			<Icon className="h-5 w-5" />
		</Link>
	)
}
