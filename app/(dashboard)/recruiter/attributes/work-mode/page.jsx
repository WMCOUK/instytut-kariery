
'use client'
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobAttributeTable from "@/components/admin/table/JobAttributeTable"
import { Button } from "@/components/ui/button"
import { fetchWorkmode } from "@/fetchSwr"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function WorkModeAttributes() {
	const searchParams = useSearchParams()
	const page = parseInt(searchParams.page) || 1
	const { workmodes, totalPage, mutate, isLoading } = fetchWorkmode(page)
	console.log(workmodes)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Industry</div>
				<Button asChild>
					<Link href="/recruiter/attributes/industry/create">Create Industry</Link>
				</Button>
			</div>
			<JobAttributeTable data={workmodes} totalPage={totalPage} page={page} attributePath="industry" />
		</LayoutAdmin>
	)
}
