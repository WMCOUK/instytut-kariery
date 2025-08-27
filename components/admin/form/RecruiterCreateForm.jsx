"use client"

import ImageUpload from "@/components/admin/elements/ImageUpload"
import TipTapEditor from "@/components/admin/elements/editor/TipTapEditor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { fetchAllIndustry } from "@/fetchSwr"
import { cn, slugify } from "@/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCountries } from "use-react-countries"
import * as yup from "yup"

const defaultValues = {
	title: "",
	email: "",
	image: "",
	coverPhoto: "",
	jobIndustrySlug: "",
	description: "",
	content: "",
	taxId: "",
	phone: "",
	website: "",
	yearFounded: "",
	numberOfEmployees: "",
	country: "",
	state: "",
	address: "",
	city: "",
	postalCode: "",
	latitude: "",
	longitude: "",
	seoMeta: "",
}

const validationSchema = yup.object({
	title: yup.string().required("Required"),
	email: yup.string().email("Invalid email").required("Required"),
	image: yup.string().required("Required"),
	coverPhoto: yup.string().required("Required"),
	jobIndustrySlug: yup.string().required("Required"),
	description: yup.string().required("Required"),
	content: yup.string().required("Required"),
	taxId: yup.string().required("Required"),
	phone: yup
		.string()
		.matches(/^[\d+\-\s]+$/, "Invalid phone")
		.required("Required"),
	website: yup.string().url("Invalid URL").required("Required"),
	yearFounded: yup.number().min(1900).max(new Date().getFullYear()).required("Required"),
	numberOfEmployees: yup.number().min(1).required("Required"),
	country: yup.string().required("Required"),
	state: yup.string().required("Required"),
	address: yup.string().required("Required"),
	city: yup.string().required("Required"),
	postalCode: yup
		.string()
		.matches(/^\d{5}(-\d{4})?$/, "Invalid postal code")
		.required("Required"),
	latitude: yup.number().required("Required"),
	longitude: yup.number().required("Required"),
	seoMeta: yup.string().required("Required"),
})

