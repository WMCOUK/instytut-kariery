"use client"

import { fetchTrendingJob } from "@/fetchSwr"
import SectionTitle1 from "../../elements/SectionTitle/SectionTitle1"
import TrendingJobCard1 from "../../elements/trending/TrendingJobCard1"

export default function TrendingJobSection1({ title = "Trending Jobs" }) {
	const { trendingJobs, isLoading, isError } = fetchTrendingJob()

	if (isLoading) return <div className="text-center py-8">Loading trending jobs...</div>
	if (isError) return <div className="text-center py-8 text-red-500">Failed to load trending jobs.</div>
	if (!trendingJobs.length) return <div className="text-center py-8">No trending jobs found.</div>

	return (
		<div className="container">
			<div className="mb-6">
				<SectionTitle1 title={title} className="mb-0" />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{trendingJobs.map((job, index) => (
					<TrendingJobCard1 key={index} item={job} />
				))}
			</div>
		</div>
	)
}
