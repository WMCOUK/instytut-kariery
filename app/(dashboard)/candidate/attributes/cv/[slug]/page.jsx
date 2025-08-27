import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card } from "@/components/ui/card"
import { getCandidateCvDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const cv = await getCandidateCvDetails(slug)
	return {
		title: cv?.title,
	}
}

export default async function ExperienceDetails({ params }) {
	const { slug } = await params
	const cv = await getCandidateCvDetails(slug)
	// console.log(experience)


	return (
		<LayoutAdmin>
			<Card className="w-full">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3 ">
						{/* <img className="w-12 h-12 rounded-full" src={cv?.image} alt="" /> */}
						<h1 className="text-2xl font-bold">{cv?.title}</h1>
						<p>{cv?.description}</p>
						<a href={cv?.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
							View Uploaded PDF
						</a>
					</div>
				</div>
			</Card>
		</LayoutAdmin>
	)
}
