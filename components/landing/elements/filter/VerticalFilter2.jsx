'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { fetchAllExperience, fetchAllIndustry, fetchAllLocation, fetchAllType } from '@/fetchSwr'
import { staticWorkModesData } from '@/utils'
import { debounce } from 'lodash'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function VerticalFilter2({ onApplyFilters, itemsPerPage, setItemsPerPage, filters }) {
	const { industries } = fetchAllIndustry()
	const { types } = fetchAllType()
	const { experiences } = fetchAllExperience()
	const { locations } = fetchAllLocation()
	const router = useRouter()
	const [geoError, setGeoError] = useState(null)
	const [postedWithinCounts, setPostedWithinCounts] = useState({
		'1-day': 0,
		'7-days': 0,
		'30-days': 0,
		'60-days': 0,
		'120-days': 0,
		'180-days': 0,
	})

	const defaultValues = {
		jobType: [],
		jobExperience: '',
		jobLocation: '',
		workMode: [],
		jobIndustrySlug: '',
		isFreelance: false,
		isFeatured: false,
		search: '',
		createdAtRange: [],
		latitude: '',
		longitude: '',
		minDistance: '',
		maxDistance: '',
	}

	const { setValue, watch, reset } = useForm({ defaultValues })
	const formValues = watch()

	const fetchCounts = useCallback(
		debounce(async () => {
			try {
				const queryParams = new URLSearchParams({
					getCounts: 'true',
					...(filters.jobType.length && { jobType: filters.jobType.join(',') }),
					...(filters.jobPosition && { jobPosition: filters.jobPosition }),
					...(filters.jobExperience && { jobExperience: filters.jobExperience }),
					...(filters.jobLocation && { jobLocation: filters.jobLocation }),
					...(filters.workMode.length && { workMode: filters.workMode.join(',') }),
					...(filters.jobIndustrySlug && { jobIndustrySlug: filters.jobIndustrySlug }),
					...(filters.isFreelance && { isFreelance: filters.isFreelance.toString() }),
					...(filters.isFeatured && { isFeatured: filters.isFeatured.toString() }),
					...(filters.search && { search: filters.search }),
					...(filters.latitude && { latitude: filters.latitude }),
					...(filters.longitude && { longitude: filters.longitude }),
					...(filters.minDistance && { minDistance: parseInt(filters.minDistance).toString() }),
					...(filters.maxDistance && { maxDistance: parseInt(filters.maxDistance).toString() }),
				})

				const response = await fetch(`/api/v1/job/filter?${queryParams.toString()}`)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const data = await response.json()
				if (data.counts) {
					setPostedWithinCounts(data.counts)
				}
			} catch (error) {
				console.error('Error fetching posted within counts:', error)
			}
		}, 500),
		[filters]
	)

	useEffect(() => {
		fetchCounts()
		return () => fetchCounts.cancel()
	}, [fetchCounts])

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search)
		const jobTypeFromUrl = queryParams.get('jobType')?.split(',').filter(Boolean) || []
		const jobExperienceFromUrl = queryParams.get('jobExperience') || ''
		const jobLocationFromUrl = queryParams.get('jobLocation') || ''
		const workModeFromUrl = queryParams.get('workMode')?.split(',').filter(Boolean) || []
		const jobIndustrySlugFromUrl = queryParams.get('jobIndustrySlug') || ''
		const isFreelanceFromUrl = queryParams.get('isFreelance') === 'true'
		const isFeaturedFromUrl = queryParams.get('isFeatured') === 'true'
		const searchFromUrl = queryParams.get('search') || ''
		const createdAtRangeFromUrl = queryParams.get('createdAtRange')?.split(',').filter(Boolean) || []
		const latitudeFromUrl = queryParams.get('latitude') || ''
		const longitudeFromUrl = queryParams.get('longitude') || ''
		const minDistanceFromUrl = queryParams.get('minDistance') || ''
		const maxDistanceFromUrl = queryParams.get('maxDistance') || ''

		setValue('jobType', jobTypeFromUrl.sort((a, b) => {
			const order = ['freelancer', 'remote', 'part-time', 'full-time', 'contract']
			return order.indexOf(a) - order.indexOf(b)
		}))
		setValue('jobExperience', jobExperienceFromUrl)
		setValue('jobLocation', jobLocationFromUrl)
		setValue('workMode', workModeFromUrl)
		setValue('jobIndustrySlug', jobIndustrySlugFromUrl)
		setValue('isFreelance', isFreelanceFromUrl)
		setValue('isFeatured', isFeaturedFromUrl)
		setValue('search', searchFromUrl)
		setValue('createdAtRange', createdAtRangeFromUrl)
		setValue('latitude', latitudeFromUrl)
		setValue('longitude', longitudeFromUrl)
		setValue('minDistance', minDistanceFromUrl)
		setValue('maxDistance', maxDistanceFromUrl)
	}, [setValue])

	useEffect(() => {
		if ((formValues.minDistance || formValues.maxDistance) && !formValues.latitude && !formValues.longitude) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords
						setValue('latitude', latitude.toString())
						setValue('longitude', longitude.toString())
						setGeoError(null)
						onApplyFilters({
							...formValues,
							latitude: latitude.toString(),
							longitude: longitude.toString(),
							minDistance: formValues.minDistance ? parseInt(formValues.minDistance.replace(' KM', '')).toString() : '',
							maxDistance: formValues.maxDistance ? parseInt(formValues.maxDistance.replace(' KM', '')).toString() : '',
						})
					},
					(error) => {
						setGeoError('Unable to retrieve your location. Please allow location access or enter a location manually.')
						onApplyFilters({
							...formValues,
							latitude: '',
							longitude: '',
							minDistance: formValues.minDistance ? parseInt(formValues.minDistance.replace(' KM', '')).toString() : '',
							maxDistance: formValues.maxDistance ? parseInt(formValues.maxDistance.replace(' KM', '')).toString() : '',
						})
					},
					{ timeout: 10000 }
				)
			} else {
				setGeoError('Geolocation is not supported by your browser. Please enter a location manually.')
				onApplyFilters({
					...formValues,
					latitude: '',
					longitude: '',
					minDistance: formValues.minDistance ? parseInt(formValues.minDistance.replace(' KM', '')).toString() : '',
					maxDistance: formValues.maxDistance ? parseInt(formValues.maxDistance.replace(' KM', '')).toString() : '',
				})
			}
		}
	}, [formValues.minDistance, formValues.maxDistance, formValues.latitude, formValues.longitude, setValue, onApplyFilters])

	const handleFilterChange = (field, value, checked) => {
		if (['minDistance', 'maxDistance'].includes(field)) {
			const numericValue = value ? parseInt(value.replace(' KM', '')).toString() : ''
			setValue(field, numericValue)
			setGeoError(null)
			onApplyFilters({ ...formValues, [field]: numericValue })
			return
		}

		if (['jobType', 'workMode', 'createdAtRange'].includes(field)) {
			const currentValues = formValues[field] || []
			let newValues = checked
				? [...currentValues, value]
				: currentValues.filter((item) => item !== value)
			if (field === 'jobType') {
				newValues = newValues.sort((a, b) => {
					const order = ['freelancer', 'remote', 'part-time', 'full-time', 'contract']
					return order.indexOf(a) - order.indexOf(b)
				})
			}
			setValue(field, newValues)
			onApplyFilters({ ...formValues, [field]: newValues })
		} else {
			setValue(field, value)
			onApplyFilters({ ...formValues, [field]: value })
		}
	}

	const handleReset = () => {
		reset(defaultValues)
		setGeoError(null)
		onApplyFilters(defaultValues)
		setItemsPerPage(10)
	}

	return (
		<div className="space-y-6 rounded-lg">
			<div className="flex justify-between items-center">
				<h4 className="text-lg sm:text-xl font-semibold text-foreground">Filter</h4>
				{Object.values(formValues).some((value) => (Array.isArray(value) ? value.length : value)) && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={handleReset}
						aria-label="Reset filters"
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
						value={formValues.search || ''}
						onChange={(e) => handleFilterChange('search', e.target.value)}
						className="mt-1"
						aria-label="Search jobs"
					/>
				</div>
				<div>
					<Select
						value={formValues.jobIndustrySlug || ''}
						onValueChange={(value) => handleFilterChange('jobIndustrySlug', value)}
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
						value={formValues.jobExperience || ''}
						onValueChange={(value) => handleFilterChange('jobExperience', value)}
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
						value={formValues.jobLocation || ''}
						onValueChange={(value) => handleFilterChange('jobLocation', value)}
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
				<div className="space-x-2 grid grid-cols-2">
					
				<div>
					<Select
						value={formValues.minDistance ? `${formValues.minDistance} KM` : ''}
						onValueChange={(value) => handleFilterChange('minDistance', value)}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Min Distance" />
						</SelectTrigger>
						<SelectContent>
							{['1', '3', '5', '8', '10', '15', '20'].map((value) => (
								<SelectItem key={value} value={`${value} KM`}>
									{`${value} KM`}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={formValues.maxDistance ? `${formValues.maxDistance} KM` : ''}
						onValueChange={(value) => handleFilterChange('maxDistance', value)}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Max Distance" />
						</SelectTrigger>
						<SelectContent>
							{['1', '3', '5', '8', '10', '15', '20'].map((value) => (
								<SelectItem key={value} value={`${value} KM`}>
									{`${value} KM`}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				</div>
				<div>
					<Label className="text-sm sm:text-base">Type</Label>
					<div className="mt-1 space-y-2">
						{types?.map((option) => (
							<div key={option?.slug} className="flex items-center space-x-2">
								<Checkbox
									id={`type-${option?.slug}`}
									checked={formValues.jobType?.includes(option?.slug)}
									onCheckedChange={(checked) => handleFilterChange('jobType', option?.slug, checked)}
								/>
								<Label htmlFor={`type-${option?.slug}`}>
									{option?.title}
								</Label>
							</div>
						))}
					</div>
				</div>
				<div>
					<Label className="text-sm sm:text-base">Posted Within</Label>
					<div className="mt-1 space-y-2">
						{[
							{ slug: '1-day', title: `1 Day (${postedWithinCounts['1-day'] || 0})` },
							{ slug: '7-days', title: `7 Days (${postedWithinCounts['7-days'] || 0})` },
							{ slug: '30-days', title: `30 Days (${postedWithinCounts['30-days'] || 0})` },
							{ slug: '60-days', title: `60 Days (${postedWithinCounts['60-days'] || 0})` },
							{ slug: '120-days', title: `120 Days (${postedWithinCounts['120-days'] || 0})` },
							{ slug: '180-days', title: `180 Days (${postedWithinCounts['180-days'] || 0})` },
						].map((option) => (
							<div key={option.slug} className="flex items-center space-x-2">
								<Checkbox
									id={`created-${option.slug}`}
									checked={formValues.createdAtRange?.includes(option.slug)}
									onCheckedChange={(checked) => handleFilterChange('createdAtRange', option.slug, checked)}
								/>
								<Label htmlFor={`created-${option.slug}`}>
									{option.title}
								</Label>
							</div>
						))}
					</div>
				</div>
				<div>
					<Label className="text-sm sm:text-base">Work Mode</Label>
					<div className="mt-1 space-y-2">
						{staticWorkModesData?.map((option) => (
							<div key={option?.slug} className="flex items-center space-x-2">
								<Checkbox
									id={`workmode-${option?.slug}`}
									checked={formValues.workMode?.includes(option?.slug)}
									onCheckedChange={(checked) => handleFilterChange('workMode', option?.slug, checked)}
								/>
								<Label htmlFor={`workmode-${option?.slug}`}>
									{option?.title}
								</Label>
							</div>
						))}
					</div>
				</div>
				<div className="flex items-center justify-between">
					<Label htmlFor="isFreelance" className="text-sm sm:text-base">Freelance</Label>
					<Switch
						id="isFreelance"
						checked={formValues.isFreelance || false}
						onCheckedChange={(value) => handleFilterChange('isFreelance', value)}
					/>
				</div>
				<div className="flex items-center justify-between">
					<Label htmlFor="isFeatured" className="text-sm sm:text-base">Featured</Label>
					<Switch
						id="isFeatured"
						checked={formValues.isFeatured || false}
						onCheckedChange={(value) => handleFilterChange('isFeatured', value)}
					/>
				</div>
				{geoError && (
					<div className="text-red-500 text-sm">{geoError}</div>
				)}
			</div>
		</div>
	)
}