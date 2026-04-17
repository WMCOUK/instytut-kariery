import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import RecruiterTable from "@/components/admin/table/RecruiterTable"
import { TABLE_ROW_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

async function getRecruiters(userId, page) {
	const take = TABLE_ROW_PAGE
	const skip = TABLE_ROW_PAGE * (page - 1)
	try {
		const where = { userId }
		const [recruiters, totalRecruiter] = await Promise.all([
			prisma.recruiter.findMany({
				skip,
				take,
				include: { _count: { select: { job: true } }, jobIndustry: true },
				where,
			}),
			prisma.recruiter.count({ where }),
		])
		return {
			recruiters,
			totalPage: Math.ceil(totalRecruiter / take),
			totalRecruiter,
			currentPage: page,
		}
	} catch (error) {
		console.error("Error fetching recruiters:", error)
		return { recruiters: [], totalPage: 0, totalRecruiter: 0, currentPage: page }
	}
}

export default async function RecruiterPage({ searchParams }) {
	const user = await currentUserServer()
	if (!user) redirect("/signin")

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { recruiters, totalPage, totalRecruiter, currentPage } = await getRecruiters(user.id, page)

	return (
		<LayoutAdmin>
			<RecruiterTable
				recruiters={recruiters}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={false}
				totalRecruiter={totalRecruiter}
			/>
			{(!recruiters || recruiters.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No recruiters found</h3>
			)}
		</LayoutAdmin>
	)
}
