"use client"

import { ThemeSwitcherBtn } from "@/components/admin/elements/ThemeSwitcherBtn"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import HeaderAuthBtn from "../../elements/HeaderAuthBtn"

const navItems = [
	// { name: "Hero", href: "#hero" },
	// { name: "Features", href: "#features" },
	{ name: "Pages", href: "#pages" },
	// { name: "Why", href: "#why" },
	// { name: "Jobs", href: "#jobs" },
	// { name: "Recruiters", href: "#recruiters" },
	// { name: "Candidates", href: "#candidates" },
	// { name: "Profile", href: "#profiles" },
	// { name: "Settings", href: "#settings" },
	// { name: "Dashboards", href: "#dashboard" },
	{ name: "Packages", href: "#packages" },
]

export default function HeaderDemo() {
	const [activeSection, setActiveSection] = useState("")
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY
			setIsScrolled(scrollPosition > 50)

			const sections = navItems.map((item) => item.href.slice(1))

			for (const section of sections) {
				const element = document.getElementById(section)
				if (element) {
					const top = element.offsetTop - 100
					const bottom = top + element.offsetHeight
					if (scrollPosition >= top && scrollPosition < bottom) {
						setActiveSection(section)
						break
					}
				}
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const scrollToSection = (href) => {
		const element = document.querySelector(href)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
			setIsMobileMenuOpen(false)
		}
	}

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
				}`}
		>
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<div className="flex-shrink-0 flex items-center">
						<Link href="/">
							<Logo size='lg' />
						</Link>
					</div>
					{/* <nav className="hidden md:flex space-x-1">
						{navItems.map((item) => (
							<Button
								key={item.name}
								variant="ghost"
								className={`relative px-1 py-2 text-sm font-medium ${activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground"
									}`}
								onClick={() => scrollToSection(item.href)}
							>
								{item.name}
								{activeSection === item.href.slice(1) && (
									<motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="underline" />
								)}
							</Button>
						))}
					</nav> */}
					<div className="flex items-center space-x-2">
						<div>
							<ThemeSwitcherBtn />
						</div>
						<div>
							{/* <HeaderAuthBtn /> */}
						</div>
						<div>
							<Button asChild>
								<Link href="/docs">Documentation</Link>
							</Button>
						</div>
					</div>
					<div className="md:hidden">
						<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu className="h-6 w-6" />
									<span className="sr-only">Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] sm:w-[400px]">
								<SheetTitle className="text-lg font-semibold mb-4">Navigation Menu</SheetTitle>
								<nav className="flex flex-col space-y-4">
									{navItems.map((item) => (
										<Button
											key={item.name}
											variant="ghost"
											className={`justify-start text-lg ${activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground"
												}`}
											onClick={() => scrollToSection(item.href)}
										>
											{item.name}
										</Button>
									))}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	)
}

