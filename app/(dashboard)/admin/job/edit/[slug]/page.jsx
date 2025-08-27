// 'use client'

import JobEditForm from "@/components/admin/form/JobEditForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getJobDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const job = await getJobDetails(slug)
	return {
		title: job?.title
	}
}


export default async function EditJobPage({ params }) {
	const { slug } = await params
	const job = await getJobDetails(slug)
	// console.log(job)
	return (
		<>

			<LayoutAdmin>
				<JobEditForm job={job} />
			</LayoutAdmin>
		</>
	)
}
