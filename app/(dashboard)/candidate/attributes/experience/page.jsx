import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import CandidateExperienceTable from "@/components/admin/table/CandidateExperienceTable"
import { Button } from "@/components/ui/button"
import { ATTRIBUTE_PER_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

async function getExperiences(userId, page) {
	const take = ATTRIBUTE_PER_PAGE
	const skip = take * (page - 1)
	try {
		const [experiences, total] = await Promise.all([
			prisma.candidateExperience.findMany({ skip, take, where: { userId } }),
			prisma.candidateExperience.count({ where: { userId } }),
		])
		return { experiences, totalPage: Math.ceil(total / take) }
	} catch (error) {
		console.error("Error fetching experiences:", error)
		return { experiences: [], totalPage: 0 }
	}
}

export default async function ExperienceAttributes({ searchParams }) {
	const currentUser = await currentUserServer()
	if (!currentUser) redirect('/signin')

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { experiences, totalPage } = await getExperiences(currentUser.id, page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Experience</div>
				<Button asChild>
					<Link href="/candidate/attributes/experience/create">Create Experience</Link>
				</Button>
			</div>
			<CandidateExperienceTable data={experiences} totalPage={totalPage} page={page} />
		</LayoutAdmin>
	)
}
