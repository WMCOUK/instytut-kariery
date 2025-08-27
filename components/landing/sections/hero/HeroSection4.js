'use client'

import HeroSearch from '@/components/landing/elements/search/HeroSearch'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection4() {
	const t = useTranslations('landing.hero4')
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<Image
				src="/images/pattern/bg6.webp"
				alt={t('backgroundPatternAlt')}
				fill
				style={{ objectFit: 'contain' }}
				quality={100}
				priority
				className="opacity-100"
			/>
			<div className="absolute inset-0 bg-gradient-to-r from-background to-background/90 z-10"></div>

			<div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40 lg:py-48">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-tight sm:leading-[1.2] lg:leading-[50px] text-foreground mb-4 sm:mb-6">
						{t('title')}
						<br className="lg:block hidden" />
						{t('titleContinued')}
					</h1>
					<p className="text-lg sm:text-xl text-muted-foreground font-normal mb-8 sm:mb-10">
						{t('description')}
					</p>

					<div className="mb-10">
						<HeroSearch />
					</div>

					<div className="text-sm text-muted-foreground">
						<span className="font-medium text-foreground mr-2">{t('popularSearches')}:</span>
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
				</div>
			</div>
		</section>
	)
}

