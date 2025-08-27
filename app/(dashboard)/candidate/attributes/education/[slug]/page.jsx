import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card } from "@/components/ui/card"
import { getCandidateEducationDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const education = await getCandidateEducationDetails(slug)
	return {
		title: education?.title,
	}
}

export default async function ExperienceDetails({ params }) {
	const { slug } = await params
	const education = await getCandidateEducationDetails(slug)
	// console.log(experience)


	return (
		<LayoutAdmin>
			<Card className="w-full">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3 ">
						{/* <img className="w-12 h-12 rounded-full" src={education?.image} alt="" /> */}
						<h1 className="text-2xl font-bold">{education?.title}</h1>
						<p>{education?.description}</p>
					</div>
				</div>
			</Card>
		</LayoutAdmin>
	)
}
