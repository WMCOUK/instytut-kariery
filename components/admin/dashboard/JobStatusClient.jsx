"use client"

import JobStatusTable from "@/components/admin/table/JobStatusTable"
import { fetchStatusJob } from "@/fetchSwr"
import { useState } from "react"

/**
 * Client wrapper for status-filtered job lists (closed/draft/published).
 * Uses SWR with fallbackData seeded from server-side initial fetch.
 *
 * @param {object} initialData - { jobs, totalPage, totalJob, currentPage } from server
 * @param {string} status - "closed" | "draft" | "published"
 * @param {number} initialPage
 * @param {string} initialSearch
 */
export default function JobStatusClient({ initialData, status, initialPage, initialSearch }) {
	const [search, setSearch] = useState(initialSearch || "")
	const [page] = useState(initialPage || 1)

	const { jobs, totalPage, totalJob, currentPage, isLoading, error } = fetchStatusJob(
		status,
		page,
		search,
		initialData
	)

	if (error) return <div>Error loading jobs: {error.message}</div>

	return (
		<>
			<JobStatusTable
				jobs={jobs}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={isLoading}
				totalJob={totalJob}
				onSearch={setSearch}
				status={status}
			/>
			{!isLoading && (!jobs || jobs.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No jobs found</h3>
			)}
		</>
	)
}
