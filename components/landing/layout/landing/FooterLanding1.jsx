import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { brandName } from "@/utils"
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export default async function FooterLanding1() {
	const t = await getTranslations('footer')
	const currentYear = new Date().getFullYear()

	const socials = [
		{ icon: <Facebook size={18} />, label: t('socials.facebook'), href: '#' },
		{ icon: <Linkedin size={18} />, label: t('socials.linkedin'), href: '#' },
		{ icon: <Twitter size={18} />, label: t('socials.twitter'), href: '#' },
		{ icon: <Instagram size={18} />, label: t('socials.instagram'), href: '#' },
		{ icon: <Youtube size={18} />, label: t('socials.youtube'), href: '#' },
	]

	const quickLinks = [
		{ label: t('quickLinks.home'), href: '/' },
		{ label: t('quickLinks.about'), href: '/about' },
		{ label: t('quickLinks.findJobs'), href: '/jobs' },
		{ label: t('quickLinks.forEmployers'), href: '/recruiters' },
		{ label: t('quickLinks.pricing'), href: '/pricing' },
	]

	const companyLinks = [
		{ label: t('company.contact'), href: '/contact' },
		{ label: t('company.careers'), href: '/about' },
		{ label: t('company.privacy'), href: '/privacy' },
		{ label: t('company.terms'), href: '/terms' },
		{ label: t('company.faq'), href: '/faqs' },
	]

	const legalLinks = [
		{ label: t('legal.privacy'), href: '/privacy' },
		{ label: t('legal.terms'), href: '/terms' },
		{ label: t('legal.cookies'), href: '/cookies' },
	]

	return (
		<footer className="relative pt-16 pb-12 border-t bg-background overflow-hidden">

			<div className="container mx-auto px-4 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
					<div className="lg:col-span-4">
						<div className="flex-shrink-0 flex items-center mb-6">
							<Link href="/" className="group">
								<Logo size='lg' />
							</Link>
						</div>
						<p className="text-sm leading-relaxed mb-8 text-muted-foreground">
							{t('brandDescription')}
						</p>
						<div className="flex space-x-5">
							{socials.map((social, i) => (
								<Link
									key={i}
									href={social.href}
									className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
									aria-label={social.label}
								>
									{social.icon}
									<span className="sr-only">{social.label}</span>
								</Link>
							))}
						</div>
					</div>

					<div className="lg:col-span-2">
						<h4 className="font-semibold text-base mb-5 tracking-wide">{t('quickLinks.heading')}</h4>
						<ul className="space-y-3">
							{quickLinks.map((item, i) => (
								<li key={i}>
									<Link
										href={item.href}
										className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group text-sm"
									>
										<span className="w-0 h-px bg-primary transition-all duration-300 mr-0 group-hover:w-3 group-hover:mr-2"></span>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="lg:col-span-2">
						<h4 className="font-semibold text-base mb-5 tracking-wide">{t('company.heading')}</h4>
						<ul className="space-y-3">
							{companyLinks.map((item, i) => (
								<li key={i}>
									<Link
										href={item.href}
										className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group text-sm"
									>
										<span className="w-0 h-px bg-primary transition-all duration-300 mr-0 group-hover:w-3 group-hover:mr-2"></span>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="lg:col-span-4">
						<h4 className="font-semibold text-base mb-5 tracking-wide">{t('newsletter.heading')}</h4>
						<p className="mb-5 text-muted-foreground text-sm">
							{t('newsletter.description')}
						</p>
						<form className="space-y-3">
							<div className="relative overflow-hidden rounded-md transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/30">
								<Input
									type="email"
									placeholder={t('newsletter.placeholder')}
									className="w-full pr-12 bg-background border-border/30 focus-visible:ring-0 focus-visible:ring-offset-0 h-11"
									aria-label={t('newsletter.placeholder')}
								/>
								<Button
									type="submit"
									size="sm"
									className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-3 transition-transform duration-300 hover:translate-x-0.5"
								>
									{t('newsletter.submit')}
									<ArrowRight className="ml-2 h-3.5 w-3.5" />
								</Button>
							</div>
							<p className="text-xs text-muted-foreground/80">
								{t('newsletter.consent')}
							</p>
						</form>
					</div>
				</div>

				<div className="border-t border-border/20 pt-8 mt-8">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
						<div className="space-y-3">
							<h5 className="font-medium text-sm tracking-wide">{t('contact.heading')}</h5>
							<ul className="space-y-2.5">
								<li className="flex items-center text-sm text-muted-foreground group">
									<Mail
										size={14}
										className="mr-2.5 text-primary/50 group-hover:text-primary transition-colors duration-300"
									/>
									<a href={`mailto:${t('contact.email')}`} className="hover:text-primary transition-colors duration-200">
										{t('contact.email')}
									</a>
								</li>
								<li className="flex items-center text-sm text-muted-foreground group">
									<Phone
										size={14}
										className="mr-2.5 text-primary/50 group-hover:text-primary transition-colors duration-300"
									/>
									<a href={`tel:${t('contact.phone').replace(/\s+/g, '')}`} className="hover:text-primary transition-colors duration-200">
										{t('contact.phone')}
									</a>
								</li>
								<li className="flex items-start text-sm text-muted-foreground">
									<MapPin size={14} className="mr-2.5 mt-0.5 text-primary/50" />
									<span>{t('contact.address')}</span>
								</li>
							</ul>
						</div>

						<div className="text-left md:text-right">
							<p className="text-sm text-muted-foreground mb-3">© {currentYear} {brandName}. {t('copyright')}</p>
							<div className="flex space-x-6">
								{legalLinks.map((item, i) => (
									<Link
										key={i}
										href={item.href}
										className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
									>
										{item.label}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
