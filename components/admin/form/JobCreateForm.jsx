"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

// UI Components
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

// Custom Components
import TipTapEditor from "@/components/admin/elements/editor/TipTapEditor"
import { DatePicker } from "@/components/ui/date-picker"
import TagInput from "@/components/ui/tag-input"

// Utilities and Helpers
import { Card } from "@/components/ui/card"
import {
	fetchAllBenefit,
	fetchAllExperience,
	fetchAllIndustry,
	fetchAllLocation,
	fetchAllPosition,
	fetchAllType,
	fetchMyRecruiter,
} from "@/fetchSwr"
import { cn, selectOptions, slugify } from "@/utils"
import ImageUpload from "../elements/ImageUpload"
import { jobSchema } from "./schema"

const ComboboxField = ({ name, options, dynamicOptions, customLabel, register, errors, setValue, watch, openStates, setOpenStates }) => {
	const value = watch(name)
	return (
		<div className="space-y-2">
			<Label htmlFor={name} className="text-sm font-medium text-gray-700">{customLabel}</Label>
			<Popover open={openStates[name]} onOpenChange={(open) => setOpenStates((prev) => ({ ...prev, [name]: open }))}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className={cn("w-full h-11 justify-between bg-transparent", errors[name] && "border-red-500 focus:ring-red-500/20")}
					>
						<span className={cn("truncate", !value && "text-gray-500")}>
							{value ? (dynamicOptions || options)?.find((opt) => opt.slug === value)?.title : `Select ${customLabel}`}
						</span>
						<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<Command>
						<CommandInput placeholder={`Search ${customLabel.toLowerCase()}...`} />
						<CommandList>
							<CommandEmpty>No {customLabel.toLowerCase()} found.</CommandEmpty>
							<CommandGroup>
								{(dynamicOptions || options)?.map((opt) => (
									<CommandItem
										key={opt.slug}
										onSelect={() => {
											setValue(name, opt.slug, { shouldValidate: true })
											setOpenStates((prev) => ({ ...prev, [name]: false }))
										}}
									>
										<Check className={cn("mr-2 h-4 w-4", value === opt.slug ? "opacity-100" : "opacity-0")} />
										{opt.title}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
		</div>
	)
}

const StepIndicator = ({ steps, currentStep }) => (
	<div className="flex items-center justify-center mb-8">
		{steps.map((step, i) => (
			<div key={step.number} className="flex items-center">
				<div
					className={cn(
						"w-10 h-10 rounded-full border-2 text-sm font-semibold flex items-center justify-center transition-colors",
						currentStep === step.number ? "bg-blue-600 border-blue-600 text-white" : currentStep > step.number ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-500"
					)}
				>
					{currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
				</div>
				{i < steps.length - 1 && <div className={cn("w-16 h-0.5 mx-2", currentStep > step.number ? "bg-blue-600" : "bg-gray-300")} />}
			</div>
		))}
	</div>
)

export default function JobCreateForm() {
	const { recruiters } = fetchMyRecruiter()
	const { industries } = fetchAllIndustry()
	const { experiences } = fetchAllExperience()
	const { types } = fetchAllType()
	const { locations } = fetchAllLocation()
	const { positions } = fetchAllPosition()
	const { benefits } = fetchAllBenefit()

	const router = useRouter()
	const [step, setStep] = useState(1)
	const [openStates, setOpenStates] = useState({})
	const [loading, setLoading] = useState(false)

	const steps = [
		{ number: 1, title: "Basic Information", subtitle: "Job title, description, and company details" },
		{ number: 2, title: "Job Details", subtitle: "Experience, type, and position requirements" },
		{ number: 3, title: "Skills & Content", subtitle: "Required skills and additional content" },
		{ number: 4, title: "Compensation", subtitle: "Salary range and benefits" },
		{ number: 5, title: "Settings & Dates", subtitle: "Job settings and important dates" },
	]

	const { register, handleSubmit, setValue, watch, reset, trigger, formState: { errors, isSubmitting } } = useForm({
		defaultValues: {
			title: "",
			description: "",
			recruiterSlug: "",
			jobIndustrySlug: "",
			jobLocationSlug: "",
			jobExperienceSlug: "",
			jobTypeSlug: "",
			jobWorkModeSlug: "",
			jobPositionSlug: "",
			numberOfPositions: 1,
			maxApplicants: 100,
			skills: [],
			content: "",
			minSalary: 0,
			maxSalary: 0,
			currency: "usd",
			benefit: [],
			applyUrl: "",
			image: "",
			startDate: new Date(),
			closingDate: null,
			status: "draft",
			moderation: "pending",
			isFeatured: false,
			isFavourite: false,
			isFreelance: false,
			isSponsored: false,
			latitude: 0,
			longitude: 0,
		},
		resolver: yupResolver(jobSchema),
	})

	const imageValue = watch("image")
	const skillsValue = watch("skills") || []
	const benefitValue = watch("benefit") || []

	const handleImageChange = useCallback((image) => setValue("image", image, { shouldValidate: true }), [setValue])
	const handleSkillChange = useCallback((skills) => setValue("skills", skills, { shouldValidate: true }), [setValue])
	const handleBenefitChange = useCallback((title, checked) => setValue("benefit", checked ? [...benefitValue, title] : benefitValue.filter((b) => b !== title), { shouldValidate: true }), [setValue, benefitValue])
	const handleTiptapChange = useCallback((value) => setValue("content", value, { shouldValidate: true }), [setValue])

	const validateStep = useCallback(async () => {
		const fields = [
			["title", "description", "recruiterSlug", "jobIndustrySlug", "jobLocationSlug", "jobPositionSlug", "latitude", "longitude"],
			["jobExperienceSlug", "jobTypeSlug", "jobWorkModeSlug", "numberOfPositions", "maxApplicants"],
			["skills", "content", "applyUrl"],
			["minSalary", "maxSalary", "currency", "benefit"],
			["startDate", "closingDate", "status", "moderation"],
		][step - 1]
		const isValid = await trigger(fields)
		if (!isValid) toast.error("Please fix errors before proceeding.")
		return isValid
	}, [step, trigger])

	const nextStep = useCallback(async () => step < steps.length && (await validateStep()) && setStep(step + 1), [step, validateStep])
	const prevStep = useCallback(() => step > 1 && setStep(step - 1), [step])

	const onSubmit = useCallback(async (data) => {
		setLoading(true)
		try {
			const res = await fetch("/api/v1/job", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...data, slug: slugify(data.title) }),
			})
			const result = await res.json()
			if (!res.ok) throw new Error(result.error || "Failed to create job")
			toast.success(result.message || "Job created successfully!")
			reset()
			router.push("/recruiter/job")
		} catch (error) {
			toast.error(error.message || "An unexpected error occurred.")
		} finally {
			setLoading(false)
		}
	}, [router, reset])

	const handleSubmitClick = handleSubmit(onSubmit)

	const renderStep = () => {
		const fieldProps = { register, errors, setValue, watch, openStates, setOpenStates }
		return (
			<div className="space-y-6">
				{step === 1 && (
					<>
						<div className="space-y-2">
							<Label htmlFor="title">Job Title *</Label>
							<Input id="title" {...register("title", { onChange: () => trigger("title") })} className={cn("h-11", errors.title && "border-red-500")} />
							{errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
						</div>
						<div className="space-y-2">
							<Label htmlFor="imageUpload">Featured Image</Label>
							<ImageUpload value={imageValue} onChange={handleImageChange} imgHeight="180px" />
							{errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<ComboboxField name="recruiterSlug" options={recruiters} customLabel="Recruiter *" {...fieldProps} />
							<ComboboxField name="jobIndustrySlug" options={industries} customLabel="Industry *" {...fieldProps} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="description">Job Description *</Label>
							<Textarea id="description" {...register("description", { onChange: () => trigger("description") })} className={cn("min-h-[120px] resize-none", errors.description && "border-red-500")} />
							{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<ComboboxField name="jobLocationSlug" options={locations} customLabel="Location *" {...fieldProps} />
							<ComboboxField name="jobPositionSlug" options={positions} customLabel="Position *" {...fieldProps} />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="latitude">Latitude *</Label>
								<Input
									id="latitude"
									type="number"
									step="any"
									{...register("latitude", { valueAsNumber: true, onChange: () => trigger("latitude") })}
									className={cn("h-11", errors.latitude && "border-red-500")}
									placeholder="e.g., 40.7128"
								/>
								{errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
							</div>
							<div className="space-y-2">
								<Label htmlFor="longitude">Longitude *</Label>
								<Input
									id="longitude"
									type="number"
									step="any"
									{...register("longitude", { valueAsNumber: true, onChange: () => trigger("longitude") })}
									className={cn("h-11", errors.longitude && "border-red-500")}
									placeholder="e.g., -74.0060"
								/>
								{errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
							</div>
						</div>
					</>
				)}
				{step === 2 && (
					<>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<ComboboxField name="jobExperienceSlug" options={experiences} customLabel="Experience Level *" {...fieldProps} />
							<ComboboxField name="jobTypeSlug" options={types} customLabel="Job Type *" {...fieldProps} />
							<ComboboxField name="jobWorkModeSlug" options={selectOptions.workMode} customLabel="Work Mode *" {...fieldProps} />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="numberOfPositions">Number of Positions *</Label>
								<Input id="numberOfPositions" type="number" {...register("numberOfPositions", { valueAsNumber: true, onChange: () => trigger("numberOfPositions") })} className={cn("h-11", errors.numberOfPositions && "border-red-500")} />
								{errors.numberOfPositions && <p className="text-red-500 text-sm">{errors.numberOfPositions.message}</p>}
							</div>
							<div className="space-y-2">
								<Label htmlFor="maxApplicants">Max Applicants *</Label>
								<Input id="maxApplicants" type="number" {...register("maxApplicants", { valueAsNumber: true, onChange: () => trigger("maxApplicants") })} className={cn("h-11", errors.maxApplicants && "border-red-500")} />
								{errors.maxApplicants && <p className="text-red-500 text-sm">{errors.maxApplicants.message}</p>}
							</div>
						</div>
					</>
				)}
				{step === 3 && (
					<>
						<Card className="p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
							<TagInput id="skills" value={skillsValue} onChange={handleSkillChange} placeholder="Enter a skill" className={cn("w-full", errors.skills && "border-red-500")} />
							{errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
						</Card>
						<Card className="p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Job Content</h3>
							<div className="space-y-2">
								<Label htmlFor="content">Job Content *</Label>
								<TipTapEditor value={watch("content")} onChange={handleTiptapChange} />
								{errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
							</div>
							<div className="space-y-2 mt-4">
								<Label htmlFor="applyUrl">Job Apply URL (optional)</Label>
								<Input id="applyUrl" {...register("applyUrl", { onChange: () => trigger("applyUrl") })} className="h-11" />
								{errors.applyUrl && <p className="text-red-500 text-sm">{errors.applyUrl.message}</p>}
							</div>
						</Card>
					</>
				)}
				{step === 4 && (
					<>
						<Card className="p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Information</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="minSalary">Min Salary</Label>
									<Input id="minSalary" type="number" {...register("minSalary", { valueAsNumber: true, onChange: () => trigger("minSalary") })} className={cn("h-11", errors.minSalary && "border-red-500")} />
									{errors.minSalary && <p className="text-red-500 text-sm">{errors.minSalary.message}</p>}
								</div>
								<div className="space-y-2">
									<Label htmlFor="maxSalary">Max Salary</Label>
									<Input id="maxSalary" type="number" {...register("maxSalary", { valueAsNumber: true, onChange: () => trigger("maxSalary") })} className={cn("h-11", errors.maxSalary && "border-red-500")} />
									{errors.maxSalary && <p className="text-red-500 text-sm">{errors.maxSalary.message}</p>}
								</div>
								<ComboboxField name="currency" options={selectOptions.currency} customLabel="Currency *" {...fieldProps} />
							</div>
						</Card>
						<Card className="p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{benefits?.map((benefit) => (
									<div key={benefit.slug} className="flex items-center space-x-3">
										<Checkbox
											id={`benefit-${benefit.slug}`}
											checked={benefitValue.includes(benefit.title)}
											onCheckedChange={(checked) => handleBenefitChange(benefit.title, checked)}
											className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
										/>
										<Label htmlFor={`benefit-${benefit.slug}`} className="text-sm cursor-pointer">{benefit.title}</Label>
									</div>
								))}
							</div>
							{errors.benefit && <p className="text-red-500 text-sm mt-2">{errors.benefit.message}</p>}
						</Card>
					</>
				)}
				{step === 5 && (
					<>
						<Card className="p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="startDate">Start Date *</Label>
									<DatePicker value={watch("startDate")} onChange={(date) => setValue("startDate", date, { shouldValidate: true })} />
									{errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
								</div>
								<div className="space-y-2">
									<Label htmlFor="closingDate">Closing Date (optional)</Label>
									<DatePicker value={watch("closingDate")} onChange={(date) => setValue("closingDate", date, { shouldValidate: true })} />
									{errors.closingDate && <p className="text-red-500 text-sm">{errors.closingDate.message}</p>}
								</div>
							</div>
						</Card>
						<Card className="p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Job Settings</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								<ComboboxField name="status" options={selectOptions.status} customLabel="Job Status *" {...fieldProps} />
								<ComboboxField name="moderation" options={selectOptions.moderation} customLabel="Moderation Status *" {...fieldProps} />
							</div>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
								{[{ id: "isFeatured", label: "Featured" }, { id: "isFavourite", label: "Favourite" }, { id: "isFreelance", label: "Freelance" }, { id: "isSponsored", label: "Sponsored" }].map(({ id, label }) => (
									<div key={id} className="flex items-center space-x-3">
										<Switch id={id} checked={watch(id)} onCheckedChange={(checked) => setValue(id, checked, { shouldValidate: true })} className="data-[state=checked]:bg-blue-600" />
										<Label htmlFor={id} className="text-sm cursor-pointer">{label}</Label>
									</div>
								))}
							</div>
						</Card>
					</>
				)}
			</div>
		)
	}

	return (
		<div className="p-6">
			<div className="text-center mb-8">
				<h2 className="text-2xl font-semibold text-gray-900 mb-2">{steps[step - 1].title}</h2>
				<p className="text-gray-600">{steps[step - 1].subtitle}</p>
			</div>
			<StepIndicator steps={steps} currentStep={step} />
			<form className="space-y-8">
				<Card className="p-8 border-gray-200 shadow-sm">{renderStep()}</Card>
				<div className="flex items-center justify-between pt-6">
					<Button type="button" variant="outline" onClick={prevStep} disabled={step === 1 || isSubmitting} className="flex items-center space-x-2 px-6 py-2">
						<ChevronLeft className="w-4 h-4" />
						<span>Previous</span>
					</Button>
					<div className="flex items-center space-x-4">
						<Button type="button" variant="outline" disabled={isSubmitting} onClick={() => toast.info("Draft saving not implemented.")} className="px-6 py-2">
							Save as Draft
						</Button>
						{step === steps.length ? (
							<Button type="button" onClick={handleSubmitClick} disabled={isSubmitting || loading} className="px-8 py-2 bg-gray-900 hover:bg-gray-800 text-white">
								{isSubmitting || loading ? "Creating..." : "Create Job"}
							</Button>
						) : (
							<Button type="button" onClick={nextStep} disabled={isSubmitting} className="flex items-center space-x-2 px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white">
								<span>Next</span>
								<ChevronRight className="w-4 h-4" />
							</Button>
						)}
					</div>
				</div>
			</form>
		</div>
	)
}