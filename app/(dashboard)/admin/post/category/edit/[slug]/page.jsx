import CategoryEditForm from "@/components/admin/form/CategoryEditForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getCategoryDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const category = await getCategoryDetails(slug)
	return {
		title: category?.title,
	}
}

export default async function CategoryEditDetails({ params }) {
	const { slug } = await params
	const category = await getCategoryDetails(slug)
	// console.log(category)


	return (
		<LayoutAdmin>
			<CategoryEditForm category={category} />
		</LayoutAdmin>
	)
}
