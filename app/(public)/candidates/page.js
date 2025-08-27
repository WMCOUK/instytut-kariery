'use client'
import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import CandidateSection1 from '@/components/landing/sections/candidate/CandidateSection1'

// import data from "@/data/candidate.json"
// export const metadata = {
// 	title: 'Prexjob | Recruitment Nextjs Tailwindcss Listing Directory Template',
// }
export default function CandidatesPage() {
	return (
		<>
			<LayoutLanding1
				breadcrumbTitle={"Candidates"}
				breadcrumbSubTitle={"Work with the most talented candidates in the world"}
				breadcrumbAlign={"center"}
			// headerBg="transparent"
			>
				<CandidateSection1 />
			</LayoutLanding1>
		</>

	)
}
