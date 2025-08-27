'use client'
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import CandidateTable from "@/components/admin/table/CandidateTable"
import { fetchAllCandidate } from "@/fetchSwr"
import { useSearchParams } from "next/navigation"
export default function CandidatePage() {
	const searchParams = useSearchParams()
	const page = Number.parseInt(searchParams.get("page") || "1")
	const { candidates, totalPage, currentPage, totalCandidate, isLoading } = fetchAllCandidate(page)

	// console.log(candidates);




	return (
		<LayoutAdmin>
			<CandidateTable candidates={candidates} totalPage={totalPage} page={currentPage} isLoading={isLoading} totalCandidate={totalCandidate} />
			{!isLoading && (!candidates || candidates.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No candidates found</h3>
			)}

		</LayoutAdmin>
	)
}
