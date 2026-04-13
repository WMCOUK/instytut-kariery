import LayoutLanding1 from "@/components/landing/layout/landing/LayoutLanding1"
import RecruterSection1 from "@/components/landing/sections/recruiter/RecruterSection1"
import prisma from "@/utils/prismadb"
import { getTranslations } from "next-intl/server"

export const metadata = {
	title: "Rekruterzy | Instytut Kariery",
	description: "Poznaj firmy i rekruterów działających na polskim rynku pracy. Znajdź idealnego pracodawcę dla siebie.",
}

export const dynamic = 'force-dynamic'

async function getInitialRecruiters() {
	const pageSize = 10
	try {
		const [recruiters, totalRecruiter] = await Promise.all([
			prisma.recruiter.findMany({
				take: pageSize,
				skip: 0,
				orderBy: { createdAt: "desc" },
				include: { job: true },
			}),
			prisma.recruiter.count(),
		])
		return {
			recruiters,
			totalPage: Math.ceil(totalRecruiter / pageSize),
		}
	} catch (error) {
		console.error("Error fetching initial recruiters:", error)
		return { recruiters: [], totalPage: 0 }
	}
}

export default async function RecruiterPage() {
	const t = await getTranslations('breadcrumb.pages.recruiters')
	const initialData = await getInitialRecruiters()

	return (
		<LayoutLanding1
			breadcrumbTitle={t('title')}
			breadcrumbSubTitle={t('subtitle')}
		>
			<RecruterSection1 initialData={initialData} />
		</LayoutLanding1>
	)
}
