"use client"

import { Calendar, MapPin, Search, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { fetchAllIndustry, fetchAllLocation } from "@/fetchSwr"

export default function HeroSearch() {
	const { industries } = fetchAllIndustry()
	const { locations } = fetchAllLocation()

	const router = useRouter()
	const searchParams = useSearchParams()

	const [selectedIndustry, setSelectedIndustry] = useState(searchParams.get("jobIndustrySlug") || "")
	const [selectedLocation, setSelectedLocation] = useState(searchParams.get("jobLocation") || "")
	const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
	const [openLocation, setOpenLocation] = useState(false)
	const [openIndustry, setOpenIndustry] = useState(false)
	const [openGuests, setOpenGuests] = useState(false)

	useEffect(() => {
		setSelectedIndustry(searchParams.get("jobIndustrySlug") || "")
		setSelectedLocation(searchParams.get("jobLocation") || "")
		setSearchTerm(searchParams.get("search") || "")
	}, [searchParams])

	const updateQueryParams = () => {
		const query = new URLSearchParams({ page: "1", pageSize: "10", sortBy: "createdAt", sortOrder: "desc" })
		if (selectedIndustry) query.set("jobIndustrySlug", selectedIndustry)
		if (selectedLocation) query.set("jobLocation", selectedLocation)
		if (searchTerm) query.set("search", searchTerm)
		router.push(`/jobs?${query.toString()}`, { scroll: false })
	}

	return (
		<div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md flex items-center justify-between p-2 gap-2">
			{/* Location Selector */}
			<Popover open={openLocation} onOpenChange={setOpenLocation}>
				<PopoverTrigger asChild>
					<div className="flex-1 flex flex-col border-r pr-4 cursor-pointer">
						<span className="text-xs text-gray-500 font-medium">Location</span>
						<div className="flex items-center gap-2">
							<MapPin className="h-4 w-4 text-gray-400" />
							<span className="text-sm truncate">
								{selectedLocation
									? locations?.find((location) => location.slug === selectedLocation)?.title
									: "Select location"}
							</span>
						</div>
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-[280px] p-0 shadow-md" align="start">
					<Command>
						<CommandInput placeholder="Search location..." className="h-9 text-sm" />
						<CommandList>
							<CommandEmpty>No location found.</CommandEmpty>
							<CommandGroup>
								{locations?.map((location) => (
									<CommandItem
										key={location.slug}
										value={location.slug}
										onSelect={(currentValue) => {
											setSelectedLocation(currentValue === selectedLocation ? "" : currentValue)
											setOpenLocation(false)
										}}
										className="text-sm"
									>
										{location.title}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{/* Date Range / Industry */}
			<Popover open={openIndustry} onOpenChange={setOpenIndustry}>
				<PopoverTrigger asChild>
					<div className="flex-1 flex flex-col border-r pr-4 cursor-pointer">
						<span className="text-xs text-gray-500 font-medium">Industry</span>
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4 text-gray-400" />
							<span className="text-sm truncate">
								{selectedIndustry
									? industries?.find((industry) => industry.slug === selectedIndustry)?.title
									: "Select industry"}
							</span>
						</div>
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-[280px] p-0 shadow-md" align="start">
					<Command>
						<CommandInput placeholder="Search industry..." className="h-9 text-sm" />
						<CommandList>
							<CommandEmpty>No industry found.</CommandEmpty>
							<CommandGroup>
								{industries?.map((industry) => (
									<CommandItem
										key={industry.slug}
										value={industry.slug}
										onSelect={(currentValue) => {
											setSelectedIndustry(currentValue === selectedIndustry ? "" : currentValue)
											setOpenIndustry(false)
										}}
										className="text-sm"
									>
										{industry.title}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{/* Guests / Keywords */}
			<Popover open={openGuests} onOpenChange={setOpenGuests}>
				<PopoverTrigger asChild>
					<div className="flex-1 flex flex-col cursor-pointer">
						<span className="text-xs text-gray-500 font-medium">Keywords</span>
						<div className="flex items-center gap-2">
							<User className="h-4 w-4 text-gray-400" />
							<span className="text-sm truncate">{searchTerm ? searchTerm : "Job title or keyword"}</span>
						</div>
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-[280px] p-0 shadow-md" align="start">
					<div className="p-3">
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Job title or keyword"
							className="w-full p-2 border rounded-md text-sm"
						/>
						<Button
							className="w-full mt-2"
							onClick={() => {
								setOpenGuests(false)
								updateQueryParams()
							}}
						>
							Apply
						</Button>
					</div>
				</PopoverContent>
			</Popover>

			{/* Search Button */}
			<Button
				className="h-12 w-12 rounded-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700"
				onClick={updateQueryParams}
			>
				<Search className="h-5 w-5" />
			</Button>
		</div>
	)
}

