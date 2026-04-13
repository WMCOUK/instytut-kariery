'use client'

import HeaderAuthBtn from '@/components/landing/elements/HeaderAuthBtn'
import LanguageDropdown from '@/components/admin/elements/LanguageDropdown'
import { ThemeSwitcherBtn } from '@/components/admin/elements/ThemeSwitcherBtn'
import Logo from '@/components/logo'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { brandName } from '@/utils'
import { ChevronDown, ChevronRight, Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
	{ key: 'jobs', href: '/jobs' },
	{ key: 'recruiters', href: '/recruiters' },
	{ key: 'candidates', href: '/candidates' },
	{ key: 'blog', href: '/blog' },
	{
		key: 'pages',
		href: '#',
		subItems: [
			{ key: 'faqs', href: '/faqs' },
			{ key: 'about', href: '/about' },
			{ key: 'contact', href: '/contact' },
		],
	},
	{ key: 'docs', href: '/docs' },
]

export default function HeaderLanding1({ isTransparentHeader, colorTransparent }) {
	const t = useTranslations('nav')
	const [isOpen, setIsOpen] = useState(false)
	const [isSticky, setIsSticky] = useState(false)
	const [activeAccordion, setActiveAccordion] = useState(null)
	const pathname = usePathname()

	const isActiveOrHasActiveChild = (item) => {
		if (pathname === item.href) return true
		if (item.subItems) {
			return item.subItems.some((subItem) => pathname === subItem.href)
		}
		if (item.href === '/jobs' && pathname.startsWith('/jobs/')) return true
		if (item.href === '/recruiters' && pathname.startsWith('/recruiters/')) return true
		if (item.href === '/blog' && pathname.startsWith('/blog/')) return true
		return false
	}

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const handleAccordionToggle = (value) => {
		setActiveAccordion((prev) => (prev === value ? null : value))
	}

	useEffect(() => {
		navItems.forEach((item, index) => {
			if (item.subItems) {
				item.subItems.forEach((subItem) => {
					if (pathname === subItem.href) {
						setActiveAccordion(`item-${index}`)
					}
				})
			}
		})
	}, [pathname])

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsSticky(true)
			} else {
				setIsSticky(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const headerTextColor = isTransparentHeader && !isSticky ? 'text-foreground hover:text-primary' : 'text-foreground'

	return (
		<header
			className={`${isSticky
				? 'bg-background shadow-sm'
				: `bg-transparent ${isTransparentHeader ? 'sticky top-0 left-0 right-0 z-50' : ''}`
				} ${headerTextColor} transition-all duration-300 ${isSticky ? 'sticky top-0 left-0 right-0 z-50' : ''
				}`}
		>
			<div className="container">
				<div className="flex justify-between items-center h-16">
					<div className="flex-shrink-0 flex items-center">
						<Link href="/">
							<Logo size="lg" transparentHeader={!colorTransparent ? false : true && isSticky ? false : true} />
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						<nav className="hidden md:flex">
							{navItems.map((item) => (
								<div key={item.key} className="relative group flex items-center">
									{item.subItems ? (
										<div>
											<Button
												variant="ghost"
												className={`flex items-center group hover:bg-transparent ${isActiveOrHasActiveChild(item)
													? 'text-primary font-semibold'
													: headerTextColor
													}`}
											>
												{t(item.key)}
												<ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
											</Button>
											<div className="absolute left-0 mt-2 w-48 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
												<div className="py-1" role="menu" aria-orientation="vertical">
													{item.subItems.map((subItem) => (
														<Link
															key={subItem.key}
															href={subItem.href}
															className={`block px-4 py-2 text-sm text-foreground hover:text-foreground ${pathname === subItem.href ? 'font-semibold text-primary' : ''
																}`}
															role="menuitem"
														>
															{t(subItem.key)}
														</Link>
													))}
												</div>
											</div>
										</div>
									) : (
										<Link
											href={item.href}
											className={`${headerTextColor} hover:text-foreground px-3 py-2 text-sm font-medium ${isActiveOrHasActiveChild(item) ? 'font-semibold text-primary' : ''
												}`}
										>
											{t(item.key)}
										</Link>
									)}
								</div>
							))}
						</nav>
						<div className="flex items-center space-x-2">
							<div>
								<LanguageDropdown />
							</div>
							<div>
								<ThemeSwitcherBtn />
							</div>
							<div>
								<HeaderAuthBtn />
							</div>
							<div className="md:hidden">
								<Sheet open={isOpen} onOpenChange={toggleMenu}>
									<SheetTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											className={`${headerTextColor} hover:bg-transparent`}
										>
											<Menu className="h-6 w-6" />
											<span className="sr-only">{t('openMenu')}</span>
										</Button>
									</SheetTrigger>
									<SheetContent
										side="left"
										className="w-[300px] sm:w-[400px] bg-background"
									>
										<SheetHeader className="text-left">
											<SheetTitle>
												<span className="text-2xl font-bold text-foreground">
													{brandName}
												</span>
											</SheetTitle>
										</SheetHeader>
										<nav className="mt-6">
											<Accordion type="single" collapsible className="w-full" value={activeAccordion}>
												{navItems.map((item, index) => (
													<AccordionItem key={item.key} value={`item-${index}`}>
														{item.subItems ? (
															<>
																<AccordionTrigger
																	className={`text-left text-base font-medium py-2 hover:no-underline ${isActiveOrHasActiveChild(item)
																		? 'text-primary font-semibold'
																		: 'text-foreground'
																		}`}
																	onClick={() => handleAccordionToggle(`item-${index}`)}
																>
																	{t(item.key)}
																</AccordionTrigger>
																<AccordionContent>
																	<div className="pl-4">
																		{item.subItems.map((subItem) => (
																			<Link
																				key={subItem.key}
																				href={subItem.href}
																				className={`block py-2 text-foreground hover:text-foreground ${pathname === subItem.href ? 'font-semibold text-primary' : ''
																					}`}
																				onClick={() => toggleMenu()}
																			>
																				{t(subItem.key)}
																			</Link>
																		))}
																	</div>
																</AccordionContent>
															</>
														) : (
															<Link
																href={item.href}
																className={`flex items-center justify-between py-2 text-base font-medium ${isActiveOrHasActiveChild(item)
																	? 'font-semibold text-primary'
																	: 'text-foreground hover:text-foreground'
																	}`}
																onClick={() => toggleMenu()}
															>
																{t(item.key)}
																{item.subItems && <ChevronRight className="w-4 h-4" />}
															</Link>
														)}
													</AccordionItem>
												))}
											</Accordion>
										</nav>
									</SheetContent>
								</Sheet>
							</div>
						</div>
					</div>

				</div>
			</div>
		</header>
	)
}

