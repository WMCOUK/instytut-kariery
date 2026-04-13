import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobAttributeTable from "@/components/admin/table/JobAttributeTable"
import { Button } from "@/components/ui/button"
import { getAttributeList } from "@/utils/fetchAttributes"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function ExperienceAttributes({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { items: experiences, totalPage } = await getAttributeList('jobExperience', page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Experience</div>
				<Button asChild>
					<Link href="/recruiter/job/attributes/experience/create">Create Experience</Link>
				</Button>
			</div>
			<JobAttributeTable data={experiences} totalPage={totalPage} page={page} attributePath="experience" />
		</LayoutAdmin>
	)
}
