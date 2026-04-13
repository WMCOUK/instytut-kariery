import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobAttributeTable from "@/components/admin/table/JobAttributeTable"
import { Button } from "@/components/ui/button"
import { getAttributeList } from "@/utils/fetchAttributes"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function LocationAttributes({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { items: locations, totalPage } = await getAttributeList('jobLocation', page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Location</div>
				<Button asChild>
					<Link href="/recruiter/attributes/location/create">Create Location</Link>
				</Button>
			</div>
			<JobAttributeTable data={locations} totalPage={totalPage} page={page} attributePath="location" />
		</LayoutAdmin>
	)
}
