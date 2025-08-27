"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function CandidateEducationEditForm({ education }) {
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			title: education?.title || "",
			slug: education?.slug || "",
			instituteName: education?.instituteName || "", // Ensure instituteName is never null
			description: education?.description ?? "", // Ensure description is never null
			startDate: education?.startDate ? new Date(education?.startDate) : null,
			endDate: education?.endDate ? new Date(education?.endDate) : null,
			isCurrentStudy: education?.isCurrentStudy || false,
		},
	})

	useEffect(() => {
		if (education) {
			form.reset({
				...education,
				description: education?.description ?? "", // Ensure it's never null
			})
		}
	}, [education, form])

	const handleUpdateEducation = async (data) => {
		try {
			const response = await fetch(`/api/v1/candidate/education/${education?.slug}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...data,
					description: data.description ?? "", // Ensure description is never null
				}),
			})

			if (!response.ok) throw new Error("Network response was not ok")
			await response.json()
			toast.success(`${education?.title} updated successfully!`)
			router.push(`/candidate/attributes/education`)
		} catch (error) {
			console.error("Error:", error)
			toast.error(`Failed to update ${education?.title}.`)
		}
	}

	const renderField = (name, label, Component, props = {}) => (
		<FormField
			name={name}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Component {...field} {...props} value={field.value ?? ""} />
					</FormControl>
				</FormItem>
			)}
		/>
	)

	const renderDatePicker = (name, label, extraProps = {}) => (
		<FormField
			name={name}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="w-full justify-start" disabled={extraProps.disabled}>
								{field.value ? format(field.value, "PPP") : "Pick a date"}
								<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={field.value}
								onSelect={(date) => form.setValue(name, date)}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</FormItem>
			)}
		/>
	)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateEducation)} className="space-y-4">
				{renderField("title", "Title", Input, { placeholder: "Title" })}
				{renderField("slug", "Slug", Input, { placeholder: "Slug" })}
				{renderField("instituteName", "Institute Name", Input, { placeholder: "Institute Name" })}
				{renderField("description", "Description", Textarea, { placeholder: "Description" })}
				{renderDatePicker("startDate", "Start Date")}
				{renderDatePicker("endDate", "End Date", { disabled: form.watch("isCurrentStudy") })}

				<FormField
					name="isCurrentStudy"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={(checked) => {
										form.setValue("isCurrentStudy", checked)
										if (checked) {
											form.setValue("endDate", null)
										}
									}}
								/>
							</FormControl>
							<FormLabel>Currently Studying</FormLabel>
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					{form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
				</Button>
			</form>
		</Form>
	)
}
