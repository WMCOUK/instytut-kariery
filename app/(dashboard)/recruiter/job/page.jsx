"use client"

import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobTable from "@/components/admin/table/JobTable"
import { Button } from "@/components/ui/button"
import { fetchAllJob, fetchMyJob } from "@/fetchSwr"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function JobPage() {
	const searchParams = useSearchParams()
	const page = Number.parseInt(searchParams.get("page") || "1")
	const initialSearch = searchParams.get("search") || ""
	const [search, setSearch] = useState(initialSearch)

	const { jobs, totalPage, totalJob, allJobCount, currentPage, error, mutate, isLoading } = fetchMyJob(
		page,
		search
	)

	// useEffect(() => {
	// 	const newUrl = `/recruiter/job?page=${currentPage}&search=${search}`
	// 	window.history.pushState({ path: newUrl }, '', newUrl)
	// 	mutate()
	// }, [search, currentPage, mutate])

	const handleSearch = (value) => {
		setSearch(value)
	}

	if (error) {
		return <div>Error loading jobs: {error.message}</div>
	}

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center mb-4">
				<Button asChild>
					<Link href="/recruiter/job/create">Create Job</Link>
				</Button>
			</div>
			<JobTable
				jobs={jobs}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={isLoading}
				totalJob={totalJob}
				onSearch={handleSearch}
			/>

			{!isLoading && (!jobs || jobs.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No jobs found</h3>
			)}
		</LayoutAdmin>
	)
}