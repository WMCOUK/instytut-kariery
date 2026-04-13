import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import CandidateTable from "@/components/admin/table/CandidateTable"
import { TABLE_ROW_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"

export const dynamic = 'force-dynamic'

async function getCandidates(page) {
	const take = TABLE_ROW_PAGE
	const skip = TABLE_ROW_PAGE * (page - 1)
	try {
		const [candidates, totalCandidate] = await Promise.all([
			prisma.user.findMany({
				skip,
				take,
				where: { onboard: "CANDIDATE" },
				include: { candidate: true, personal: true },
			}),
			prisma.user.count({ where: { onboard: "CANDIDATE" } }),
		])
		return {
			candidates,
			totalPage: Math.ceil(totalCandidate / take),
			totalCandidate,
			currentPage: page,
		}
	} catch (error) {
		console.error("Error fetching candidates:", error)
		return { candidates: [], totalPage: 0, totalCandidate: 0, currentPage: page }
	}
}

export default async function CandidatePage({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { candidates, totalPage, totalCandidate, currentPage } = await getCandidates(page)

	return (
		<LayoutAdmin>
			<CandidateTable
				candidates={candidates}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={false}
				totalCandidate={totalCandidate}
			/>
			{(!candidates || candidates.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No candidates found</h3>
			)}
		</LayoutAdmin>
	)
}
