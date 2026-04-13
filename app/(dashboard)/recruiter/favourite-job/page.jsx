import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { ATTRIBUTE_PER_PAGE } from "@/utils"
import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

async function getFavourites(userId, page) {
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {
		const [favouriteJobs] = await Promise.all([
			prisma.favouriteJob.findMany({
				where: { userId },
				skip,
				take,
				include: { job: true },
			}),
		])
		return { favouriteJobs }
	} catch (error) {
		console.error("Error fetching favourite jobs:", error)
		return { favouriteJobs: [] }
	}
}

export default async function FavouriteJobPage({ searchParams }) {
	const session = await getAuthSession()
	if (!session?.user) redirect('/signin')

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { favouriteJobs } = await getFavourites(session.user.id, page)

	return (
		<LayoutAdmin>
			<div className="container">
				<div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-2 gap-5 mt-5">
					{favouriteJobs?.map((item, i) => (
						<div key={i}>{item?.job?.title}</div>
					))}
				</div>
			</div>

			{(!favouriteJobs || favouriteJobs.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No favourite jobs found</h3>
			)}
		</LayoutAdmin>
	)
}
