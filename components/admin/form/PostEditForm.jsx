'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as Yup from 'yup'

import TipTapEditor from '@/components/admin/elements/editor/TipTapEditor'
import ImageUpload from '@/components/admin/elements/ImageUpload'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import TagInput from '@/components/ui/tag-input'
import { fetchCategory } from '@/fetchSwr'
import { cn } from "@/utils"



const postValidationSchema = Yup.object().shape({
	title: Yup.string().required('Post Title is required'),
	subTitle: Yup.string().required('Post Subtitle is required'),
	img: Yup.string().required('Featured Image is required'),
	tags: Yup.array().of(Yup.string()).min(1, 'At least one tag is required').max(5, 'Maximum 5 tags allowed'),
	catSlug: Yup.string().required('Category is required'),
	videoId: Yup.string().required('Video ID is required'),
	isFeatured: Yup.boolean(),
	// description: Yup.string().required('Post Content is required'),
	description: Yup
		.string()
		.test("notEmpty", "Content is required", (value) => {
			return value && value.trim() !== "" && value !== "<p></p>"
		})
		.required("Required"),
})

export default function PostEditForm({ post }) {
	const { categories } = fetchCategory(1)
	const router = useRouter()
	const [open, setOpen] = useState(false)

	const { control, handleSubmit, formState: { errors, isSubmitting }, setValue, watch, clearErrors } = useForm({
		resolver: yupResolver(postValidationSchema),
		defaultValues: post
	})

	const onSubmit = async (data) => {
		try {
			const response = await fetch(`/api/v1/post/${post.slug}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			toast.success('Post updated successfully!')
			router.push(`/post/${post?.slug}`)
		} catch (error) {
			console.error('Error:', error)
			toast.error(error.message)
		}
	}

	return (
		<Card className="w-full mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold">Edit Post</CardTitle>
				<CardDescription>Update your blog post with the form below.</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardContent className="space-y-8">
					<div className="space-y-4">
						<div>
							<Label htmlFor="title" className="text-lg font-semibold">Post Title</Label>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<Input
										id="title"
										placeholder="Enter the main title of your post"
										{...field}
										className="mt-1"
									/>
								)}
							/>
							{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
						</div>
						<div>
							<Label htmlFor="subTitle" className="text-lg font-semibold">Post Subtitle</Label>
							<Controller
								name="subTitle"
								control={control}
								render={({ field }) => (
									<Input
										id="subTitle"
										placeholder="Enter a catchy subtitle"
										{...field}
										className="mt-1"
									/>
								)}
							/>
							{errors.subTitle && <p className="text-red-500 text-sm mt-1">{errors.subTitle.message}</p>}
						</div>
					</div>

					<div className="space-y-4">
						<Label htmlFor="imageUpload" className="text-lg font-semibold">Featured Image</Label>
						<Controller
							name="img"
							control={control}
							render={({ field }) => (
								<ImageUpload
									value={field.value}
									onChange={(value) => {
										field.onChange(value)
										clearErrors('img')
									}}
									imgHeight={"200px"}
								/>
							)}
						/>
						{errors.img && <p className="text-red-500 text-sm mt-1">{errors.img.message}</p>}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="space-y-4">
							<Label htmlFor="tags" className="text-lg font-semibold">Tags</Label>
							<Controller
								name="tags"
								control={control}
								render={({ field }) => (
									<TagInput
										value={field.value}
										onChange={(tags) => {
											field.onChange(tags)
											clearErrors('tags')
										}}
										className="w-full"
									/>
								)}
							/>
							{errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
						</div>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<Label htmlFor="catSlug" className="text-lg font-semibold">Category</Label>
								<Link href={`/post/category/create`} className="text-sm text-blue-500 hover:text-blue-700">+ Create New</Link>
							</div>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={open}
										className="w-full justify-between"
									>
										{watch('catSlug')
											? categories?.find((category) => category.slug === watch('catSlug'))?.title
											: "Select category..."}
										<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Command>
										<CommandInput placeholder="Search category..." />
										<CommandEmpty>No category found.</CommandEmpty>
										<CommandGroup>
											{categories?.map((category) => (
												<CommandItem
													key={category.slug}
													value={category.slug}
													onSelect={(currentValue) => {
														setValue('catSlug', currentValue === watch('catSlug') ? "" : currentValue)
														clearErrors('catSlug')
														setOpen(false)
													}}
												>
													<Check
														className={cn(
															"mr-2 h-4 w-4",
															watch('catSlug') === category.slug ? "opacity-100" : "opacity-0"
														)}
													/>
													{category.title}
												</CommandItem>
											))}
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
							{errors.catSlug && <p className="text-red-500 text-sm mt-1">{errors.catSlug.message}</p>}
						</div>

						<div className="space-y-4">
							<Label htmlFor="videoId" className="text-lg font-semibold">Video ID</Label>
							<Controller
								name="videoId"
								control={control}
								render={({ field }) => (
									<Input
										id="videoId"
										placeholder="Enter the YouTube video ID"
										{...field}
										className="mt-1"
									/>
								)}
							/>
							{errors.videoId && <p className="text-red-500 text-sm mt-1">{errors.videoId.message}</p>}
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Controller
							name="isFeatured"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="featured"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label htmlFor="featured" className="text-base font-medium">Feature this post?</Label>
					</div>

					<div className="space-y-4">
						<Label htmlFor="description" className="text-lg font-semibold">Post Content</Label>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<TipTapEditor
									onChange={(content) => {
										field.onChange(content)
										clearErrors('description')
									}}
									value={field.value}
								/>
							)}
						/>
						{errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
					</div>
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button type="submit" size="lg" className="px-8" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Updating...
							</>
						) : (
							'Update Post'
						)}
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}

