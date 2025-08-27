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

export default function CandidateEducationCreateForm() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		title: "",
		slug: "",
		instituteName: "",
		description: "",
		startDate: "",
		endDate: "",
		isCurrentStudy: false,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleAttributeSubmit = async (e) => {
		e.preventDefault()
		if (!formData.title.trim()) {
			toast.error(`Education Title Empty`)
			return
		}
		setIsSubmitting(true)

		try {
			const response = await fetch(`/api/v1/candidate/education`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: formData.title,
					slug: slugify(formData.title),
					instituteName: formData.instituteName || "",
					description: formData.description || "",
					startDate: formData.startDate || null,
					endDate: formData.isCurrentStudy ? null : formData.endDate || null, // Ensure null if `isCurrentStudy` is true
					isCurrentStudy: formData.isCurrentStudy,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || `Error: ${response.status}`)
			}

			toast.success("Education added successfully!")
			router.push(`/candidate/attributes/education`)
		} catch (error) {
			toast.error(`Failed to add education: ${error.message}`)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prevState) => {
			if (name === "isCurrentStudy") {
				return {
					...prevState,
					isCurrentStudy: checked,
					endDate: checked ? "" : prevState.endDate, // Clear endDate if checked
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
					<Label htmlFor="instituteName">Institute Name</Label>
					<Input id="instituteName" name="instituteName" placeholder="instituteName" value={formData.instituteName} onChange={handleChange} required />
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
					<Label htmlFor="startDate">Start Date</Label>
					<Input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="endDate">End Date</Label>
					<Input
						id="endDate"
						name="endDate"
						type="date"
						value={formData.endDate}
						onChange={handleChange}
						disabled={formData.isCurrentStudy}
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="isCurrentStudy"
						name="isCurrentStudy"
						checked={formData.isCurrentStudy}
						onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isCurrentStudy: checked }))}
					/>
					<Label htmlFor="isCurrentStudy">Currently Studying</Label>
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
