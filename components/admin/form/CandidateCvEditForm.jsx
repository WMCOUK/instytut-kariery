"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as Yup from "yup"
import FileUpload from "../elements/FileUpload"

const cvSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	slug: Yup.string().required("Slug is required"),
	fileUrl: Yup.string().nullable(),
	fileSize: Yup.number().nullable(),
})

export default function CandidateCvEditForm({ cv }) {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const form = useForm({
		resolver: yupResolver(cvSchema),
		defaultValues: {
			title: cv?.title || "",
			slug: cv?.slug || "",
			fileUrl: cv?.fileUrl || "",
			fileSize: cv?.fileSize || "",
		},
	})

	useEffect(() => {
		if (cv) {
			form.reset({
				...cv,
				fileSize: cv.fileSize?.toString() || "",
			})
		}
	}, [cv, form])

	const handleFileChange = (file) => {
		if (file) {
			form.setValue("fileUrl", file.fileUrl)
			form.setValue("fileSize", file.fileSize)
		}
	}

	const handleUpdateCv = async (data) => {
		setIsSubmitting(true)
		try {
			const response = await fetch(`/api/v1/candidate/cv/${cv?.slug}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || "Failed to update CV")
			}

			await response.json()
			toast.success(`${cv?.title} updated successfully!`)
			router.push(`/candidate/attributes/cv`)
		} catch (error) {
			console.error("Error:", error)
			toast.error(`Failed to update ${cv?.title}. ${error.message}`)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateCv)} className="space-y-4">
				<CardContent className="space-y-4">
					<FormField
						name="title"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder="CV Title" required />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						name="fileUrl"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>CV File</FormLabel>
								<FormControl>
									<FileUpload onChange={handleFileChange} value={{ fileUrl: field.value }} />
								</FormControl>
								{form.watch("fileSize") && (
									<div className="text-sm text-gray-500">
										File size: {(Number.parseFloat(form.watch("fileSize")) / 1024 / 1024).toFixed(2)} MB
									</div>
								)}
							</FormItem>
						)}
					/>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Update CV"}
					</Button>
				</CardFooter>
			</form>
		</Form>
	)
}
