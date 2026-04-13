import MyJobListClient from "@/components/admin/dashboard/MyJobListClient"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Button } from "@/components/ui/button"
import currentUserServer from "@/utils/currentUserServer"
import { getMyJobs } from "@/utils/fetchJobs"
import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function RecruiterJobPage({ searchParams }) {
	const user = await currentUserServer()
	if (!user) redirect('/signin')

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const search = params?.search || ""
	const initialData = await getMyJobs({ userId: user.id, page, search })

	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center mb-4">
				<Button asChild>
					<Link href="/recruiter/job/create">Create Job</Link>
				</Button>
			</div>
			<MyJobListClient
				initialData={initialData}
				initialPage={page}
				initialSearch={search}
			/>
		</LayoutAdmin>
	)
}
