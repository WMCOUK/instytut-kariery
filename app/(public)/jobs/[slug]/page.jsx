import Layout from "@/components/landing/layout/landing/LayoutLanding1"
import JobDetails1 from "@/components/landing/sections/job/JobDetails1"
import { getJobDetails } from "@/utils/fetchServer"

// ISR: rebuild every 60 seconds
export const revalidate = 60

// Server-side metadata
export async function generateMetadata({ params }) {
	const { slug } = params  // no await needed
	const job = await getJobDetails(slug)
	return { title: job?.title || "Job Details" }
}

export default async function JobDetailsPage({ params }) {
	const { slug } = params
	const job = await getJobDetails(slug) // server fetch for fast LCP

	return (
		<Layout>
			<JobDetails1 job={job} />
		</Layout>
	)
}
