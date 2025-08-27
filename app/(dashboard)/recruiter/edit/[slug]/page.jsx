// 'use client'

import RecruiterEditForm from "@/components/admin/form/RecruiterEditForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getRecruiterDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const recruiter = await getRecruiterDetails(slug)
	return {
		title: recruiter?.title
	}
}


export default async function EditRecruiterPage({ params }) {
	const { slug } = await params
	const recruiter = await getRecruiterDetails(slug)
	// console.log(recruiter)
	return (
		<>

			<LayoutAdmin>
				<RecruiterEditForm recruiter={recruiter} />
			</LayoutAdmin>
		</>
	)
}
