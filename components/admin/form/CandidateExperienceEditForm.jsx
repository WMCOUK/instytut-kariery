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

export default function CandidateExperienceEditForm({ experience }) {
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			title: experience?.title || "",
			slug: experience?.slug || "",
			companyName: experience?.companyName || "",
			description: experience?.description || "",
			joinDate: experience?.joinDate ? new Date(experience.joinDate) : null,
			leaveDate: experience?.leaveDate ? new Date(experience.leaveDate) : null,
			isCurrentJob: experience?.isCurrentJob || false,
		},
	})

	useEffect(() => {
		if (experience) form.reset(experience)
	}, [experience, form])

	const handleUpdateExperience = async (data) => {
		try {
			const response = await fetch(`/api/v1/candidate/experience/${experience?.slug}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			if (!response.ok) throw new Error("Network response was not ok")
			await response.json()
			toast.success(`${experience?.title} updated successfully!`)
			router.push(`/candidate/attributes/experience`)
		} catch (error) {
			console.error("Error:", error)
			toast.error(`Failed to update ${experience?.title}.`)
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
						<Component {...field} {...props} />
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
			<form onSubmit={form.handleSubmit(handleUpdateExperience)} className="space-y-4">
				{renderField("title", "Title", Input, { placeholder: "Title" })}
				{renderField("slug", "Slug", Input, { placeholder: "Slug" })}
				{renderField("companyName", "Company Name", Input, { placeholder: "Company Name" })}
				{renderField("description", "Description", Textarea, { placeholder: "Description" })}
				{renderDatePicker("joinDate", "Join Date")}

				{/* Leave Date - Disabled when isCurrentJob is checked */}
				{renderDatePicker("leaveDate", "Leave Date", { disabled: form.watch("isCurrentJob") })}

				{/* Checkbox - Current Job */}
				<FormField
					name="isCurrentJob"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={(checked) => {
										form.setValue("isCurrentJob", checked)
										if (checked) {
											form.setValue("leaveDate", null) // Clear Leave Date when checked
										}
									}}
								/>
							</FormControl>
							<FormLabel>Current Job</FormLabel>
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
