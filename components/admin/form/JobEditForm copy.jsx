"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import TagInput from "@/components/ui/tag-input"
import { Textarea } from "@/components/ui/textarea"
import {
	fetchAllBenefit,
	fetchAllExperience,
	fetchAllIndustry,
	fetchAllLocation,
	fetchAllPosition,
	fetchAllRecruiter,
	fetchAllType,
} from "@/fetchSwr"
import { cn, slugify } from "@/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { Check, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import TipTapEditor from "../elements/editor/TipTapEditor"
import ImageUpload from "../elements/ImageUpload"
import { jobSchema } from "./schema"

const selectOptions = {
	salaryRange: [
		{ title: "Monthly", slug: "monthly" },
		{ title: "Hourly", slug: "hourly" },
		{ title: "Daily", slug: "daily" },
		{ title: "Fixed", slug: "fixed" },
	],
	currency: [
		{ title: "USD", slug: "usd" },
		{ title: "Euro", slug: "euro" },
		{ title: "Pound", slug: "pound" },
	],
	workMode: [
		{ title: "Remote", slug: "remote" },
		{ title: "On Site", slug: "on-site" },
		{ title: "Hybrid", slug: "hybrid" },
	],
	status: [
		{ title: "Draft", slug: "draft" },
		{ title: "Published", slug: "published" },
		{ title: "Closed", slug: "closed" },
	],
	moderation: [
		{ title: "Pending", slug: "pending" },
		{ title: "Approved", slug: "approved" },
		{ title: "Rejected", slug: "rejected" },
	],
}

const switchOptions = [
	{ id: "isFeatured", label: "Featured" },
	{ id: "isFavourite", label: "Favourite" },
	{ id: "isFreelance", label: "Freelance" },
	{ id: "isSponsored", label: "Sponsored" },
]

