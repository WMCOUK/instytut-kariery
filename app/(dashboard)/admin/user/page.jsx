import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import UserTable from "@/components/admin/table/UserTable"
import { POST_PER_PAGE } from "@/utils"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

async function getUsers(page) {
	const take = POST_PER_PAGE
	const skip = POST_PER_PAGE * (page - 1)
	try {
		const [users, totalUser] = await Promise.all([
			prisma.user.findMany({
				skip,
				take,
				orderBy: { createdAt: "desc" },
				include: {
					post: true,
					recruiter: true,
					jobLocation: true,
					jobIndustry: true,
					jobPosition: true,
					jobExperience: true,
					jobWorkMode: true,
					jobType: true,
					job: true,
					rating: true,
					personal: true,
					preference: true,
					candidate: true,
					candidateCv: true,
					candidateExperience: true,
					candidateEducation: true,
					candidateSkill: true,
					application: true,
				},
			}),
			prisma.user.count(),
		])
		return {
			users,
			totalPage: Math.ceil(totalUser / take),
			totalUser,
			currentPage: page,
		}
	} catch (error) {
		console.error("Error fetching users:", error)
		return { users: [], totalPage: 0, totalUser: 0, currentPage: page }
	}
}

export default async function UserListPage({ searchParams }) {
	const user = await currentUserServer()
	if (!user) redirect("/signin")
	if (user.isRole !== "ADMIN") redirect("/unauthorized")

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { users, totalPage, totalUser, currentPage } = await getUsers(page)

	return (
		<LayoutAdmin>
			<UserTable
				data={users}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={false}
				totalUser={totalUser}
			/>
		</LayoutAdmin>
	)
}
