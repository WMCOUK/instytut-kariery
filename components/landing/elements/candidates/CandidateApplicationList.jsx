import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

// Dummy applications data to display when no applications are provided
// const dummyApplications = [
// 	{
// 		id: 1,
// 		job: {
// 			id: 101,
// 			title: "Senior Frontend Developer",
// 		},
// 		recruiter: {
// 			id: 201,
// 			title: "Tech Innovations Inc.",
// 			image: "/images/placeholder.svg",
// 		},
// 		appliedAt: "2023-11-15T09:30:00Z",
// 		status: "interview",
// 	},
// 	{
// 		id: 2,
// 		job: {
// 			id: 102,
// 			title: "UX/UI Designer",
// 		},
// 		recruiter: {
// 			id: 202,
// 			title: "Creative Solutions Ltd",
// 			image: "/images/placeholder.svg",
// 		},
// 		appliedAt: "2023-10-28T14:45:00Z",
// 		status: "screening",
// 	},
// 	{
// 		id: 3,
// 		job: {
// 			id: 103,
// 			title: "Full Stack Developer",
// 		},
// 		recruiter: {
// 			id: 203,
// 			title: "Global Tech Partners",
// 			image: "/images/placeholder.svg",
// 		},
// 		appliedAt: "2023-12-05T11:20:00Z",
// 		status: "applied",
// 	},
// 	{
// 		id: 4,
// 		job: {
// 			id: 103,
// 			title: "Full Stack Developer",
// 		},
// 		recruiter: {
// 			id: 203,
// 			title: "Global Tech Partners",
// 			image: "/images/placeholder.svg",
// 		},
// 		appliedAt: "2023-12-05T11:20:00Z",
// 		status: "applied",
// 	},
// ]

export default function CandidateApplicationList({ applications }) {
	// If no applications are provided or applications array is empty, use dummy applications
	// const displayApplications = !applications || applications.length === 0 ? dummyApplications : applications

	// Function to get appropriate badge variant based on status
	const getStatusVariant = (status) => {
		const statusMap = {
			applied: "secondary",
			screening: "outline",
			interview: "default",
			shortlisted: "secondary",
			selected: "success",
			rejected: "destructive",
			hired: "success",
		}

		return statusMap[status?.toLowerCase()] || "secondary"
	}

	// Function to format the status text
	const formatStatus = (status) => {
		if (!status) return "Applied"
		return status.charAt(0).toUpperCase() + status.slice(1)
	}

	return (
		<>
			<div className="space-y-4 mb-4">
				{applications?.map((application) => (
					<div
						key={application.id}
						className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
								<Image
									src={application.recruiter?.image || "/images/placeholder.svg?height=40&width=40"}
									alt={`${application.recruiter?.title || "Company"} logo`}
									fill
									sizes="40px"
									className="object-cover"
								/>
							</div>
							<div>
								<h3 className="font-medium text-sm">{application.job?.title || "Job Position"}</h3>
								<p className="text-sm text-muted-foreground">{application.recruiter?.title || "Company Name"}</p>
								<p className="text-xs text-muted-foreground">
									Applied on:{" "}
									{application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : "Recently"}
								</p>
							</div>
						</div>
						<Badge variant={getStatusVariant(application.status)}>{formatStatus(application.status)}</Badge>
					</div>
				))}

				{applications?.length > 3 && (
					<Button className="w-full mt-4" variant="outline">
						View All {applications?.length} Applications
						<ChevronRight className="w-4 h-4 ml-1" />
					</Button>
				)}
			</div>
		</>
	)
}

