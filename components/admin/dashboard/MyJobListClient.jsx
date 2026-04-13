"use client"

import JobTable from "@/components/admin/table/JobTable"
import { fetchMyJob } from "@/fetchSwr"
import { useState } from "react"

/**
 * Client wrapper for the recruiter's own job list (uses fetchMyJob).
 * Uses SWR with fallbackData seeded from server-side initial fetch.
 */
export default function MyJobListClient({ initialData, initialPage, initialSearch }) {
	const [search, setSearch] = useState(initialSearch || "")
	const [page] = useState(initialPage || 1)

	const { jobs, totalPage, totalJob, currentPage, isLoading, error } = fetchMyJob(
		page,
		search,
		initialData
	)

	if (error) return <div>Error loading jobs: {error.message}</div>

	return (
		<>
			<JobTable
				jobs={jobs}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={isLoading}
				totalJob={totalJob}
				onSearch={setSearch}
			/>
			{!isLoading && (!jobs || jobs.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No jobs found</h3>
			)}
		</>
	)
}
