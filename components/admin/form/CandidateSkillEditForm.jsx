"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as Yup from "yup"

const skillSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	slug: Yup.string().required("Slug is required"),
	percentage: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.nullable()
		.min(0, "Percentage must be at least 0")
		.max(100, "Percentage must be at most 100"),
})

export default function CandidateSkillEditForm({ skill }) {
	const router = useRouter()

	const form = useForm({
		resolver: yupResolver(skillSchema),
		defaultValues: {
			title: skill?.title || "",
			slug: skill?.slug || "",
			percentage: skill?.percentage || "",
		},
	})

	useEffect(() => {
		if (skill) {
			form.reset({
				...skill,
				percentage: skill.percentage?.toString() || "",
			})
		}
	}, [skill, form])

	const handleUpdateSkill = async (data) => {
		try {
			const response = await fetch(`/api/v1/candidate/skill/${skill?.slug}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || "Network response was not ok")
			}

			await response.json()
			toast.success(`${skill?.title} updated successfully!`)
			router.push(`/candidate/attributes/skill`)
		} catch (error) {
			console.error("Error:", error)
			toast.error(`Failed to update ${skill?.title}. ${error.message}`)
		}
	}

	const renderField = (name, label, Component, props = {}) => (
		<FormField
			name={name}
			control={form.control}
			render={({ field, fieldState: { error } }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Component {...field} {...props} />
					</FormControl>
					{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
				</FormItem>
			)}
		/>
	)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateSkill)} className="space-y-4">
				{renderField("title", "Title", Input, { placeholder: "Title" })}
				{renderField("slug", "Slug", Input, { placeholder: "Slug" })}
				{renderField("percentage", "Percentage", Input, {
					placeholder: "Percentage",
					type: "number",
					min: 0,
					max: 100,
				})}

				<Button type="submit" className="w-full">
					{form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Update Skill"}
				</Button>
			</form>
		</Form>
	)
}

