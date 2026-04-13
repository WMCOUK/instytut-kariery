import JobAllListClient from "@/components/admin/dashboard/JobAllListClient"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getAllJobs } from "@/utils/fetchJobs"

export const dynamic = 'force-dynamic'

export default async function JobPage({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const search = params?.search || ""
	const initialData = await getAllJobs({ page, search })

	return (
		<LayoutAdmin>
			<JobAllListClient
				initialData={initialData}
				initialPage={page}
				initialSearch={search}
			/>
		</LayoutAdmin>
	)
}
