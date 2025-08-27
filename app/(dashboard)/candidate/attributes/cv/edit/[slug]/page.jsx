import CandidateCvEditForm from "@/components/admin/form/CandidateCvEditForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getCandidateCvDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const cv = await getCandidateCvDetails(slug)
	return {
		title: cv?.title,
	}
}

export default async function AttributeEditDetails({ params }) {
	const { slug } = await params
	const cv = await getCandidateCvDetails(slug)
	console.log(cv)


	return (
		<LayoutAdmin>
			<CandidateCvEditForm cv={cv} />
		</LayoutAdmin>
	)
}
