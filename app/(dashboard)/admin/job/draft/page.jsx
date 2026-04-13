import JobStatusClient from "@/components/admin/dashboard/JobStatusClient"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import currentUserServer from "@/utils/currentUserServer"
import { getJobsByStatus } from "@/utils/fetchJobs"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function JobDraftPage({ searchParams }) {
	const user = await currentUserServer()
	if (!user) redirect('/signin')

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const search = params?.search || ""
	const initialData = await getJobsByStatus({ status: "draft", userId: user.id, page, search })

	return (
		<LayoutAdmin>
			<JobStatusClient
				initialData={initialData}
				status="draft"
				initialPage={page}
				initialSearch={search}
			/>
		</LayoutAdmin>
	)
}
