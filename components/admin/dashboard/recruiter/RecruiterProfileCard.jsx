'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { fetchRecruiter } from "@/fetchSwr"
import { Calendar, Globe, Mail, MapPin, Phone, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function RecruiterProfileCard() {
	const searchParams = useSearchParams()
	const page = Number.parseInt(searchParams.get("page") || "1")
	const { recruiters, totalPage, currentPage, totalRecruiter, isLoading } = fetchRecruiter(page)

	if (isLoading) {
		return <p>Loading recruiters...</p>
	}

	return (
		<div className="space-y-6">
			{/* Title */}
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">Recruiters</h1>
				<p className="text-muted-foreground text-sm">{totalRecruiter} total recruiters</p>
			</div>

			{/* Recruiter Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{recruiters?.map((recruiter) => (
					<Card key={recruiter.id} className="w-full duration-200">
						<CardHeader>
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
								<div className="flex sm:flex-row gap-4">
										<Image width={48} height={48} src={recruiter.image || "/images/placeholder.svg"} alt={recruiter.title} />
									<div>
										<h2 className="text-lg sm:text-xl font-semibold">{recruiter.title}</h2>
										{/* <p className="text-primary mb-1">{recruiter.designation || "—"}</p> */}
										<div className="flex items-center text-muted-foreground text-sm">
											<MapPin className="w-4 h-4 mr-1" />
											{recruiter.city || "Unknown City"}
										</div>
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 text-sm">
								{/* Contact Info */}
								<div className="space-y-3">
									<div className="flex items-center">
										<Phone className="w-4 h-4 mr-2 text-muted-foreground" />
										<span className="break-all">{recruiter.phone || "N/A"}</span>
									</div>
									<div className="flex items-center">
										<Mail className="w-4 h-4 mr-2 text-muted-foreground" />
										<span className="break-all">{recruiter.email || "N/A"}</span>
									</div>
									<div className="flex items-center">
										<Globe className="w-4 h-4 mr-2 text-muted-foreground" />
										{recruiter.website ? (
											<a href={recruiter.website} className="text-primary hover:underline break-all">
												{recruiter.website}
											</a>
										) : (
											<span>N/A</span>
										)}
									</div>
								</div>

								{/* Company Info */}
								<div className="space-y-3">
									<div className="flex items-center">
										<Users className="w-4 h-4 mr-2 text-muted-foreground" />
										<span>
											<span className="font-semibold">Company size:</span>{" "}
											{recruiter.numberOfEmployees
												? `${recruiter.numberOfEmployees} employees`
												: "N/A"}
										</span>
									</div>
									<div className="flex items-center">
										<Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
										<span>
											<span className="font-semibold">Founded in:</span>{" "}
											{recruiter.yearFounded || "N/A"}
										</span>
									</div>
								</div>
							</div>

							{/* Contact Button */}
							<Link href={`/recruiter/${recruiter.slug}`}>
								<Button className="w-full mt-5">View Profile</Button>
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
