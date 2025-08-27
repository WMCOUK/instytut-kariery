"use client"

import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobModerationTable from "@/components/admin/table/JobModerationTable"
import { fetchModerationJob } from "@/fetchSwr"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function JobPendingPage() {
	const moderation = "pending" // ✅ moderation defined here

	const searchParams = useSearchParams()
	const page = Number.parseInt(searchParams.get("page") || "1")
	const initialSearch = searchParams.get("search") || ""
	const [search, setSearch] = useState(initialSearch)

	const {
		jobs,
		totalPage,
		totalJob,
		currentPage,
		error,
		mutate,
		isLoading,
	} = fetchModerationJob(moderation, page, search) // ✅ used in fetch call

	// useEffect(() => {
	// 	const newUrl = `/recruiter/job/${moderation}?page=${currentPage}&search=${search}` // ✅ used in URL
	// 	window.history.pushState({ path: newUrl }, "", newUrl)
	// 	mutate()
	// }, [search, currentPage])

	const handleSearch = (value) => setSearch(value)

	if (error) return <div>Error loading jobs: {error.message}</div>

	return (
		<LayoutAdmin>
			<JobModerationTable
				jobs={jobs}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={isLoading}
				totalJob={totalJob}
				onSearch={handleSearch}
				moderation={moderation} // ✅ passed as prop
			/>
			{!isLoading && (!jobs || jobs.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No jobs found</h3>
			)}
		</LayoutAdmin>
	)
}
