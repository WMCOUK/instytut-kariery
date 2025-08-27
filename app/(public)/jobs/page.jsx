import LayoutLanding1 from "@/components/landing/layout/landing/LayoutLanding1"
import JobSection2 from "@/components/landing/sections/job/JobSection2"
import NewsletterSection1 from "@/components/landing/sections/newsletter/NewsletterSection1"
import TrendingJobSection1 from "@/components/landing/sections/trending/TrendingJobSection1"

export default function Jobs() {
	// Define breadcrumb items for better navigation
	const breadcrumbItems = [{ label: "Jobs", href: "/jobs" }]

	return (
		<LayoutLanding1
			breadcrumbTitle="Find Jobs"
			breadcrumbSubTitle="Search your career opportunity through 12,800 jobs"
			breadcrumbItems={breadcrumbItems}
		>
			<JobSection2 />
			<TrendingJobSection1 />
			<NewsletterSection1 />
		</LayoutLanding1>
	)
}

