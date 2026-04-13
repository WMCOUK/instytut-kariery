import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobAttributeTable from "@/components/admin/table/JobAttributeTable"
import { Button } from "@/components/ui/button"
import { getAttributeList } from "@/utils/fetchAttributes"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function PositionAttributes({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { items: positions, totalPage } = await getAttributeList('jobPosition', page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Position</div>
				<Button asChild>
					<Link href="/recruiter/attributes/position/create">Create Position</Link>
				</Button>
			</div>
			<JobAttributeTable data={positions} totalPage={totalPage} page={page} attributePath="position" />
		</LayoutAdmin>
	)
}
