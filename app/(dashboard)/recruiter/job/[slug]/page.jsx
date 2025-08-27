// "use client"

import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobDetails1 from "@/components/landing/sections/job/JobDetails1"
import { getJobDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const job = await getJobDetails(slug)
	return {
		title: job?.title,
	}
}
export default async function JobDetails({ params }) {
	const { slug } = await params
	const job = await getJobDetails(slug)

	return (
		<LayoutAdmin>
			<JobDetails1 job={job} />
		</LayoutAdmin>
	)
}

