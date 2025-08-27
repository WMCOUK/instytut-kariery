"use client"
import AppliedJob from "@/components/admin/dashboard/candidate/AppliedJob"
// import JobGrid1 from "@/components/admin/elements/job/JobGrid1"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"

export default function FavouriteJobPage() {

	return (
		<LayoutAdmin>

			<div className="container">
					<AppliedJob />
			</div>
		</LayoutAdmin>
	)
}

