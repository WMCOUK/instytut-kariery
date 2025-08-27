
'use client'
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobAttributeTable from "@/components/admin/table/JobAttributeTable"
import { Button } from "@/components/ui/button"
import { fetchDate } from "@/fetchSwr"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function DatePostedAttributes() {
	const searchParams = useSearchParams()
	const page = parseInt(searchParams.page) || 1
	const { dates, totalPage, mutate, isLoading } = fetchDate(page)
	// console.log(totalPage)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Industry</div>
				<Button asChild>
					<Link href="/recruiter/attributes/date/create">Create Date</Link>
				</Button>
			</div>
			<JobAttributeTable data={dates} totalPage={totalPage} page={page} attributePath="date" />
		</LayoutAdmin>
	)
}
