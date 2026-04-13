import AppliedJob from "@/components/admin/dashboard/candidate/AppliedJob"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import currentUserServer from "@/utils/currentUserServer"
import prisma from "@/utils/prismadb"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

async function getApplications(userId) {
	try {
		const applications = await prisma.application.findMany({
			where: { userId },
			orderBy: { appliedAt: "desc" },
			include: { user: true, job: true, recruiter: true },
		})
		return applications
	} catch (error) {
		console.error("Error fetching applications:", error)
		return []
	}
}

export default async function AppliedJobPage() {
	const currentUser = await currentUserServer()
	if (!currentUser) redirect('/signin')

	const applications = await getApplications(currentUser.id)

	return (
		<LayoutAdmin>
			<div className="container">
				<AppliedJob initialApplications={applications} />
			</div>
		</LayoutAdmin>
	)
}
