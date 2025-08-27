"use client"
import FavouritejobCard from "@/components/admin/elements/FavouritejobCard"
// import JobGrid1 from "@/components/admin/elements/job/JobGrid1"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { fetchFavouriteJob } from "@/fetchSwr"
import { useSearchParams } from "next/navigation"

export default function FavouriteJobPage() {
	const searchParams = useSearchParams()
	const page = Number.parseInt(searchParams.get("page") || "1")
	const { favouriteJobs, totalPage, totalFavouriteJob, error, mutate, isLoading } = fetchFavouriteJob(page)

	console.log(favouriteJobs)

	return (
		<LayoutAdmin>

			<div className="container">
				<div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 mt-5">
					{favouriteJobs?.map((item, i) =>
						<FavouritejobCard job={item?.job} key={i} />
						// <div key={i} className="bg-card shadow-md rounded-lg p-5">
						// 	{item?.job?.title}
						// </div>
					)}
				</div>
			</div>

			{!isLoading && (!favouriteJobs || favouriteJobs.length === 0) && (
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
						You haven’t added any jobs to your favourites yet. Start exploring and add jobs you like!
					</p>
				</div>
			)}
		</LayoutAdmin>
	)
}

