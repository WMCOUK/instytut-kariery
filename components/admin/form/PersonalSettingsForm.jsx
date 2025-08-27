"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"
import ImageUpload from "../elements/ImageUpload"

const schema = yup.object({
	name: yup.string().nullable(),
	image: yup.string().url("Invalid image URL").nullable(),
	coverPhoto: yup.string().url("Invalid cover photo URL").nullable(),
	designation: yup.string().nullable(),
	description: yup.string().nullable(),
	bio: yup.string().nullable(),
	address: yup.string().nullable(),
	state: yup.string().nullable(),
	city: yup.string().nullable(),
	country: yup.string().nullable(),
	postalCode: yup.string().nullable(),
	website: yup.string().url("Invalid website URL").nullable(),
	latitude: yup.number().nullable(),
	longitude: yup.number().nullable(),
	seoMeta: yup.string().nullable(),
	phone: yup.string().matches(/^\+?[0-9]+$/, "Invalid phone number").nullable(),
	gender: yup.string().oneOf(["Male", "Female", "Other"]).nullable(),
	dateOfBirth: yup.date().nullable(),
})

export default function ProfileSettingsForm({ user }) {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const form = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			...user?.personal,
			dateOfBirth: user?.personal?.dateOfBirth ? new Date(user.personal.dateOfBirth).toISOString().split("T")[0] : "",
			gender: user?.personal?.gender || "",
		},
	})

	const handleImage = (newValue) => form.setValue("image", newValue)
	const handleCoverPhoto = (newValue) => form.setValue("coverPhoto", newValue)

	const image = useWatch({ control: form.control, name: "image" })
	const coverPhoto = useWatch({ control: form.control, name: "coverPhoto" })

	useEffect(() => {
		if (user?.personal) {
			const formattedDate = user.personal.dateOfBirth
				? new Date(user.personal.dateOfBirth).toISOString().split("T")[0]
				: ""
			form.reset({
				...user.personal,
				dateOfBirth: formattedDate,
				gender: user.personal.gender || "",
			})
		}
	}, [user, form])

	const handleUpdateUser = async (data) => {
		setLoading(true)
		try {
			if (data.dateOfBirth) data.dateOfBirth = new Date(data.dateOfBirth).toISOString()

			const response = await fetch(`/api/v1/user/personal`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			if (!response.ok) throw new Error("Network error")

			await response.json()
			toast.success("Profile updated successfully!")
		} catch (error) {
			toast.error("Failed to update profile.")
		} finally {
			setLoading(false)
		}
	}

	const renderField = (name, label, Component = Input, props = {}) => (
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateUser)} className="space-y-8">

				{/* Profile Images */}
				<section className="space-y-4">
					<h3 className="text-lg font-semibold border-b pb-2">Profile Images</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{renderField("image", "Profile Image", ImageUpload, { value: image, onChange: handleImage })}
						{renderField("coverPhoto", "Cover Photo", ImageUpload, { value: coverPhoto, onChange: handleCoverPhoto })}
					</div>
				</section>

				{/* Basic Info */}
				<section className="space-y-4">
					<h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{renderField("name", "Full Name")}
						{renderField("designation", "Designation")}
						{renderField("dateOfBirth", "Date of Birth", Input, { type: "date" })}
						<FormField
							name="gender"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<Select onValueChange={field.onChange} value={field.value || ""}>
										<SelectTrigger>
											<SelectValue placeholder="Select gender" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Male">Male</SelectItem>
											<SelectItem value="Female">Female</SelectItem>
											<SelectItem value="Other">Other</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</div>
				</section>

				{/* Bio & Description */}
				<section className="space-y-4">
					<h3 className="text-lg font-semibold border-b pb-2">About You</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{renderField("description", "Short Description", Textarea)}
						{renderField("bio", "Detailed Bio", Textarea)}
					</div>
				</section>

				{/* Contact Info */}
				<section className="space-y-4">
					<h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{renderField("phone", "Phone Number")}
						{renderField("website", "Website")}
						{renderField("address", "Address")}
						{renderField("state", "State")}
						{renderField("city", "City")}
						{renderField("country", "Country")}
						{renderField("postalCode", "Postal Code")}
					</div>
				</section>

				{/* Location */}
				<section className="space-y-4">
					<h3 className="text-lg font-semibold border-b pb-2">Location Coordinates</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{renderField("latitude", "Latitude", Input, { type: "number" })}
						{renderField("longitude", "Longitude", Input, { type: "number" })}
					</div>
				</section>

				{/* SEO */}
				<section className="space-y-4">
					<h3 className="text-lg font-semibold border-b pb-2">SEO</h3>
					{renderField("seoMeta", "SEO Meta", Textarea)}
				</section>

				{/* Submit */}
				<div className="pt-4">
					<Button type="submit" disabled={loading} className="w-full">
						{loading ? <Loader2 className="animate-spin" /> : "Update Profile"}
					</Button>
				</div>
			</form>
		</Form>
	)
}
