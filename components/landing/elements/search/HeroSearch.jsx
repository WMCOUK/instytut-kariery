"use client"

import { Briefcase, Check, ChevronsUpDown, MapPin, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { fetchAllIndustry, fetchAllLocation } from "@/fetchSwr"
import { cn } from "@/utils"

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

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			updateQueryParams()
		}
	}

	return (
		<div className="w-full bg-background/95 backdrop-blur-md rounded-xl border border-border/40 shadow-md p-3 flex flex-col sm:flex-row gap-3">
			{/* Industry Selector */}
			<Popover open={openIndustry} onOpenChange={setOpenIndustry}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openIndustry}
						className="w-full sm:w-[200px] justify-between h-12 px-4 text-sm font-medium border-border/30 bg-transparent hover:bg-accent/50 transition-colors group"
					>
						<div className="flex items-center truncate">
							<div className="mr-3 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
								<Briefcase className="h-4 w-4 text-primary" />
							</div>
							<span className="truncate">
								{selectedIndustry
									? industries?.find((industry) => industry.slug === selectedIndustry)?.title
									: "Industry"}
							</span>
						</div>
						<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[220px] p-0 shadow-md border-border/40" align="start">
					<Command>
						<CommandInput placeholder="Search industry..." className="h-10 text-sm" />
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
										className="text-sm py-2"
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4 text-primary",
												selectedIndustry === industry.slug ? "opacity-100" : "opacity-0",
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

			{/* Location Selector */}
			<Popover open={openLocation} onOpenChange={setOpenLocation}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openLocation}
						className="w-full sm:w-[200px] justify-between h-12 px-4 text-sm font-medium border-border/30 bg-transparent hover:bg-accent/50 transition-colors group"
					>
						<div className="flex items-center truncate">
							<div className="mr-3 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
								<MapPin className="h-4 w-4 text-primary" />
							</div>
							<span className="truncate">
								{selectedLocation
									? locations?.find((location) => location.slug === selectedLocation)?.title
									: "Location"}
							</span>
						</div>
						<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[220px] p-0 shadow-md border-border/40" align="start">
					<Command>
						<CommandInput placeholder="Search location..." className="h-10 text-sm" />
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
										className="text-sm py-2"
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4 text-primary",
												selectedLocation === location.slug ? "opacity-100" : "opacity-0",
											)}
										/>
										{location.title}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{/* Search Input */}
			<div className="relative flex-1">
				<div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
					<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
						<Search className="h-4 w-4 text-primary" />
					</div>
				</div>
				<Input
					type="text"
					placeholder="Job title or keyword"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={handleKeyDown}
					className="w-full h-12 pl-14 pr-4 text-sm bg-transparent border-border/30 focus-visible:ring-primary/20"
				/>
			</div>

			{/* Search Button */}
			<Button
				className="h-12 px-6 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:shadow-lg"
				onClick={updateQueryParams}
			>
				Search Jobs
			</Button>
		</div>
	)
}

