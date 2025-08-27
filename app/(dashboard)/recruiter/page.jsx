'use client'
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import RecruiterTable from "@/components/admin/table/RecruiterTable"
import { Button } from "@/components/ui/button"
import { fetchRecruiter } from "@/fetchSwr"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
export default function RecruiterPage() {
	const searchParams = useSearchParams()
	const page = Number.parseInt(searchParams.get("page") || "1")
	const { recruiters, totalPage, currentPage, totalRecruiter, isLoading } = fetchRecruiter(page)



	return (
		<LayoutAdmin>
			<RecruiterTable recruiters={recruiters} totalPage={totalPage} page={currentPage.toString()} isLoading={isLoading} totalRecruiter={totalRecruiter} />
			{!isLoading && (!recruiters || recruiters.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No recruiters found</h3>
			)}

		</LayoutAdmin>
	)
}
