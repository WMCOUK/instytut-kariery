import CandidateSkillEditForm from "@/components/admin/form/CandidateSkillEditForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getCandidateSkillDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const skill = await getCandidateSkillDetails(slug)
	return {
		title: skill?.title,
	}
}

export default async function AttributeEditDetails({ params }) {
	const { slug } = await params
	const skill = await getCandidateSkillDetails(slug)
	console.log(skill)


	return (
		<LayoutAdmin>
			<CandidateSkillEditForm skill={skill} />
		</LayoutAdmin>
	)
}
