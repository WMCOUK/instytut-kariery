"use client"

import Pagination from "@/components/landing/elements/filter/Pagination"
import ShowPerPage from "@/components/landing/elements/filter/ShowPerPage"
import RecruiterGrid1 from "@/components/landing/elements/recruiter/RecruiterGrid1"
import RecruiterList1 from "@/components/landing/elements/recruiter/RecruiterList1"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchQueryRecruiter } from "@/fetchSwr"
import { LayoutGrid, List, SearchX } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import RecruiterVerticalFilter from "../../elements/recruiter/RecruiterVerticalFilter"
import SortDropdown from "../../elements/recruiter/SortDropdown"

export default function RecruiterSection1() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const defaultFilters = {
		search: "",
		jobIndustrySlug: "",
	}

	const defaultSortOptions = {
		sortBy: "createdAt",
		sortOrder: "desc",
	}

	const [filters, setFilters] = useState(() => {
		const initialFilters = { ...defaultFilters }
		for (const key in defaultFilters) {
			const value = searchParams.get(key)
			if (value) initialFilters[key] = value
		}
		return initialFilters
	})

	const [sortOptions, setSortOptions] = useState({
		sortBy: searchParams.get("sortBy") || defaultSortOptions.sortBy,
		sortOrder: searchParams.get("sortOrder") || defaultSortOptions.sortOrder,
	})

	const [itemsPerPage, setItemsPerPage] = useState(Number.parseInt(searchParams.get("pageSize") || "10", 10))
	const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get("page") || "1", 10))
	const [viewMode, setViewMode] = useState("grid")

	const { recruiters, totalPage, isLoading, error } = fetchQueryRecruiter(
		currentPage,
		itemsPerPage,
		sortOptions.sortBy,
		sortOptions.sortOrder,
		filters.search,
		filters.jobIndustrySlug,
	)

	const updateQueryParams = useCallback(() => {
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

		router.push(`/recruiters?${query.toString()}`, { scroll: false })
	}, [currentPage, itemsPerPage, sortOptions.sortBy, sortOptions.sortOrder, filters, router])

	useEffect(() => {
		updateQueryParams()
	}, [updateQueryParams])

	const handleSortChange = ({ sortBy, sortOrder }) => {
		setSortOptions({ sortBy, sortOrder })
		setCurrentPage(1)
	}

	const handleApplyFilters = (newFilters) => {
		setFilters(newFilters)
		setCurrentPage(1)
	}

	const handleViewModeChange = (mode) => {
		setViewMode(mode)
	}

	const handleReset = () => {
		setFilters(defaultFilters)
		setSortOptions(defaultSortOptions)
		setItemsPerPage(10)
		setCurrentPage(1)
	}

	return (
		<div className="section-padding">
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
					<div>
						<RecruiterVerticalFilter
							onApplyFilters={handleApplyFilters}
							itemsPerPage={itemsPerPage}
							setItemsPerPage={setItemsPerPage}
							initialFilters={filters}
							onReset={handleReset}
						/>
					</div>
					<div className="lg:col-span-3">
						<div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-5">
							<SortDropdown onSortChange={handleSortChange} initialSort={sortOptions} />
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
							<div className={`grid md:grid-cols-${viewMode === "list" ? "1" : "2"} gap-5 mt-5`}>
								{[...Array(itemsPerPage)].map((_, i) => (
									<Skeleton key={i} className="h-40 w-full rounded-xl" />
								))}
							</div>
						) : error ? (
							<div className="mt-5 text-center text-red-500">Error loading recruiters: {error.message}</div>
						) : recruiters.length > 0 ? (
							<>
								<div className={`grid md:grid-cols-${viewMode === "list" ? "1" : "2"} gap-5 mt-5`}>
									{recruiters.map((item, i) =>
										viewMode === "list" ? (
											<RecruiterList1 item={item} key={item.id || i} />
										) : (
											<RecruiterGrid1 item={item} key={item.id || i} />
										),
									)}
								</div>
								{totalPage > 1 && (
									<Pagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} />
								)}
							</>
						) : (
							<div className="flex items-center justify-center mt-24">
								<div className="w-full max-w-md">
									<div className="flex flex-col items-center p-6 text-center">
										<SearchX className="w-16 h-16 text-primary mb-4" />
										<h2 className="text-2xl font-semibold mb-2">No recruiters found</h2>
										<p className="text-gray-500">
											No recruiters match the selected filters. Try adjusting your search criteria.
										</p>
										<Button onClick={handleReset} className="mt-4">
											Reset All Filters
										</Button>
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

