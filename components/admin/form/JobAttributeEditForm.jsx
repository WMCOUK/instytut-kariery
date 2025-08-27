'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import ImageUpload from '../elements/ImageUpload'

export default function JobAttributeEditForm({ attribute, attPath }) {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			title: attribute?.title || '',
			slug: attribute?.slug || '',
			image: attribute?.image || '',
			icon: attribute?.icon || '',
		},
	})

	useEffect(() => {
		if (attribute) form.reset(attribute)
	}, [attribute, form])

	const handleUpdateAttribute = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/job/${attPath}/${attribute?.slug}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (!response.ok) throw new Error('Network response was not ok')
			await response.json()
			toast.success(`${attribute?.title} updated successfully!`)
		} catch (error) {
			console.error('Error:', error)
			toast.error(`Failed to update ${attribute?.title}.`)
		} finally {
			setLoading(false)
			router.push(`/recruiter/job/attributes/${attPath}`)
		}
	}

	const handleImage = (newValue) => {
		form.setValue("image", newValue)
	}

	const renderField = (name, label, Component, props = {}) => (
		<FormField name={name} control={form.control} render={({ field }) => (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Component {...field} {...props} />
				</FormControl>
			</FormItem>
		)} />
	)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateAttribute)} className="space-y-8">
				{renderField("image", "Image", ImageUpload, { value: form.watch("image"), onChange: handleImage })}
				{renderField("title", "Title", Input, { placeholder: "Title" })}
				{renderField("icon", "Icon", Input, { placeholder: "Icon" })}

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? <Loader2 className="animate-spin" /> : "Submit"}
				</Button>
			</form>
		</Form>
	)
}
