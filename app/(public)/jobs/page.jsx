import LayoutLanding1 from "@/components/landing/layout/landing/LayoutLanding1"
import JobSection2 from "@/components/landing/sections/job/JobSection2"
import NewsletterSection1 from "@/components/landing/sections/newsletter/NewsletterSection1"
import TrendingJobSection1 from "@/components/landing/sections/trending/TrendingJobSection1"
import prisma from "@/utils/prismadb"
import { getTranslations } from "next-intl/server"

export const metadata = {
	title: "Oferty pracy | Instytut Kariery",
	description: "Przeglądaj oferty pracy z różnych branż. Znajdź pracę dopasowaną do Twoich umiejętności i doświadczenia.",
}

export const dynamic = 'force-dynamic'

async function getInitialJobs() {
	const pageSize = 10
	try {
		const [jobs, totalJob] = await Promise.all([
			prisma.job.findMany({
				take: pageSize,
				skip: 0,
				orderBy: { createdAt: "desc" },
				include: {
					recruiter: true,
					jobType: true,
					jobExperience: true,
					jobWorkMode: true,
					jobLocation: true,
					jobIndustry: true,
					jobPosition: true,
				},
			}),
			prisma.job.count(),
		])
		return {
			jobs,
			totalPage: Math.ceil(totalJob / pageSize),
		}
	} catch (error) {
		console.error("Error fetching initial jobs:", error)
		return { jobs: [], totalPage: 0 }
	}
}

export default async function Jobs() {
	const t = await getTranslations('breadcrumb.pages.jobs')
	const breadcrumbItems = [{ label: t('title'), href: "/jobs" }]
	const initialData = await getInitialJobs()

	return (
		<LayoutLanding1
			breadcrumbTitle={t('title')}
			breadcrumbSubTitle={t('subtitle')}
			breadcrumbItems={breadcrumbItems}
		>
			<JobSection2 initialData={initialData} />
			<TrendingJobSection1 />
			<NewsletterSection1 />
		</LayoutLanding1>
	)
}
