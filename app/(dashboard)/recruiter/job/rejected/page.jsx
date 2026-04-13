import JobModerationClient from "@/components/admin/dashboard/JobModerationClient"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import currentUserServer from "@/utils/currentUserServer"
import { getJobsByModeration } from "@/utils/fetchJobs"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function JobRejectedPage({ searchParams }) {
	const user = await currentUserServer()
	if (!user) redirect('/signin')

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const search = params?.search || ""
	const initialData = await getJobsByModeration({ moderation: "rejected", userId: user.id, page, search })

	return (
		<LayoutAdmin>
			<JobModerationClient
				initialData={initialData}
				moderation="rejected"
				initialPage={page}
				initialSearch={search}
			/>
		</LayoutAdmin>
	)
}
