import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobAttributeTable from "@/components/admin/table/JobAttributeTable"
import { Button } from "@/components/ui/button"
import { getAttributeList } from "@/utils/fetchAttributes"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function TypeAttributes({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { items: types, totalPage } = await getAttributeList('jobType', page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Type</div>
				<Button asChild>
					<Link href="/recruiter/job/attributes/type/create">Create Type</Link>
				</Button>
			</div>
			<JobAttributeTable data={types} totalPage={totalPage} page={page} attributePath="type" />
		</LayoutAdmin>
	)
}
