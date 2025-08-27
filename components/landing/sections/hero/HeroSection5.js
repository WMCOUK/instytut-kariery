'use client'

import HeroSearch from '@/components/landing/elements/search/HeroSearch'
import BrandSlider3 from '@/components/landing/slider/BrandSlider3'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function HeroSection5() {
	const t = useTranslations('landing.hero5')

	return (
		<div className="pt-48 pb-32 bg-background">
			<div className="container">
				<div>
					<h1 className="text-center lg:text-[42px] sm:text-[28px] font-semibold lg:leading-[50px] sm:leading-[36px] text-foreground">
						{t('title')}
						<br className="lg:block hidden" />
						{t('titleContinued')}
					</h1>
					<p className="text-center py-4 sm:py-8 text-lg font-normal text-muted-foreground">
						{t('description')}
					</p>

					<div className="flex justify-center">
						<HeroSearch />
					</div>

					<div className="text-sm text-muted-foreground mt-5 text-center">
						<span className="font-medium text-foreground">{t('popularSearches')}: </span>
						<div className="flex flex-wrap justify-center gap-2 mt-3">
							{t('searchTerms').split(',').map((term, index) => (
								<Link
									key={term}
									href={`/jobs?search=${term.toLowerCase()}`}
									className="hover:text-primary transition-colors duration-200"
								>
									{term}{index < 6 ? ',' : ''}
								</Link>
							))}
						</div>
					</div>

					<div className="mt-24 max-w-3xl mx-auto">
						<BrandSlider3 />
					</div>
				</div>
			</div>
		</div>
	)
}

