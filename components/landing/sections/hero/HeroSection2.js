'use client'

import HeroSearch from '@/components/landing/elements/search/HeroSearch'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { MouseParallaxChild, MouseParallaxContainer } from "react-parallax-mouse"

export default function HeroSection2() {
	const t = useTranslations('landing.hero2')
	return (
		<MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
			<section className="py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
						<div className="col-span-3 relative z-10 text-center lg:text-left">
							<div className="flex items-center justify-center lg:justify-start mb-5">
								<Image src="/images/icons/hand.svg" width={22} height={22} alt={t('handIconAlt')} className="w-[22px] h-[22px]" />
								<span className="ml-2.5 text-primary text-sm sm:text-base md:text-lg">{t('greeting')}</span>
							</div>

							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 sm:mb-6 font-bold tracking-tighter text-foreground">
								{t('title')} <br className="hidden lg:inline" /> <span className="text-primary">{t('titleHighlight')}</span>
							</h1>
							<p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
								{t('description')}
							</p>

							<HeroSearch />

							<div className="mt-6 text-sm sm:text-base text-muted-foreground">
								<span className="text-foreground mr-2 font-medium">{t('popularSearches')}:</span>
								{t('searchTerms').split(',').map((term, index) => (
									<Link
										key={term}
										href={`/jobs?search=${term.toLowerCase()}`}
										className="inline-block hover:text-primary transition-colors duration-200 mr-2 mb-2"
									>
										{term}
									</Link>
								))}
							</div>
						</div>

						<div className="col-span-2 relative z-10 mt-10 lg:mt-0">
							<MouseParallaxChild factorX={0.2} factorY={0.2}>
								<div className="relative">
									<Image
										src="/images/pattern/bg6.webp"
										width={480}
										height={480}
										alt={t('backgroundPatternAlt')}
										className="rounded-xl mx-auto"
									/>
									<Image
										src="/images/hero/3.png"
										width={320}
										height={320}
										alt={t('heroImageAlt')}
										className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg"
									/>
									<div className="hidden lg:block">
										{[
											{ src: "/images/avatar/8.png", position: "left-[7%] top-[7%]", bg: "bg-primary" },
											{ src: "/images/avatar/9.png", position: "-left-[7%] top-[40%]", bg: "bg-secondary" },
											{ src: "/images/avatar/10.png", position: "left-[7%] bottom-[7%]", bg: "bg-accent" },
											{ src: "/images/avatar/11.png", position: "right-[7%] top-[7%]", bg: "bg-muted" },
											{ src: "/images/avatar/12.png", position: "-right-[7%] bottom-[40%]", bg: "bg-primary" },
											{ src: "/images/avatar/13.png", position: "right-[7%] bottom-[7%]", bg: "bg-secondary" }
										].map((avatar, index) => (
											<Image
												key={index}
												width={64}
												height={64}
												src={avatar.src}
												alt={t('avatarAlt', { number: index + 1 })}
												className={`rounded-full ${avatar.bg} absolute ${avatar.position} p-2.5 border border-border shadow-md transition-transform duration-300 hover:scale-110`}
											/>
										))}
									</div>
								</div>
							</MouseParallaxChild>
						</div>
					</div>
				</div>
			</section>
		</MouseParallaxContainer>
	)
}

