"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchAllIndustry, fetchAllLocation } from "@/fetchSwr"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function RecruiterVerticalFilter({
	onApplyFilters,
	itemsPerPage,
	setItemsPerPage,
	initialFilters,
	onReset,
}) {
	const { register, setValue, watch, reset } = useForm({
		defaultValues: {
			search: "",
			jobIndustrySlug: "",
			...(initialFilters || {}),
		},
	})

	const formValues = watch()
	const { industries } = fetchAllIndustry() || { industries: [] }
	const { locations } = fetchAllLocation() || { locations: [] }

	useEffect(() => {
		if (initialFilters) {
			Object.entries(initialFilters).forEach(([key, value]) => {
				setValue(key, value || "")
			})
		}
	}, [initialFilters, setValue])

	const handleFilterChange = (field, value) => {
		setValue(field, value)
		onApplyFilters({
			...formValues,
			[field]: value === "" ? "" : value,
		})
	}

	const handleReset = () => {
		reset()
		onReset()
	}

	return (
		<div className="space-y-6 px-6 py-4 rounded-lg bg-card">
			<div className="flex justify-between items-center">
				<h4 className="text-lg sm:text-xl font-semibold text-foreground">Filter</h4>
				{Object.values(formValues).some((val) => val && val !== "all") && (
					<Button type="button" variant="outline" size="sm" onClick={handleReset}>
						Reset
					</Button>
				)}
			</div>

			<div className="space-y-4">
				<Input
					type="text"
					placeholder="Search recruiters"
					{...register("search")}
					onChange={(e) => handleFilterChange("search", e.target.value)}
					className="mt-1"
				/>

				<Select
					value={formValues.jobIndustrySlug}
					onValueChange={(value) => handleFilterChange("jobIndustrySlug", value)}
				>
					<SelectTrigger className="capitalize mt-1">
						<SelectValue placeholder="All Industry" />
					</SelectTrigger>
					<SelectContent>
						{/* <SelectItem>All Industries</SelectItem> */}
						{industries?.map((industry) => (
							<SelectItem key={industry.slug} value={industry.slug}>
								{industry.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}

