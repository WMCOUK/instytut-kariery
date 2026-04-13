'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function HeroSection6() {
	const t = useTranslations('landing.hero6')
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
			<div className="container px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
								{t('title')}
							</h1>
							<p className="max-w-[600px] text-muted-foreground md:text-xl py-5">
								{t('description')}
							</p>
						</div>
						<div className="w-full max-w-sm space-y-2">
							<form className="flex gap-2">
								<Input type="email" placeholder={t('emailPlaceholder')} className="max-w-lg flex-1" />
								<Button type="submit">{t('getStarted')}</Button>
							</form>
							<p className="text-xs text-muted-foreground">
								{t('signupNote')}{" "}
								<Link href="#" className="underline underline-offset-2" prefetch={false}>
									{t('terms')}
								</Link>
							</p>
						</div>
					</div>
					<img
						src="/images/placeholder.svg"
						width="550"
						height="550"
						alt={t('heroAlt')}
						className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
					/>
				</div>
			</div>
		</section>
	)
}
