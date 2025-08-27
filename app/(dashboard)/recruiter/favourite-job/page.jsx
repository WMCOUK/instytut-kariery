"use client"
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
				<div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-2 gap-5 mt-5">
					{favouriteJobs?.map((item, i) =>
						// <JobGrid1 item={item?.job} key={i} />
						<>
							{item?.job?.title}
						</>
					)}
				</div>
			</div>

			{!isLoading && (!favouriteJobs || favouriteJobs.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No favourite jobs found</h3>
			)}
		</LayoutAdmin>
	)
}

