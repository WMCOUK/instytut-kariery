import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import CandidateEducationTable from "@/components/admin/table/CandidateEducationTable"
import { Button } from "@/components/ui/button"
import { ATTRIBUTE_PER_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

async function getEducations(userId, page) {
	const take = ATTRIBUTE_PER_PAGE
	const skip = take * (page - 1)
	try {
		const [educations, total] = await Promise.all([
			prisma.candidateEducation.findMany({ skip, take, where: { userId } }),
			prisma.candidateEducation.count({ where: { userId } }),
		])
		return { educations, totalPage: Math.ceil(total / take) }
	} catch (error) {
		console.error("Error fetching educations:", error)
		return { educations: [], totalPage: 0 }
	}
}

export default async function EducationAttributes({ searchParams }) {
	const currentUser = await currentUserServer()
	if (!currentUser) redirect('/signin')

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { educations, totalPage } = await getEducations(currentUser.id, page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Education</div>
				<Button asChild>
					<Link href="/candidate/attributes/education/create">Create Education</Link>
				</Button>
			</div>
			<CandidateEducationTable data={educations} totalPage={totalPage} page={page} />
		</LayoutAdmin>
	)
}
