import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobAttributeTable from "@/components/admin/table/JobAttributeTable"
import { Button } from "@/components/ui/button"
import { getAttributeList } from "@/utils/fetchAttributes"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function IndustryAttributes({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { items: industries, totalPage } = await getAttributeList('jobIndustry', page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Industry</div>
				<Button asChild>
					<Link href="/recruiter/attributes/industry/create">Create Industry</Link>
				</Button>
			</div>
			<JobAttributeTable data={industries} totalPage={totalPage} page={page} attributePath="industry" />
		</LayoutAdmin>
	)
}
