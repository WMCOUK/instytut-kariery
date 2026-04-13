import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import NewsletterSection1 from '@/components/landing/sections/newsletter/NewsletterSection1'
import TeamSection2 from '@/components/landing/sections/team/TeamSection2'
import TestimonialSection1 from '@/components/landing/sections/testimonial/TestimonialSection1'
import WhyChooseSection1 from '@/components/landing/sections/why/WhyChooseSection1'
import { getTranslations } from 'next-intl/server'

export const metadata = {
	title: "O nas | Instytut Kariery",
	description: "Poznaj nasz zespół i misję. Instytut Kariery pomaga pracodawcom i kandydatom znaleźć idealne dopasowanie.",
}

export default async function AboutPage() {
	const t = await getTranslations('breadcrumb.pages.about')
	return (
		<LayoutLanding1
			breadcrumbTitle={t('title')}
			breadcrumbSubTitle={t('subtitle')}
			breadcrumbAlign={"center"}
		>
			<TeamSection2 />
			<WhyChooseSection1 />
			<TestimonialSection1 />
			<NewsletterSection1 />
		</LayoutLanding1>
	)
}