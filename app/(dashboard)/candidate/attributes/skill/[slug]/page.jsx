import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card } from "@/components/ui/card"
import { getCandidateSkillDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const skill = await getCandidateSkillDetails(slug)
	return {
		title: skill?.title,
	}
}

export default async function ExperienceDetails({ params }) {
	const { slug } = await params
	const skill = await getCandidateSkillDetails(slug)
	// console.log(experience)


	return (
		<LayoutAdmin>
			<Card className="w-full">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3 ">
						{/* <img className="w-12 h-12 rounded-full" src={skill?.image} alt="" /> */}
						<h1 className="text-2xl font-bold">{skill?.title}</h1>
						<p>{skill?.description}</p>
					</div>
				</div>
			</Card>
		</LayoutAdmin>
	)
}
