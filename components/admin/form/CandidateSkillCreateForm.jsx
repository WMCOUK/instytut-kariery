"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { slugify } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function CandidateSkillCreateForm() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		title: "",
		percentage: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleAttributeSubmit = async (e) => {
		e.preventDefault()
		if (!formData.title.trim()) {
			toast.error(`Skill Title Empty`)
			return
		}
		setIsSubmitting(true)

		try {
			const response = await fetch(`/api/v1/candidate/skill`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: formData.title,
					slug: slugify(formData.title),
					percentage: formData.percentage ? Number.parseInt(formData.percentage, 10) : null,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || `Error: ${response.status}`)
			}

			toast.success("Skill added successfully!")
			router.push(`/candidate/attributes/skill`)
		} catch (error) {
			console.error("Fetch Error:", error)
			toast.error(`Failed to add skill: ${error instanceof Error ? error.message : "Unknown error"}`)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	return (
		<form onSubmit={handleAttributeSubmit}>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						name="title"
						placeholder="Skill Title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="percentage">Percentage</Label>
					<Input
						id="percentage"
						name="percentage"
						type="number"
						placeholder="Skill Percentage"
						value={formData.percentage}
						onChange={handleChange}
						min="0"
						max="100"
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Add Skill"}
				</Button>
			</CardFooter>
		</form>
	)
}

