"use client"

import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobStatusTable from "@/components/admin/table/JobStatusTable"
import { fetchStatusJob } from "@/fetchSwr"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function JobDraftPage() {
	const status = "draft" // ✅ status defined here

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
	} = fetchStatusJob(status, page, search) // ✅ used in fetch call

	// useEffect(() => {
	// 	const newUrl = `/recruiter/job/${status}?page=${currentPage}&search=${search}` // ✅ used in URL
	// 	window.history.pushState({ path: newUrl }, "", newUrl)
	// 	mutate()
	// }, [search, currentPage])

	const handleSearch = (value) => setSearch(value)

	if (error) return <div>Error loading jobs: {error.message}</div>

	return (
		<LayoutAdmin>
			<JobStatusTable
				jobs={jobs}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={isLoading}
				totalJob={totalJob}
				onSearch={handleSearch}
				status={status} // ✅ passed as prop
			/>
			{!isLoading && (!jobs || jobs.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No jobs found</h3>
			)}
		</LayoutAdmin>
	)
}
