import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card } from "@/components/ui/card"
import { getCategoryDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const category = await getCategoryDetails(slug)
	return {
		title: category?.title,
	}
}

export default async function CategoryDetails({ params }) {
	const { slug } = await params
	const category = await getCategoryDetails(slug)
	// console.log(category)


	return (
		<LayoutAdmin>
			<Card className="w-full">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3 ">
						<img className="w-12 h-12 rounded-full" src={category?.img} alt="" />
						<h1 className="text-2xl font-bold">{category?.title}</h1>
					</div>
				</div>
			</Card>
		</LayoutAdmin>
	)
}
