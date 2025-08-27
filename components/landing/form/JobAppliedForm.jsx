"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { checkApplicationExists, fetchAllCandidateCv } from "@/fetchSwr"
import CurrentUserClient from "@/utils/currentUserClient"
import { useState } from "react"
import { toast } from "sonner"

export function JobAppliedForm({ jobSlug, recruiterSlug, className }) {
	// console.log(recruiterSlug, "recruiterSlug in JobAppliedForm")
	const user = CurrentUserClient()
	const candidateId = user?.id
	const [isOpen, setIsOpen] = useState(false)
	const [coverLetter, setCoverLetter] = useState("")
	const [selectedCvSlug, setSelectedCvSlug] = useState("")

	const { cvs, isLoading: cvsLoading } = fetchAllCandidateCv(1)
	const { applicationExists, isLoading: checkingApplication, mutate } = checkApplicationExists(jobSlug, candidateId)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!jobSlug || !candidateId) {
			toast.error("Missing job or candidate information")
			return
		}
		if (!coverLetter) {
			toast.error("Please provide a cover letter")
			return
		}
		if (!selectedCvSlug) {
			toast.error("Please select a CV")
			return
		}

		const selectedCv = cvs.find((cv) => cv.slug === selectedCvSlug)
		if (!selectedCv || !selectedCv.fileUrl) {
			toast.error("Selected CV does not have a valid file URL")
			return
		}

		toast.promise(
			fetch("/api/v1/applied-job", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					coverLetter,
					cvFileUrl: selectedCv.fileUrl,
					candidateCvSlug: selectedCvSlug,
					jobSlug,
					candidateId,
					recruiterSlug,
					status: "pending",
				}),
			}).then(async (response) => {
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || "Failed to submit application")
				}
				return response.json()
			}),
			{
				loading: "Submitting application...",
				success: (data) => {
					console.log("Application submitted successfully:", data)
					setIsOpen(false)
					setCoverLetter("")
					setSelectedCvSlug("")
					// Mutate the SWR cache to update the application status
					mutate({ exists: true }, false)
					return "Application submitted successfully!"
				},
				error: (error) => {
					console.error("Error submitting application:", error)
					return `Failed to submit application: ${error.message}`
				},
			}
		)
	}

	const isLoading = cvsLoading || checkingApplication

	return (
		<>
			{user?.onboard === "CANDIDATE" &&
				<>

					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DialogTrigger asChild>
							<Button disabled={applicationExists || isLoading} className={className || ""}>
								{isLoading ? "Checking..." : applicationExists ? "Application Submitted" : "Apply Now"}
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Submit Application</DialogTitle>
								<DialogDescription>Please provide your cover letter and select a CV to apply for this job.</DialogDescription>
							</DialogHeader>
							<form onSubmit={handleSubmit}>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="coverLetter" className="col-span-4">
											Cover Letter
										</Label>
										<Textarea
											id="coverLetter"
											value={coverLetter}
											onChange={(e) => setCoverLetter(e.target.value)}
											className="col-span-4"
											rows={5}
											placeholder="Write your cover letter here..."
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="cv" className="col-span-4">
											Select CV
										</Label>
										<Select onValueChange={setSelectedCvSlug} value={selectedCvSlug}>
											<SelectTrigger className="col-span-4">
												<SelectValue placeholder="Select a CV" />
											</SelectTrigger>
											<SelectContent>
												{cvs?.map((cv) => (
													<SelectItem key={cv.slug} value={cv.slug}>
														{cv.title}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
								<DialogFooter>
									<Button type="submit" disabled={applicationExists}>
										{applicationExists ? "Already Applied" : "Submit Application"}
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</>
			}
		</>
	)
}

