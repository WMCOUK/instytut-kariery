import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import CandidateSection1 from '@/components/landing/sections/candidate/CandidateSection1'
import prisma from '@/utils/prismadb'
import { getTranslations } from 'next-intl/server'

export const metadata = {
	title: "Kandydaci | Instytut Kariery",
	description: "Przeglądaj profile utalentowanych kandydatów. Znajdź najlepszych specjalistów do swojej firmy.",
}

export const dynamic = 'force-dynamic'

async function getInitialCandidates() {
	const pageSize = 10
	try {
		const [candidates, totalCandidate] = await Promise.all([
			prisma.user.findMany({
				take: pageSize,
				skip: 0,
				where: { onboard: "CANDIDATE" },
				orderBy: { createdAt: "desc" },
				include: { candidate: true, personal: true },
			}),
			prisma.user.count({ where: { onboard: "CANDIDATE" } }),
		])
		return {
			candidates,
			totalPage: Math.ceil(totalCandidate / pageSize),
		}
	} catch (error) {
		console.error("Error fetching initial candidates:", error)
		return { candidates: [], totalPage: 0 }
	}
}

export default async function CandidatesPage() {
	const t = await getTranslations('breadcrumb.pages.candidates')
	const initialData = await getInitialCandidates()

	return (
		<LayoutLanding1
			breadcrumbTitle={t('title')}
			breadcrumbSubTitle={t('subtitle')}
			breadcrumbAlign={"center"}
		>
			<CandidateSection1 initialData={initialData} />
		</LayoutLanding1>
	)
}
