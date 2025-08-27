import CandidateEducationEditForm from "@/components/admin/form/CandidateEducationEditForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getCandidateEducationDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const education = await getCandidateEducationDetails(slug)
	return {
		title: education?.title,
	}
}

export default async function AttributeEditDetails({ params }) {
	const { slug } = await params
	const education = await getCandidateEducationDetails(slug)
	// console.log(attribute)


	return (
		<LayoutAdmin>
			<CandidateEducationEditForm education={education} />
		</LayoutAdmin>
	)
}
