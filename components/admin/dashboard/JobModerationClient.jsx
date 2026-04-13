"use client"

import JobModerationTable from "@/components/admin/table/JobModerationTable"
import { fetchModerationJob } from "@/fetchSwr"
import { useState } from "react"

/**
 * Client wrapper for moderation-filtered job lists (approved/pending/rejected).
 * Uses SWR with fallbackData seeded from server-side initial fetch.
 *
 * @param {object} initialData - { jobs, totalPage, totalJob, currentPage } from server
 * @param {string} moderation - "approved" | "pending" | "rejected"
 * @param {number} initialPage
 * @param {string} initialSearch
 */
export default function JobModerationClient({ initialData, moderation, initialPage, initialSearch }) {
	const [search, setSearch] = useState(initialSearch || "")
	const [page] = useState(initialPage || 1)

	const { jobs, totalPage, totalJob, currentPage, isLoading, error } = fetchModerationJob(
		moderation,
		page,
		search,
		initialData
	)

	if (error) return <div>Error loading jobs: {error.message}</div>

	return (
		<>
			<JobModerationTable
				jobs={jobs}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={isLoading}
				totalJob={totalJob}
				onSearch={setSearch}
				moderation={moderation}
			/>
			{!isLoading && (!jobs || jobs.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No jobs found</h3>
			)}
		</>
	)
}
