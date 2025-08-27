'use client'

import Pagination from "@/components/landing/elements/filter/Pagination"
import ShowPerPage from "@/components/landing/elements/filter/ShowPerPage"
import SortDropdown from "@/components/landing/elements/filter/SortDropdown"
import VerticalFilter from "@/components/landing/elements/filter/VerticalFilter"
import JobGrid1 from "@/components/landing/elements/job/JobGrid1"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchQueryJob } from "@/fetchSwr"
import { LayoutGrid, List, SearchX } from 'lucide-react'
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import JobList2 from "../../elements/job/JobList2"
import MapLeaflet3 from "../../elements/map/MapLeaflet3"

export default function JobSection1() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const defaultFilters = {
		jobType: "",
		jobPosition: "",
		jobExperience: "",
		jobLocation: "",
		workMode: "",
		jobIndustrySlug: "",
		search: "",
		createdAtRange: "",
		latitude: "",
		longitude: "",
		minDistance: "",
		maxDistance: "",
	}

	const defaultSortOptions = {
		sortBy: "createdAt",
		sortOrder: "desc",
	}

	const [filters, setFilters] = useState({
		...defaultFilters,
		...Object.fromEntries([...searchParams.entries()]),
	})

	const [sortOptions, setSortOptions] = useState({
		sortBy: searchParams.get('sortBy') || defaultSortOptions.sortBy,
		sortOrder: searchParams.get('sortOrder') || defaultSortOptions.sortOrder,
	})

	const [itemsPerPage, setItemsPerPage] = useState(
		parseInt(searchParams.get('pageSize'), 10) || 10
	)
	const [currentPage, setCurrentPage] = useState(
		parseInt(searchParams.get('page'), 10) || 1
	)

	const { jobs, totalPage, isLoading, error } = fetchQueryJob(
		currentPage,
		itemsPerPage,
		sortOptions.sortBy,
		sortOptions.sortOrder,
		filters.jobType,
		filters.jobPosition,
		filters.jobExperience,
		filters.jobLocation,
		filters.workMode,
		filters.jobIndustrySlug,
		filters.isFreelance,
		filters.isFeatured,
		filters.search,
		filters.createdAtRange,
		filters.latitude,
		filters.longitude,
		filters.minDistance,
		filters.maxDistance
	)

	// Updates the URL query parameters
	const updateQueryParams = () => {
		const query = new URLSearchParams()

		query.set("page", currentPage.toString())
		query.set("pageSize", itemsPerPage.toString())
		query.set("sortBy", sortOptions.sortBy)
		query.set("sortOrder", sortOptions.sortOrder)

		for (const key in filters) {
			if (filters[key]) {
				query.set(key, filters[key])
			}
		}

		router.push(`/jobs?${query.toString()}`, { scroll: false })
	}

	useEffect(() => {
		updateQueryParams()
	}, [filters, sortOptions, currentPage, itemsPerPage])

	const handleSortChange = ({ sortBy, sortOrder }) => {
		setSortOptions({ sortBy, sortOrder })
	}

	const handleApplyFilters = (newFilters) => {
		setFilters(newFilters)
		setCurrentPage(1)
	}

	const [viewMode, setViewMode] = useState("grid")

	const handleViewModeChange = (mode) => {
		setViewMode(mode)
	}

	return (
		<div className="pb-48">
								<MapLeaflet3 jobs={jobs} />
			<div className="container">
				
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
					<div>
						<VerticalFilter
							onApplyFilters={handleApplyFilters}
							itemsPerPage={itemsPerPage}
							setItemsPerPage={setItemsPerPage}
						/>
					</div>
					<div className="lg:col-span-3">
						<div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-5">
							<SortDropdown onSortChange={handleSortChange} />
							<div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
								<ShowPerPage itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
								<div className="flex justify-end space-x-2">
									<Button
										variant="outline"
										size="icon"
										onClick={() => handleViewModeChange("grid")}
										aria-label="Grid view"
										className={viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}
									>
										<LayoutGrid className="h-4 w-4" />
									</Button>
									<Button
										variant="outline"
										size="icon"
										onClick={() => handleViewModeChange("list")}
										aria-label="List view"
										className={viewMode === "list" ? "bg-primary text-primary-foreground" : ""}
									>
										<List className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
						{isLoading ? (
							<>
								<div className={`grid md:grid-cols-${viewMode === "list" ? "1" : "2"} gap-5 mt-5`}>
									{[...Array(8)].map((_, i) => (
										<div className="group" key={i}>
											<div className="relative px-6 pt-5 pb-5 rounded-xl bg-primary/5">
												<div className="flex items-center">
													<Skeleton className="w-12 h-12 rounded-xl" />
													<div className="ml-4">
														<Skeleton className="h-4 w-24 mb-2" />
														<Skeleton className="h-3 w-32" />
													</div>
												</div>
												<div className="mt-4">
													<Skeleton className="h-6 w-full" />
												</div>
												<div className="my-3 flex space-x-2">
													{[...Array(3)].map((_, i) => (
														<Skeleton key={i} className="h-5 w-16 rounded-xl" />
													))}
												</div>
												<div className="flex items-center justify-between mt-5">
													<Skeleton className="h-4 w-20" />
													<Skeleton className="h-4 w-16" />
												</div>
											</div>
										</div>
									))}
								</div>
								<div className="flex items-center justify-center space-x-4 mt-6 w-full">
									<Skeleton className="h-8 w-24" />
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-8 w-24" />
								</div>
							</>
						) : error ? (
							<div>Error loading jobs: {error.message}</div>
						) : jobs.length > 0 ? (
							<>
								<div className={`grid md:grid-cols-${viewMode === "list" ? "1" : "2"} gap-5 mt-5`}>
									{jobs.map((item, i) => (
										viewMode === "list" ? (
											<JobList2 item={item} key={i} />
										) : (
											<JobGrid1 item={item} key={i} />
										)
									))}
								</div>
								<Pagination
									currentPage={currentPage}
									totalPage={totalPage}
									setCurrentPage={setCurrentPage}
								/>
							</>
						) : (
							<div className="flex items-center justify-center mt-24">
								<div className="w-full max-w-md">
									<div className="flex flex-col items-center p-6 text-center">
										<SearchX className="w-16 h-16 text-primary mb-4" />
										<h2 className="text-2xl font-semibold mb-2">No jobs found</h2>
										<p className="text-gray-500">
											No jobs match the selected filters. Try adjusting your search criteria.
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}