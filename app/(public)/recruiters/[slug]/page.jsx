import RatingRecruiterSection from "@/components/admin/elements/RatingRecruiterSection"
import RecruiterJobGrid1 from "@/components/landing/elements/recruiter/RecruiterJobGrid1"
import LayoutLanding1 from "@/components/landing/layout/landing/LayoutLanding1"
import MapSection2 from "@/components/landing/sections/map/MapSection2"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/utils"
import { getRecruiterDetails } from "@/utils/fetchServer"
import { ArrowLeft, Facebook, Instagram, Linkedin, MapPin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

export async function generateMetadata({ params }) {
	const awaitedParams = await params
	const slug = awaitedParams?.slug
	const recruiter = await getRecruiterDetails(slug)
	return {
		title: recruiter?.title || "Recruiter Details",
		description: recruiter?.description?.substring(0, 160) || "View recruiter profile and job listings",
	}
}


export default async function RecruiterDetails({ params }) {
	const slug = params?.slug
	const recruiter = await getRecruiterDetails(slug)
	const formattedDate = formatDate(recruiter?.createdAt)
	// console.log(recruiter);
	

	return (
		<LayoutLanding1>
			<div className="container px-4 sm:px-6 lg:px-8 mx-auto">
				{/* Back button */}
				<div className="mt-6">
					<Link
						href="/recruiters"
						className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to recruiters
					</Link>
				</div>

				{/* Cover photo */}
				<div
					className="h-48 sm:h-64 md:h-72 mt-6 rounded-xl relative bg-muted overflow-hidden"
					style={{
						backgroundImage: recruiter?.coverPhoto ? `url(${recruiter?.coverPhoto})` : "none",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{!recruiter?.coverPhoto && (
						<div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>
					)}
					<div className="absolute inset-0 bg-black/10"></div>
				</div>

				{/* Profile image */}
				<div className="relative z-10 px-4 sm:px-0">
					<div className="relative -mt-16 ml-4 sm:ml-8">
						<Image
							height={120}
							width={120}
							src={recruiter?.image || "/placeholder.svg?height=120&width=120"}
							alt={recruiter?.title || "Recruiter profile"}
							className="rounded-2xl border-4 border-background shadow-md h-24 w-24 sm:h-28 sm:w-28 object-cover"
							priority
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 mb-24 mt-8">
					{/* Main content */}
					<div className="lg:col-span-2 xl:col-span-3 order-2 lg:order-1">
						<div className="mb-10">
							<div className="mb-2">
								<span className="inline-flex items-center text-primary text-sm">
									<MapPin className="mr-1 h-4 w-4" />
									{recruiter?.city || "Location not specified"}
								</span>
							</div>
							<h1 className="text-2xl sm:text-3xl font-bold text-foreground">{recruiter?.title}</h1>
							<div className="mt-2 text-sm text-muted-foreground">Member since {formattedDate || "N/A"}</div>
						</div>

						<div className="mb-10">
							<h2 className="mb-4 text-xl font-semibold text-foreground">About {recruiter?.title}</h2>
							<p className="text-muted-foreground leading-relaxed">{recruiter?.description}</p>
						</div>

						{recruiter?.content && (
							<div className="mb-10">
								<h2 className="mb-4 text-xl font-semibold text-foreground">Details</h2>
								<div
									dangerouslySetInnerHTML={{ __html: recruiter?.content }}
									className="text-muted-foreground prose prose-sm max-w-none prose-headings:text-foreground prose-a:text-primary"
								/>
							</div>
						)}

						<div className="mb-10">
							<h2 className="mb-4 text-xl font-semibold text-foreground">Location</h2>
							<div className="rounded-xl overflow-hidden border h-[300px] bg-muted">
								<Suspense fallback={<Skeleton className="h-full w-full" />}>
									<MapSection2 />
								</Suspense>
							</div>
						</div>


						<div className="w-full">
							<h2 className="text-2xl font-semibold mb-6">Reviews</h2>


							<RatingRecruiterSection
								recruiterTitle={recruiter?.title}
								recruiterSlug={recruiter?.slug}
								// userRating={recruiter?.rating?.rating}
								// averageRating={recruiter?.averageRating}
							/>

						</div>

						{recruiter?.job?.length > 0 && (
							<div className="my-10">
								<h2 className="mb-4 text-xl font-semibold text-foreground">
									Open Positions ({recruiter?.job?.length})
								</h2>
								<div className="grid gap-4">
									{recruiter?.job?.map((item, i) => (
										<RecruiterJobGrid1 key={i} item={item} />
									))}
								</div>
							</div>
						)}
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1 order-1 lg:order-2">
						<div className="sticky top-24">
							<Card className="shadow-sm">
								<CardContent className="p-6">
									<div className="flex items-center mb-6">
										<Image
											width={60}
											height={60}
											src={recruiter?.image || "/placeholder.svg?height=60&width=60"}
											alt={recruiter?.title || "Recruiter profile"}
											className="rounded-xl object-cover h-[60px] w-[60px]"
										/>
										<div className="ml-4">
											<h3 className="font-medium text-foreground">{recruiter?.title}</h3>
											<Button variant="link" asChild className="h-auto p-0 text-sm text-primary">
												<Link href={`/recruiters/${slug}/contact`}>Contact Recruiter</Link>
											</Button>
										</div>
									</div>

									<div className="space-y-4">
										<RecruiterInfoItem label="Industry" value={recruiter?.jobIndustry?.title} />
										<RecruiterInfoItem
											label="Company size"
											value={
												recruiter?.numberOfEmployees ? `${recruiter?.numberOfEmployees} employees` : "Not specified"
											}
										/>
										<RecruiterInfoItem label="Founded in" value={recruiter?.yearFounded || "Not specified"} />
										<RecruiterInfoItem label="Phone" value={recruiter?.phone} />
										<RecruiterInfoItem label="Email" value={recruiter?.email} />
										<RecruiterInfoItem label="Location" value={recruiter?.city} />
										<RecruiterInfoItem label="Website" value={recruiter?.website} isLink />
									</div>

									<div className="flex pt-6 space-x-5">
										<SocialLink href={recruiter?.socialLinks?.facebook || "#"} Icon={Facebook} label="Facebook" />
										<SocialLink href={recruiter?.socialLinks?.linkedin || "#"} Icon={Linkedin} label="LinkedIn" />
										<SocialLink href={recruiter?.socialLinks?.twitter || "#"} Icon={Twitter} label="Twitter" />
										<SocialLink href={recruiter?.socialLinks?.instagram || "#"} Icon={Instagram} label="Instagram" />
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</LayoutLanding1>
	)
}

function RecruiterInfoItem({ label, value, isLink = false }) {
	if (!value) return null

	return (
		<div className="">
			<span className="text-sm text-muted-foreground block mb-1">{label}</span>
			{isLink ? (
				<Link
					href={value.startsWith("http") ? value : `https://${value}`}
					className="text-md font-medium text-primary hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					{value}
				</Link>
			) : (
				<h5 className="text-md font-medium text-foreground">{value}</h5>
			)}
		</div>
	)
}

function SocialLink({ href, Icon, label }) {
	return (
		<Link
			href={href}
			className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-muted"
			aria-label={label}
			target="_blank"
			rel="noopener noreferrer"
		>
			<Icon className="h-5 w-5" />
		</Link>
	)
}