export default function RecruiterCreateForm() {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		trigger,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
		mode: "onChange",
	})

	const [loading, setLoading] = useState(false)
	const { industries } = fetchAllIndustry()
	const { countries } = useCountries()
	const sortedCountries = countries?.sort((a, b) => a.name.localeCompare(b.name))

	const [industryOpen, setIndustryOpen] = useState(false)
	const [countryOpen, setCountryOpen] = useState(false)

	const onSubmit = async (data) => {
		setLoading(true)
		try {
			const formattedData = {
				...data,
				yearFounded: Number.parseInt(data.yearFounded, 10),
				numberOfEmployees: Number.parseInt(data.numberOfEmployees, 10),
				latitude: Number.parseFloat(data.latitude),
				longitude: Number.parseFloat(data.longitude),
				slug: slugify(data.title),
			}
			const res = await fetch("/api/v1/recruiter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formattedData),
			})
			if (res.ok) {
				toast.success("Recruiter created successfully!")
				reset()
			} else {
				throw new Error("Failed to create recruiter")
			}
		} catch (error) {
			toast.error(error.message)
			console.log("Error creating recruiter:", error);
			
		} finally {
			setLoading(false)
		}
	}

	const renderField = (name, label, type = "text", options = {}) => (
		<div className="space-y-2">
			<Label htmlFor={name}>{label}</Label>
			<Input id={name} type={type} placeholder={`Enter ${label.toLowerCase()}`} {...register(name)} {...options} />
			{errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
		</div>
	)

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-bold">Create Recruiter Profile</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{renderField("title", "Recruiter Title")}
						{renderField("email", "Recruiter Email", "email")}
						<div className="space-y-2">
							<Label htmlFor="jobIndustrySlug">Industry</Label>
							<Controller
								name="jobIndustrySlug"
								control={control}
								render={({ field }) => (
									<Popover open={industryOpen} onOpenChange={setIndustryOpen}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={industryOpen}
												className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
											>
												{field.value
													? industries?.find((industry) => industry.slug === field.value)?.title
													: "Select an industry"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0">
											<Command>
												<CommandInput placeholder="Search industry..." />
												<CommandList>
													<CommandEmpty>No industry found.</CommandEmpty>
													<CommandGroup>
														{industries?.map((industry) => (
															<CommandItem
																key={industry.slug}
																onSelect={() => {
																	field.onChange(industry.slug)
																	setIndustryOpen(false)
																	trigger("jobIndustrySlug")
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		field.value === industry.slug ? "opacity-100" : "opacity-0",
																	)}
																/>
																{industry.title}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								)}
							/>
							{errors.jobIndustrySlug && <p className="text-red-500 text-sm">{errors.jobIndustrySlug.message}</p>}
						</div>
						{renderField("phone", "Phone Number")}
						{renderField("website", "Website", "url")}
						{renderField("taxId", "Tax ID")}
						{renderField("yearFounded", "Year Founded", "number", { min: 1900, max: new Date().getFullYear() })}
						{renderField("numberOfEmployees", "Number of Employees", "number", { min: 1 })}
						<div className="space-y-2">
							<Label htmlFor="country">Country</Label>
							<Controller
								name="country"
								control={control}
								render={({ field }) => (
									<Popover open={countryOpen} onOpenChange={setCountryOpen}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={countryOpen}
												className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
											>
												{field.value || "Select a country"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0">
											<Command>
												<CommandInput placeholder="Search country..." />
												<CommandList>
													<CommandEmpty>No country found.</CommandEmpty>
													<CommandGroup>
														{sortedCountries?.map((country, i) => (
															<CommandItem
																key={i}
																onSelect={() => {
																	field.onChange(country.name)
																	setCountryOpen(false)
																	trigger("country")
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		field.value === country.name ? "opacity-100" : "opacity-0",
																	)}
																/>
																{country.name}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								)}
							/>
							{errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
						</div>
						{renderField("state", "State")}
						{renderField("city", "City")}
						{renderField("address", "Address")}
						{renderField("postalCode", "Postal Code")}
						{renderField("latitude", "Latitude", "number", { step: "any" })}
						{renderField("longitude", "Longitude", "number", { step: "any" })}
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Enter a description of the recruiter"
							{...register("description")}
							className="min-h-[100px]"
						/>
						{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="seoMeta">SEO Meta Description</Label>
						<Textarea
							id="seoMeta"
							placeholder="Enter SEO meta description"
							{...register("seoMeta")}
							className="min-h-[100px]"
						/>
						{errors.seoMeta && <p className="text-red-500 text-sm">{errors.seoMeta.message}</p>}
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label htmlFor="image">Logo</Label>
							<Controller
								name="image"
								control={control}
								render={({ field }) => (
									<ImageUpload
										value={field.value}
										onChange={(image) => {
											field.onChange(image)
											trigger("image")
										}}
									/>
								)}
							/>
							{errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
						</div>
						<div className="space-y-2">
							<Label htmlFor="coverPhoto">Cover Photo</Label>
							<Controller
								name="coverPhoto"
								control={control}
								render={({ field }) => (
									<ImageUpload
										value={field.value}
										onChange={(coverPhoto) => {
											field.onChange(coverPhoto)
											trigger("coverPhoto")
										}}
									/>
								)}
							/>
							{errors.coverPhoto && <p className="text-red-500 text-sm">{errors.coverPhoto.message}</p>}
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="content">Content</Label>
						<Controller
							name="content"
							control={control}
							render={({ field }) => (
								<TipTapEditor
									value={field.value}
									placeholder="Enter detailed content about the recruiter"
									onChange={(value) => {
										field.onChange(value)
										trigger("content")
									}}
								/>
							)}
						/>
						{errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
					</div>
					<div className="flex justify-start">
						<Button type="submit" disabled={loading} className="w-full sm:w-auto">
							{loading ? "Submitting..." : "Create Recruiter"}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}

