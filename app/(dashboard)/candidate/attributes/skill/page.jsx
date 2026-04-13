import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import CandidateSkillTable from "@/components/admin/table/CandidateSkillTable"
import { Button } from "@/components/ui/button"
import { ATTRIBUTE_PER_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

async function getSkills(userId, page) {
	const take = ATTRIBUTE_PER_PAGE
	const skip = take * (page - 1)
	try {
		const [skills, total] = await Promise.all([
			prisma.candidateSkill.findMany({ skip, take, where: { userId } }),
			prisma.candidateSkill.count({ where: { userId } }),
		])
		return { skills, totalPage: Math.ceil(total / take) }
	} catch (error) {
		console.error("Error fetching skills:", error)
		return { skills: [], totalPage: 0 }
	}
}

export default async function SkillAttributes({ searchParams }) {
	const currentUser = await currentUserServer()
	if (!currentUser) redirect('/signin')

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { skills, totalPage } = await getSkills(currentUser.id, page)

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Skill</div>
				<Button asChild>
					<Link href="/candidate/attributes/skill/create">Create Skill</Link>
				</Button>
			</div>
			<CandidateSkillTable data={skills} totalPage={totalPage} page={page} />
		</LayoutAdmin>
	)
}
