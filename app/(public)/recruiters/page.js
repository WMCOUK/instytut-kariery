'use client'

import LayoutLanding1 from "@/components/landing/layout/landing/LayoutLanding1"
import RecruterSection1 from "@/components/landing/sections/recruiter/RecruterSection1"
// import RecruterGrid1 from "@/components/landing/sections/RecruterGrid1"

export default function RecruiterPage() {
	// const searchParams = useSearchParams()
	// const page = parseInt(searchParams?.get('page') || '1')
	// const { allRecruiters, totalPage, isLoading } = fetchAllRecruiter(page)

	return (
		<LayoutLanding1
			breadcrumbTitle={"Recruter"}
			breadcrumbSubTitle={"Work for the best companies in the world"}
		>

			<RecruterSection1 />
		</LayoutLanding1>
	)
}
