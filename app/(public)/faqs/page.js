import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import FaqSection1 from '@/components/landing/sections/faq/FaqSection1'
import NewsletterSection1 from '@/components/landing/sections/newsletter/NewsletterSection1'
import WhyChooseSection2 from '@/components/landing/sections/why/WhyChooseSection2'
import { getTranslations } from 'next-intl/server'

export const metadata = {
	title: "FAQ | Instytut Kariery",
	description: "Najczęściej zadawane pytania o Instytut Kariery. Znajdź odpowiedzi na pytania o rekrutację, oferty pracy i konto.",
}

export default async function FaqsPage() {
	const t = await getTranslations('breadcrumb.pages.faqs')
	return (
		<LayoutLanding1
			breadcrumbTitle={t('title')}
			breadcrumbSubTitle={t('subtitle')}
		>
			<div className="container">
				<div className="pt-24">
					<SectionTitle
						style={1}
						title={t('title')}
						subTitle={t('subtitle')}
					/>
				</div>
				<FaqSection1 />
			</div>
			<WhyChooseSection2 />
			<NewsletterSection1 />
		</LayoutLanding1>
	)
}