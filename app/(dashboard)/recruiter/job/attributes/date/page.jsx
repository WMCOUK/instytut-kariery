import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobAttributeTable from "@/components/admin/table/JobAttributeTable"
import { Button } from "@/components/ui/button"
import { getAttributeList } from "@/utils/fetchAttributes"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function DatePostedAttributes({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { items: dates, totalPage } = await getAttributeList('jobDate', page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Date Posted</div>
				<Button asChild>
					<Link href="/recruiter/job/attributes/date/create">Create Date</Link>
				</Button>
			</div>
			<JobAttributeTable data={dates} totalPage={totalPage} page={page} attributePath="date" />
		</LayoutAdmin>
	)
}
