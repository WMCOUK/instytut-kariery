'use client'

import ImageUpload from '@/components/admin/elements/ImageUpload'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import TagInput from '@/components/ui/tag-input'
import { fetchAllPost, fetchCategory } from '@/fetchSwr'
import { cn, slugify } from "@/utils"
import { yupResolver } from '@hookform/resolvers/yup'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as Yup from 'yup'
import TipTapEditor from '../elements/editor/TipTapEditor'



const postValidationSchema = Yup.object().shape({
	title: Yup.string().required('Title is required'),
	subTitle: Yup.string().required('Sub Title is required'),
	img: Yup.string().required('Featured Image is required'),
	catSlug: Yup.string().required('Category is required'),
	videoId: Yup.string().required('Video ID is required'),
	description: Yup.string().required('Description is required'),
	isFeatured: Yup.boolean(),
	tags: Yup.array().of(Yup.string()).min(1, 'At least one tag is required').max(5, 'Maximum 5 tags allowed'),
})

const initialState = {
	title: '',
	subTitle: '',
	img: '',
	catSlug: '',
	videoId: '',
	isFeatured: false,
	description: '',
	tags: [],
}

export default function PostCreateForm() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const page = parseInt(searchParams.page) || 1
	const { mutate } = fetchAllPost()
	const { categories } = fetchCategory(page)

	const [open, setOpen] = useState(false)

	const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch, clearErrors } = useForm({
		resolver: yupResolver(postValidationSchema),
		defaultValues: initialState
	})

	const onSubmit = async (data) => {
		try {
			const response = await fetch("/api/v1/post", {
				method: "POST",
				body: JSON.stringify({
					...data,
					slug: slugify(data.title),
				}),
			})

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`)
			}

			mutate()
			toast.success('Post added successfully!')
			router.push('/admin/post')
		} catch (error) {
			console.error(error)
			toast.error(error.message)
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create New Post</CardTitle>
				<CardDescription>Fill out the form to create a new blog post.</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="title">Post Title</Label>
							<Input
								id="title"
								placeholder="Title"
								{...register('title')}
							/>
							{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
						</div>
						<div>
							<Label htmlFor="subTitle">Post Sub Title</Label>
							<Input
								id="subTitle"
								placeholder="Sub Title"
								{...register('subTitle')}
							/>
							{errors.subTitle && <p className="text-red-500 text-sm mt-1">{errors.subTitle.message}</p>}
						</div>
					</div>

					<div className="space-y-4">
						<Label htmlFor="imageUpload">Featured Image</Label>
						<ImageUpload
							value={watch('img')}
							onChange={(value) => {
								setValue('img', value)
								clearErrors('img')
							}}
							imgHeight={"120px"}
						/>
						{errors.img && <p className="text-red-500 text-sm mt-1">{errors.img.message}</p>}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<Label htmlFor="tags">Add Tags</Label>
							<TagInput
								value={watch('tags')}
								onChange={(tags) => {
									setValue('tags', tags)
									clearErrors('tags')
								}}
								className="w-full"
							/>
							{errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
						</div>
						<div>
							<div className="flex justify-between items-center">
								<Label htmlFor="catSlug">Category</Label>
								<Link href={`/admin/post/category/create`} className="ml-2 text-blue-500 hover:text-blue-700 text-sm">Create Category</Link>
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
											? categories.find((category) => category.slug === watch('catSlug'))?.title
											: "Select category..."}
										<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
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
						<div>
							<Label htmlFor="videoId">Video ID</Label>
							<Input
								id="videoId"
								placeholder="Video ID"
								{...register('videoId')}
							/>
							{errors.videoId && <p className="text-red-500 text-sm mt-1">{errors.videoId.message}</p>}
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Checkbox
							id="featured"
							checked={watch('isFeatured')}
							onCheckedChange={(checked) => setValue('isFeatured', checked)}
						/>
						<Label htmlFor="featured">Is Featured?</Label>
					</div>

					<div>
						<Label htmlFor="description">Post Description</Label>
						<TipTapEditor
							onChange={(content) => {
								setValue('description', content)
								clearErrors('description')
							}}
							value={watch('description')}
						/>
						{errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Publishing...
							</>
						) : (
							'Publish'
						)}
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}

