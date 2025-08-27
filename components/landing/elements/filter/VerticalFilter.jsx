'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { fetchAllExperience, fetchAllIndustry, fetchAllLocation, fetchAllType } from "@/fetchSwr"
import { staticWorkModesData } from "@/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function VerticalFilter({
	onApplyFilters,
	itemsPerPage,
	setItemsPerPage,
}) {
	const { industries } = fetchAllIndustry()
	const { types } = fetchAllType()
	const { experiences } = fetchAllExperience()
	const { locations } = fetchAllLocation()

	const { setValue, watch, reset } = useForm({
		defaultValues: {
			jobType: null,
			jobExperience: null,
			jobLocation: null,
			workMode: null,
			jobIndustrySlug: null,
			isFreelance: false,
			isFeatured: false,
			search: "",
			createdAtRange: null,
			latitude: "",
			longitude: "",
			minDistance: "",
			maxDistance: "",
		},
	})

	const formValues = watch()
	const router = useRouter()
	const [geoError, setGeoError] = useState(null)

	// Sync URL query params with form values
	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search)
		const jobIndustrySlugFromUrl = queryParams.get("jobIndustrySlug")
		const searchFromUrl = queryParams.get("search")
		const jobLocationFromUrl = queryParams.get("jobLocation")
		const latitudeFromUrl = queryParams.get("latitude")
		const longitudeFromUrl = queryParams.get("longitude")
		const minDistanceFromUrl = queryParams.get("minDistance")
		const maxDistanceFromUrl = queryParams.get("maxDistance")

		if (jobIndustrySlugFromUrl) {
			setValue("jobIndustrySlug", jobIndustrySlugFromUrl)
		}
		if (searchFromUrl) {
			setValue("search", searchFromUrl)
		}
		if (jobLocationFromUrl) {
			setValue("jobLocation", jobLocationFromUrl)
		}
		if (latitudeFromUrl) {
			setValue("latitude", latitudeFromUrl)
		}
		if (longitudeFromUrl) {
			setValue("longitude", longitudeFromUrl)
		}
		if (minDistanceFromUrl) {
			setValue("minDistance", minDistanceFromUrl)
		}
		if (maxDistanceFromUrl) {
			setValue("maxDistance", maxDistanceFromUrl)
		}
	}, [setValue])

	// Handle geolocation for distance-based filtering
	useEffect(() => {
		if ((formValues.minDistance || formValues.maxDistance) && !formValues.latitude && !formValues.longitude) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords
						setValue("latitude", latitude.toString())
						setValue("longitude", longitude.toString())
						setGeoError(null)
						onApplyFilters({
							...formValues,
							latitude: latitude.toString(),
							longitude: longitude.toString(),
						})
					},
					(error) => {
						setGeoError("Unable to retrieve location. Please try again or adjust other filters.")
						onApplyFilters({ ...formValues, latitude: "", longitude: "" })
					}
				)
			} else {
				setGeoError("Geolocation is not supported by this browser.")
				onApplyFilters({ ...formValues, latitude: "", longitude: "" })
			}
		}
	}, [formValues.minDistance, formValues.maxDistance, formValues.latitude, formValues.longitude, setValue, onApplyFilters])

	const handleFilterChange = (field, value) => {
		setValue(field, value)
		if (field === "minDistance" || field === "maxDistance") {
			setValue("latitude", "")
			setValue("longitude", "")
			setGeoError(null)
			onApplyFilters({ ...formValues, [field]: value, latitude: "", longitude: "" })
			return
		}
		onApplyFilters({ ...formValues, [field]: value })
	}

	const handleReset = () => {
		reset()
		setGeoError(null)
		onApplyFilters({})
		setItemsPerPage(10)
	}

	return (
		<div className="space-y-6 rounded-lg">
			<div className="flex justify-between items-center">
				<h4 className="text-lg sm:text-xl font-semibold text-foreground">Filter</h4>
				{Object.keys(formValues).some((key) => formValues[key]) && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={handleReset}
					>
						Reset
					</Button>
				)}
			</div>
			<div className="space-y-4">
				<div>
					<Input
						type="text"
						placeholder="Search by title, description, or content"
						value={formValues.search || ""}
						onChange={(e) => handleFilterChange("search", e.target.value)}
						className="mt-1"
					/>
				</div>
				<div>
					<Select
						value={formValues.jobIndustrySlug || ""}
						onValueChange={(value) => handleFilterChange("jobIndustrySlug", value)}
					>
						<SelectTrigger className="capitalize mt-1">
							<SelectValue placeholder="Industry" />
						</SelectTrigger>
						<SelectContent>
							{industries?.map((option) => (
								<SelectItem key={option?.slug} value={option?.slug} className="capitalize">
									{option?.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={formValues.jobType || ""}
						onValueChange={(value) => handleFilterChange("jobType", value)}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Type" />
						</SelectTrigger>
						<SelectContent>
							{types?.map((option) => (
								<SelectItem key={option?.slug} value={option?.slug}>
									{option?.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={formValues.jobExperience || ""}
						onValueChange={(value) => handleFilterChange("jobExperience", value)}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Experience" />
						</SelectTrigger>
						<SelectContent>
							{experiences?.map((option) => (
								<SelectItem key={option?.slug} value={option?.slug}>
									{option?.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={formValues.jobLocation || ""}
						onValueChange={(value) => handleFilterChange("jobLocation", value)}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Location" />
						</SelectTrigger>
						<SelectContent>
							{locations?.map((option) => (
								<SelectItem key={option?.slug} value={option?.slug}>
									{option?.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={formValues.createdAtRange || ""}
						onValueChange={(value) => handleFilterChange("createdAtRange", value)}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Posted Within" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1 day">1 Day</SelectItem>
							<SelectItem value="7 days">7 Days</SelectItem>
							<SelectItem value="30 days">30 Days</SelectItem>
							<SelectItem value="6 months">6 Months</SelectItem>
							<SelectItem value="1 year">1 Year</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={formValues.minDistance || ""}
						onValueChange={(value) => handleFilterChange("minDistance", value)}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Min Distance" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1 KM">1 KM</SelectItem>
							<SelectItem value="3 KM">3 KM</SelectItem>
							<SelectItem value="5 KM">5 KM</SelectItem>
							<SelectItem value="8 KM">8 KM</SelectItem>
							<SelectItem value="10 KM">10 KM</SelectItem>
							<SelectItem value="15 KM">15 KM</SelectItem>
							<SelectItem value="20 KM">20 KM</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={formValues.maxDistance || ""}
						onValueChange={(value) => handleFilterChange("maxDistance", value)}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Max Distance" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1 KM">1 KM</SelectItem>
							<SelectItem value="3 KM">3 KM</SelectItem>
							<SelectItem value="5 KM">5 KM</SelectItem>
							<SelectItem value="8 KM">8 KM</SelectItem>
							<SelectItem value="10 KM">10 KM</SelectItem>
							<SelectItem value="15 KM">15 KM</SelectItem>
							<SelectItem value="20 KM">20 KM</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={formValues.workMode || ""}
						onValueChange={(value) => handleFilterChange("workMode", value)}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Workmode" />
						</SelectTrigger>
						<SelectContent>
							{staticWorkModesData?.map((option) => (
								<SelectItem key={option?.slug} value={option?.slug}>
									{option?.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center justify-between">
					<Label htmlFor="isFreelance" className="text-sm sm:text-base">Freelance</Label>
					<Switch
						id="isFreelance"
						checked={formValues.isFreelance || false}
						onCheckedChange={(value) => handleFilterChange("isFreelance", value)}
					/>
				</div>
				<div className="flex items-center justify-between">
					<Label htmlFor="isFeatured" className="text-sm sm:text-base">Featured</Label>
					<Switch
						id="isFeatured"
						checked={formValues.isFeatured || false}
						onCheckedChange={(value) => handleFilterChange("isFeatured", value)}
					/>
				</div>
			</div>
		</div>
	)
}