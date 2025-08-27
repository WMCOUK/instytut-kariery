import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card } from "@/components/ui/card"
import { getCandidateExperienceDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const attribute = await getCandidateExperienceDetails(slug)
	return {
		title: attribute?.title,
	}
}

export default async function ExperienceDetails({ params }) {
	const { slug } = await params
	const attribute = await getCandidateExperienceDetails(slug)
	// console.log(experience)


	return (
		<LayoutAdmin>
			<Card className="w-full">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3 ">
						{/* <img className="w-12 h-12 rounded-full" src={attribute?.image} alt="" /> */}
						<h1 className="text-2xl font-bold">{attribute?.title}</h1>
						<p>{attribute?.description}</p>
					</div>
				</div>
			</Card>
		</LayoutAdmin>
	)
}
