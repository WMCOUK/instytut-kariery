import CandidateExperienceEditForm from "@/components/admin/form/CandidateExperienceEditForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getCandidateExperienceDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const experience = await getCandidateExperienceDetails(slug)
	return {
		title: experience?.title,
	}
}

export default async function AttributeEditDetails({ params }) {
	const { slug } = await params
	const experience = await getCandidateExperienceDetails(slug)
	// console.log(attribute)


	return (
		<LayoutAdmin>
			<CandidateExperienceEditForm experience={experience} />
		</LayoutAdmin>
	)
}
