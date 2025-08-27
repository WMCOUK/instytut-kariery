"use client"
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
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCountries } from "use-react-countries"
import * as yup from "yup"
import ImageUpload from "../elements/ImageUpload"
import TipTapEditor from "../elements/editor/TipTapEditor"

const validationSchema = yup.object({
	title: yup.string().required("Required"),
	email: yup.string().email("Invalid email").required("Required"),
	image: yup.string().required("Required"),
	coverPhoto: yup.string().required("Required"),
	jobIndustrySlug: yup.string().required("Required"),
	description: yup.string().required("Required"),
	content: yup
		.string()
		.test("notEmpty", "Content is required", (value) => {
			return value && value.trim() !== "" && value !== "<p></p>"
		})
		.required("Required"),
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
		.matches(/^\d{5}(-\d{3})?$/, "Invalid postal code")
		.required("Required"),
	latitude: yup.number().required("Required"),
	longitude: yup.number().required("Required"),
	seoMeta: yup.string().required("Required"),
})

export default function RecruiterEditForm({ recruiter }) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const { industries } = fetchAllIndustry()
	const { countries } = useCountries()
	const sortedCountries = countries?.sort((a, b) => a.name.localeCompare(b.name))

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isValid },
		trigger,
	} = useForm({
		defaultValues: {
			...recruiter,
			yearFounded: recruiter?.yearFounded || 0,
			numberOfEmployees: recruiter?.numberOfEmployees || 0,
		},
		resolver: yupResolver(validationSchema),
		mode: "onChange", // This enables real-time validation
	})

	const watchedFields = watch()
	const [openPopovers, setOpenPopovers] = useState({})

	useEffect(() => {
		// Trigger validation for content field when it changes
		trigger("content")
	}, [watchedFields.content, trigger])

	const onSubmit = async (data) => {
		// Trigger validation for all fields
		const isFormValid = await trigger()
		if (!isFormValid || !data.content || data.content.trim() === "" || data.content === "<p></p>") {
			toast.error("Please fill in all required fields, including content")
			return
		}

		setLoading(true)
		try {
			const res = await fetch(`/api/v1/recruiter/${recruiter?.slug}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...data, slug: slugify(data.title) }),
			})
			if (!res.ok) throw new Error("Failed to update recruiter")
			toast.success("Recruiter updated successfully!")
			router.push(`/admin/recruiter/${recruiter?.slug}`)
		} catch (error) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const renderField = (name, label, type = "text", options = {}) => (
		<div className="space-y-2">
			<Label htmlFor={name}>{label}</Label>
			<Input
				id={name}
				type={type}
				placeholder={`Enter ${label.toLowerCase()}`}
				{...register(name, {
					onChange: () => trigger(name),
				})}
				{...options}
			/>
			{errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
		</div>
	)

	const renderCombobox = (name, label, options) => (
		<div className="space-y-2">
			<Label htmlFor={name}>{label}</Label>
			<Popover
				open={openPopovers[name]}
				onOpenChange={(open) => setOpenPopovers((prev) => ({ ...prev, [name]: open }))}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openPopovers[name]}
						className={cn("w-full justify-between", !watchedFields[name] && "text-muted-foreground")}
					>
						{watchedFields[name]
							? options?.find((item) => item.value === watchedFields[name])?.label
							: `Select ${label}`}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0">
					<Command>
						<CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
						<CommandList>
							<CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
							<CommandGroup>
								{options?.map((item) => (
									<CommandItem
										key={item.value}
										onSelect={() => {
											setValue(name, item.value)
											setOpenPopovers((prev) => ({ ...prev, [name]: false }))
											trigger(name)
										}}
									>
										<Check
											className={cn("mr-2 h-4 w-4", watchedFields[name] === item.value ? "opacity-100" : "opacity-0")}
										/>
										{item.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
		</div>
	)

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-bold">Edit Recruiter Profile</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{renderField("title", "Recruiter Title")}
						{renderField("email", "Recruiter Email", "email")}
						{renderCombobox(
							"jobIndustrySlug",
							"Industry",
							industries?.map((i) => ({ value: i.slug, label: i.title })),
						)}
						{renderField("phone", "Phone Number")}
						{renderField("website", "Website", "url")}
						{renderCombobox(
							"country",
							"Country",
							sortedCountries?.map((c) => ({ value: c.name, label: c.name })),
						)}
						{renderField("taxId", "Tax ID")}
						{renderField("yearFounded", "Year Founded", "number", { min: 1900, max: new Date().getFullYear() })}
						{renderField("numberOfEmployees", "Number of Employees", "number", { min: 1 })}
						{renderField("state", "State")}
						{renderField("city", "City")}
						{renderField("postalCode", "Postal Code")}
						{renderField("address", "Address")}
						{renderField("latitude", "Latitude", "number", { step: "any" })}
						{renderField("longitude", "Longitude", "number", { step: "any" })}
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Enter recruiter description"
							{...register("description", {
								onChange: () => trigger("description"),
							})}
							className="min-h-[100px]"
						/>
						{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="seoMeta">SEO Meta</Label>
						<Textarea
							id="seoMeta"
							placeholder="Enter SEO meta description"
							{...register("seoMeta", {
								onChange: () => trigger("seoMeta"),
							})}
						/>
						{errors.seoMeta && <p className="text-red-500 text-sm">{errors.seoMeta.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="content">Content</Label>
						<TipTapEditor
							value={watchedFields.content}
							onChange={(value) => {
								setValue("content", value)
								trigger("content")
							}}
							onBlur={() => trigger("content")}
						/>
						{errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label htmlFor="image">Logo</Label>
							<ImageUpload
								value={watchedFields.image}
								onChange={(value) => {
									setValue("image", value)
									trigger("image")
								}}
							/>
							{errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
						</div>
						<div className="space-y-2">
							<Label htmlFor="coverPhoto">Cover Photo</Label>
							<ImageUpload
								value={watchedFields.coverPhoto}
								onChange={(value) => {
									setValue("coverPhoto", value)
									trigger("coverPhoto")
								}}
							/>
							{errors.coverPhoto && <p className="text-red-500 text-sm">{errors.coverPhoto.message}</p>}
						</div>
					</div>
					<Button
						type="submit"
						className=""
						disabled={
							loading ||
							!isValid ||
							!watchedFields.content ||
							watchedFields.content.trim() === "" ||
							watchedFields.content === "<p></p>"
						}
					>
						{loading ? "Updating..." : "Update Recruiter"}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

