import FavouritejobCard from "@/components/admin/elements/FavouritejobCard"
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
		const [favouriteJobs, totalFavouriteJob] = await Promise.all([
			prisma.favouriteJob.findMany({
				where: { userId },
				skip,
				take,
				include: { job: true },
			}),
			prisma.favouriteJob.count({ where: { userId } }),
		])
		return {
			favouriteJobs,
			totalFavouriteJob,
			totalPage: Math.ceil(totalFavouriteJob / take),
		}
	} catch (error) {
		console.error("Error fetching favourite jobs:", error)
		return { favouriteJobs: [], totalFavouriteJob: 0, totalPage: 0 }
	}
}

export default async function FavouriteJobPage({ searchParams }) {
	const session = await getAuthSession()
	if (!session?.user) redirect("/signin")

	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { favouriteJobs } = await getFavourites(session.user.id, page)

	return (
		<LayoutAdmin>
			<div className="container">
				<div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 mt-5">
					{favouriteJobs?.map((item, i) => (
						<FavouritejobCard job={item?.job} key={i} />
					))}
				</div>
			</div>

			{(!favouriteJobs || favouriteJobs.length === 0) && (
				<div className="flex flex-col items-center justify-center py-16 px-8 border border-dashed border-muted rounded-md bg-muted/30 text-muted-foreground select-none">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-16 w-16 mb-4 text-muted-foreground"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1.5}
						aria-hidden="true"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2-2 4 4m5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<h3 className="text-lg font-semibold mb-2">No Favourite Jobs Found</h3>
					<p className="text-center max-w-xs text-sm text-muted-foreground">
						You haven&apos;t added any jobs to your favourites yet. Start exploring and add jobs you like!
					</p>
				</div>
			)}
		</LayoutAdmin>
	)
}
