"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { slugify } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function CandidateExperienceCreateForm() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		title: "",
		slug: "",
		companyName: "",
		description: "",
		joinDate: "",
		leaveDate: "",
		isCurrentJob: false,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleAttributeSubmit = async (e) => {
		e.preventDefault()
		if (!formData.title.trim()) {
			toast.error(`Experience Title Empty`)
			return
		}
		setIsSubmitting(true)

		console.log("Submitting Data:", formData)

		try {
			const response = await fetch(`/api/v1/candidate/experience`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: formData.title,
					slug: slugify(formData.title),
					companyName: formData.companyName,
					description: formData.description || "",
					joinDate: formData.joinDate || null,
					leaveDate: formData.isCurrentJob ? null : formData.leaveDate || null, // Ensure null if `isCurrentJob` is true
					isCurrentJob: formData.isCurrentJob,
				}),
			})

			console.log("Response Status:", response.status)

			const data = await response.json()
			console.log("Response Data:", data)

			if (!response.ok) {
				throw new Error(data.message || `Error: ${response.status}`)
			}

			toast.success("Experience added successfully!")
			router.push(`/candidate/attributes/experience`)
		} catch (error) {
			console.error("Fetch Error:", error)
			toast.error(`Failed to add experience: ${error.message}`)
		} finally {
			setIsSubmitting(false)
		}
	}


	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prevState) => {
			if (name === "isCurrentJob") {
				return {
					...prevState,
					isCurrentJob: checked,
					leaveDate: checked ? "" : prevState.leaveDate, // Clear leaveDate if checked
				}
			}
			return {
				...prevState,
				[name]: type === "checkbox" ? checked : value,
			}
		})
	}


	return (
		<form onSubmit={handleAttributeSubmit}>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="title">Title</Label>
					<Input id="title" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
				</div>
				<div className="space-y-2">
					<Label htmlFor="companyName">Company Name</Label>
					<Input id="companyName" name="companyName" placeholder="companyName" value={formData.companyName} onChange={handleChange} required />
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						name="description"
						placeholder="Description"
						value={formData.description}
						onChange={handleChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="joinDate">Join Date</Label>
					<Input id="joinDate" name="joinDate" type="date" value={formData.joinDate} onChange={handleChange} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="leaveDate">Leave Date</Label>
					<Input
						id="leaveDate"
						name="leaveDate"
						type="date"
						value={formData.leaveDate}
						onChange={handleChange}
						disabled={formData.isCurrentJob}
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="isCurrentJob"
						name="isCurrentJob"
						checked={formData.isCurrentJob}
						onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isCurrentJob: checked }))}
					/>
					<Label htmlFor="isCurrentJob">Current Job</Label>
				</div>
			</CardContent>
			<CardFooter>
				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Publish"}
				</Button>
			</CardFooter>
		</form>
	)
}

