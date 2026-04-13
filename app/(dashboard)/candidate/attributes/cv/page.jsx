import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import CandidateCvTable from "@/components/admin/table/CandidateCvTable"
import { Button } from "@/components/ui/button"
import { ATTRIBUTE_PER_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"
import Link from "next/link"

export const dynamic = 'force-dynamic'

async function getCvs(page) {
	const take = ATTRIBUTE_PER_PAGE
	const skip = take * (page - 1)
	try {
		const [cvs, total] = await Promise.all([
			prisma.candidateCv.findMany({ skip, take }),
			prisma.candidateCv.count(),
		])
		return { cvs, totalPage: Math.ceil(total / take) }
	} catch (error) {
		console.error("Error fetching CVs:", error)
		return { cvs: [], totalPage: 0 }
	}
}

export default async function CvAttributes({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { cvs, totalPage } = await getCvs(page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Cv</div>
				<Button asChild>
					<Link href="/candidate/attributes/cv/create">Create Cv</Link>
				</Button>
			</div>
			<CandidateCvTable data={cvs} totalPage={totalPage} page={page} />
		</LayoutAdmin>
	)
}
