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

export default function CategoryEditForm({ category }) {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			title: category?.title || '',
			slug: category?.slug || '',
			img: category?.img || '',
		},
	})

	useEffect(() => {
		if (category) form.reset(category)
	}, [category, form])

	const handleUpdateCategory = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/post/category/${category?.slug}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (!response.ok) throw new Error('Network response was not ok')
			await response.json()
			toast.success('Category updated successfully!')
			// mutate()
		} catch (error) {
			console.error('Error:', error)
			toast.error('Failed to update category.')
		} finally {
			setLoading(false)
			router.push('/post/category')
		}
	}

	const handleImage = (newValue) => {
		form.setValue("img", newValue)
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
			<form onSubmit={form.handleSubmit(handleUpdateCategory)} className="space-y-8">
				{renderField("img", "Image", ImageUpload, { value: form.watch("img"), onChange: handleImage })}
				{renderField("title", "Title", Input, { placeholder: "Category Title" })}
				{renderField("slug", "Slug", Input, { placeholder: "Category Slug" })}

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? <Loader2 className="animate-spin" /> : "Submit"}
				</Button>
			</form>
		</Form>
	)
}