export default function JobEditForm({ job }) {
	// console.log("Job:", job)

	const { industries } = fetchAllIndustry()
	const { experiences } = fetchAllExperience()
	const { types } = fetchAllType()
	const { locations } = fetchAllLocation()
	const { positions } = fetchAllPosition()
	const { recruiters } = fetchAllRecruiter()
	const { benefits } = fetchAllBenefit()
	const [content, setContent] = useState(job?.content || "")

	useEffect(() => {
		setContent(job?.content || "")
	}, [job])

	const router = useRouter()
	const defaultValues = {
		title: job?.title || "",
		description: job?.description || "",
		image: job?.image || "",
		content: job?.content || "",
		numberOfPositions: job?.numberOfPositions || "",
		maxApplicants: job?.maxApplicants || "",
		skills: job?.skills || [],
		benefit: job?.benefit || [],
		minSalary: job?.minSalary || "",
		maxSalary: job?.maxSalary || "",
		salaryRange: job?.salaryRange || "",
		jobIndustrySlug: job?.jobIndustrySlug || "",
		jobExperienceSlug: job?.jobExperienceSlug || "",
		jobTypeSlug: job?.jobTypeSlug || "",
		jobWorkModeSlug: job?.jobWorkModeSlug || "",
		jobLocationSlug: job?.jobLocationSlug || "",
		jobPositionSlug: job?.jobPositionSlug || "",
		recruiterSlug: job?.recruiterSlug || "",
		currency: job?.currency || "",
		applyUrl: job?.applyUrl || "",
		status: job?.status || "",
		moderation: job?.moderation || "",
		isFeatured: job?.isFeatured || false,
		isFavourite: job?.isFavourite || false,
		isFreelance: job?.isFreelance || false,
		isSponsored: job?.isSponsored || false,
		startDate: job?.startDate ? new Date(job.startDate) : "",
		closingDate: job?.closingDate ? new Date(job.closingDate) : "",
	}

	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		watch,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues,
		resolver: yupResolver(jobSchema),
	})

	const [loading, setLoading] = useState(false)
	const [openStates, setOpenStates] = useState({})
	const imageValue = watch("image")
	const skillsValue = watch("skills") || []
	const benefitValue = watch("benefit") || []

	const handleImageChange = (image) => {
		setValue("image", image)
	}

	const handleSkillChange = (skills) => {
		setValue("skills", skills)
	}

	const handleBenefitChange = (benefitTitle, checked) => {
		setValue("benefit", checked ? [...benefitValue, benefitTitle] : benefitValue.filter((b) => b !== benefitTitle))
	}

	const handleTiptapChange = (value) => {
		setContent(value)
		setValue("content", value)
	}

	const onSubmit = async (data) => {
		console.log("Submitting data:", data)
		console.log("Content:", content)

		setLoading(true)
		try {
			const res = await fetch(`/api/v1/job/${job?.slug}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...data,
					content,
					slug: slugify(data.title),
				}),
			})

			console.log("Response:", res)

			if (!res.ok) {
				let errorMessage = "Failed to update job"
				try {
					const errorData = await res.json()
					errorMessage = errorData.message || errorMessage
				} catch (err) {
					console.error("Error parsing response JSON", err)
				}
				throw new Error(errorMessage)
			}

			toast.success("Job updated successfully!")
			reset()
			setContent("")
			router.push(`/recruiter/job/${job?.slug}`)
		} catch (error) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const renderCombobox = (name, options, dynamicOptions, customLabel) => {
		const selectedValue = watch(name)
		return (
			<div key={name} className="flex flex-col space-y-4">
				<Label htmlFor={name}>{customLabel}</Label>
				<Popover open={openStates[name]} onOpenChange={(open) => setOpenStates((prev) => ({ ...prev, [name]: open }))}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={openStates[name]}
							className="w-full justify-between"
						>
							{selectedValue
								? (dynamicOptions || options)?.find((option) => option.slug === selectedValue)?.title
								: `Select ${customLabel}`}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0">
						<Command>
							<CommandInput placeholder={`Search ${customLabel.toLowerCase()}...`} />
							<CommandList>
								<CommandEmpty>No {customLabel.toLowerCase()} found.</CommandEmpty>
								<CommandGroup>
									{(dynamicOptions || options)?.map((option) => (
										<CommandItem
											key={option.slug}
											onSelect={() => {
												setValue(name, option.slug)
												clearErrors(name)
												setOpenStates((prev) => ({ ...prev, [name]: false }))
											}}
										>
											<Check
												className={cn("mr-2 h-4 w-4", selectedValue === option.slug ? "opacity-100" : "opacity-0")}
											/>
											{option.title}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				{errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
			</div>
		)
	}

	const renderSwitch = (id, label) => (
		<div key={id} className="flex items-center space-x-2">
			<Switch id={id} checked={watch(id)} onCheckedChange={(checked) => setValue(id, checked)} />
			<Label htmlFor={id}>{label}</Label>
		</div>
	)

	return (
		<Card>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 sm:p-6 border rounded-lg">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
					<div className="col-span-full space-y-4">
						<Label htmlFor="title">Job Title</Label>
						<Input id="title" placeholder="Enter the job title" {...register("title")} />
						{errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
					</div>

					<div className="col-span-full space-y-4">
						<Label htmlFor="description">Job Description</Label>
						<Textarea
							id="description"
							placeholder="Enter the job description"
							{...register("description")}
							className="min-h-[100px]"
						/>
						{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
					</div>

					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("recruiterSlug", recruiters, null, "Recruiter")}
					</div>
					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("jobIndustrySlug", industries, null, "Industry")}
					</div>

					<div className="col-span-1 space-y-2 sm:col-span-1">
						<Label htmlFor="minSalary">Min Salary</Label>
						<Input id="minSalary" type="number" placeholder="From" {...register("minSalary", { valueAsNumber: true })} />
						{errors.minSalary && <p className="text-red-500 text-sm">{errors.minSalary?.message}</p>}
					</div>
					<div className="col-span-1 space-y-2 sm:col-span-1">
						<Label htmlFor="maxSalary">Max Salary</Label>
						<Input id="maxSalary" type="number" placeholder="To" {...register("maxSalary", { valueAsNumber: true })} />
						{errors.maxSalary && <p className="text-red-500 text-sm">{errors.maxSalary?.message}</p>}
					</div>
					<div className="col-span-1 space-y-2 sm:col-span-1">
						<Label htmlFor="numberOfPositions">Positions</Label>
						<Input
							id="numberOfPositions"
							type="number"
							placeholder="Number"
							{...register("numberOfPositions", { valueAsNumber: true })}
						/>
						{errors.numberOfPositions && <p className="text-red-500 text-sm">{errors.numberOfPositions?.message}</p>}
					</div>
					<div className="col-span-1 space-y-2 sm:col-span-1">
						<Label htmlFor="maxApplicants">Max Applicants</Label>
						<Input
							id="maxApplicants"
							type="number"
							placeholder="Max"
							{...register("maxApplicants", { valueAsNumber: true })}
						/>
						{errors.maxApplicants && <p className="text-red-500 text-sm">{errors.maxApplicants?.message}</p>}
					</div>

					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("jobExperienceSlug", experiences, null, "Experience")}
					</div>
					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("jobTypeSlug", types, null, "Type")}
					</div>
					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("jobWorkModeSlug", selectOptions?.workMode, null, "Work Mode")}
					</div>
					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("jobLocationSlug", locations, null, "Location")}
					</div>
					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("jobPositionSlug", positions, null, "Position")}
					</div>
					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("salaryRange", selectOptions.salaryRange, null, "Salary Range")}
					</div>
					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("currency", selectOptions.currency, null, "Currency")}
					</div>
					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("status", selectOptions.status, null, "Job Status")}
					</div>
					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						{renderCombobox("moderation", selectOptions.moderation, null, "Moderation Status")}
					</div>

					<div className="col-span-full space-y-4">
						<Label htmlFor="skills">Add Skills</Label>
						<TagInput
							id="skills"
							value={skillsValue}
							onChange={handleSkillChange}
							placeholder="Enter a Skill"
							className="w-full"
						/>
						{errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
					</div>

					<div className="col-span-full space-y-4">
						<Label htmlFor="benefits">Add Benefits</Label>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
							{benefits?.map((benefit) => (
								<div key={benefit.slug} className="flex items-center space-x-2">
									<Checkbox
										id={`benefit-${benefit.slug}`}
										checked={benefitValue.includes(benefit.title)}
										onCheckedChange={(checked) => handleBenefitChange(benefit.title, checked)}
									/>
									<Label htmlFor={`benefit-${benefit.slug}`}>{benefit.title}</Label>
								</div>
							))}
						</div>
						{errors.benefit && <p className="text-red-500 text-sm mt-2">{errors.benefit.message}</p>}
					</div>

					<div className="col-span-full space-y-4">
						<Label htmlFor="content">Job Content</Label>
						<TipTapEditor value={content} onChange={handleTiptapChange} />
						{errors.content && <p className="text-red-500 text-sm">{errors.content?.message}</p>}
					</div>

					<div className="col-span-full space-y-4">
						<Label htmlFor="applyUrl">Job Apply URL</Label>
						<Input id="applyUrl" placeholder="Enter the job apply URL" {...register("applyUrl")} />
						{errors.applyUrl && <p className="text-red-500 text-sm">{errors.applyUrl.message}</p>}
					</div>

					<div className="col-span-full space-y-4">
						<Label htmlFor="imageUpload">Featured Image</Label>
						<ImageUpload value={imageValue} onChange={handleImageChange} imgHeight="120px" />
						{errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
					</div>

					<div className="col-span-full space-y-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
						{switchOptions?.map(({ id, label }) => renderSwitch(id, label))}
					</div>

					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						<Label htmlFor="startDate">Start Date</Label>
						<DatePicker value={watch("startDate")} onChange={(date) => setValue("startDate", date)} />
						{errors.startDate && <p className="text-red-500 text-sm">{errors.startDate?.message}</p>}
					</div>

					<div className="col-span-full space-y-4 sm:col-span-1 md:col-span-2">
						<Label htmlFor="closingDate">Closing Date</Label>
						<DatePicker value={watch("closingDate")} onChange={(date) => setValue("closingDate", date)} />
						{errors.closingDate && <p className="text-red-500 text-sm">{errors.closingDate?.message}</p>}
					</div>
				</div>

				<Button type="submit" disabled={loading} className="w-full sm:w-auto">
					{loading ? "Updating..." : "Update Job"}
				</Button>
			</form>
		</Card>
	)
}

