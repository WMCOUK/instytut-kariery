import JobAttributeEditForm from "@/components/admin/form/JobAttributeEditForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getJobAttributeDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const attribute = await getJobAttributeDetails(slug, "position")
	return {
		title: attribute?.title,
	}
}

export default async function AttributeEditDetails({ params }) {
	const { slug } = await params
	const attribute = await getJobAttributeDetails(slug, "position")
	// console.log(attribute)


	return (
		<LayoutAdmin>
			<JobAttributeEditForm attribute={attribute} attPath="position" />
		</LayoutAdmin>
	)
}
