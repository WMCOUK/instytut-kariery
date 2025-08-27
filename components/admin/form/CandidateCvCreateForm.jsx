"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { slugify } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import FileUpload from "../elements/FileUpload"

export default function CandidateCvCreateForm() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		title: "",
		fileUrl: "",
		fileSize: null,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [fileError, setFileError] = useState("")

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	const handleAttributeSubmit = async () => {
		setIsSubmitting(true)

		try {
			const response = await fetch(`/api/v1/candidate/cv`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: formData.title,
					slug: slugify(formData.title),
					fileUrl: formData.fileUrl,
					fileSize: formData.fileSize,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || `Error: ${response.status}`)
			}

			toast.success("CV added successfully!")
			router.push(`/candidate/attributes/cv`)
		} catch (error) {
			console.error("Fetch Error:", error)
			toast.error(`Failed to add CV: ${error instanceof Error ? error.message : "Unknown error"}`)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleFileChange = (fileData) => {
		setFormData((prevState) => ({
			...prevState,
			fileUrl: fileData.fileUrl,
			fileSize: fileData.fileSize,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!formData.title.trim() || !formData.fileUrl) {
			toast.error(`Title and file are required`)
			return
		}
		handleAttributeSubmit()
	}

	const validateFileUpload = () => {
		if (!formData.fileUrl) {
			setFileError("Please upload a PDF file")
			return false
		}
		return true
	}

	return (
		<form onSubmit={handleSubmit}>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						name="title"
						placeholder="CV Title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label>CV File</Label>
					<FileUpload onChange={handleFileChange} value={formData.fileUrl} onValidate={validateFileUpload} />
					{fileError && <p className="text-sm text-red-500">{fileError}</p>}
				</div>
				{formData.fileSize && (
					<div className="text-sm text-gray-500">File size: {(formData.fileSize / 1024 / 1024).toFixed(2)} MB</div>
				)}
			</CardContent>
			<CardFooter>
				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Add CV"}
				</Button>
			</CardFooter>
		</form>
	)
}

