import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import NewsletterSection1 from '@/components/landing/sections/newsletter/NewsletterSection1'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const metadata = {
	title: "Kontakt | Instytut Kariery",
	description: "Skontaktuj się z nami. Chętnie odpowiemy na Twoje pytania dotyczące rekrutacji i ofert pracy.",
}

export default async function ContactPage() {
	const tBreadcrumb = await getTranslations('breadcrumb.pages.contact')
	const t = await getTranslations('contact')

	return (
		<LayoutLanding1
			breadcrumbTitle={tBreadcrumb('title')}
			breadcrumbSubTitle={tBreadcrumb('subtitle')}
		>
			<section className="py-20">
				<div className="container">
					<div className="mb-16">
						<SectionTitle
							style={2}
							title={t('sectionTitle')}
							subTitle={t('sectionSubtitle')}
						/>
					</div>
					<div className="flex justify-center mb-16">
						<Card className="max-w-md w-full">
							<CardContent className="p-6 text-center">
								<Mail className="mb-6 h-12 w-12 mx-auto text-primary" />
								<div className="leading-relaxed">
									<span className="mb-4 inline-block text-muted-foreground">{t('emailHeading')}</span>
									<p className='text-lg font-medium'>
										<a href="mailto:info@instytutkariery.pl" className="hover:text-primary transition-colors">
											info@instytutkariery.pl
										</a>
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className="max-w-2xl lg:max-w-3xl mx-auto mt-12 mb-16">
						<div className="text-center">
							<h2 className="text-3xl font-bold mb-2">{t('formHeading')}</h2>
							<p className="text-muted-foreground">{t('formSubtitle')}</p>
						</div>
					</div>
					<div className="max-w-2xl mx-auto">
						<form className="space-y-4">
							<Input type="text" placeholder={t('subjectPlaceholder')} />
							<Input type="text" placeholder={t('namePlaceholder')} />
							<Input type="email" placeholder={t('emailPlaceholder')} />
							<Textarea className="min-h-[200px]" placeholder={t('messagePlaceholder')} />
							<Button type="submit" size="lg">{t('submit')}</Button>
						</form>
					</div>
				</div>
			</section>

			<NewsletterSection1 />
		</LayoutLanding1>
	)
}
