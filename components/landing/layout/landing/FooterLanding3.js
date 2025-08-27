import { brandName } from '@/utils'
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'
import Link from "next/link"

export default function FooterLanding3() {
	return (
		<footer className="bg-background pt-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12">
					<div className="lg:col-span-2">
						<div className="max-w-sm">
							<Link href="/" className="inline-flex items-center">
								<span className="text-2xl font-bold text-foreground">{brandName}</span>
							</Link>
							<p className="text-muted-foreground leading-7 mt-4">
								{brandName} a unique and beautiful collection of UI elements that are all flexible and
								modular. A complete and customizable solution to building the website of your dreams.
							</p>
						</div>
					</div>

					<nav aria-labelledby="about-us">
						<h2 id="about-us" className="mb-3 text-foreground font-semibold">About us</h2>
						<ul className="space-y-2">
							<li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
							<li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
							<li><Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">Jobs</Link></li>
							<li><Link href="/jobs/software-engineer" className="text-muted-foreground hover:text-foreground transition-colors">Job Details</Link></li>
						</ul>
					</nav>

					<nav aria-labelledby="company">
						<h2 id="company" className="mb-3 text-foreground font-semibold">Company</h2>
						<ul className="space-y-2">
							<li><Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
							<li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
							<li><Link href="/company" className="text-muted-foreground hover:text-foreground transition-colors">Company</Link></li>
							<li><Link href="/company/1" className="text-muted-foreground hover:text-foreground transition-colors">Company Details</Link></li>
						</ul>
					</nav>

					<nav aria-labelledby="resources">
						<h2 id="resources" className="mb-3 text-foreground font-semibold">Resources</h2>
						<ul className="space-y-2">
							<li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
							<li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
							<li><Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">Support</Link></li>
							<li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
						</ul>
					</nav>

					<nav aria-labelledby="legal">
						<h2 id="legal" className="mb-3 text-foreground font-semibold">Legal</h2>
						<ul className="space-y-2">
							<li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
							<li><Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
							<li><Link href="/gdpr" className="text-muted-foreground hover:text-foreground transition-colors">GDPR</Link></li>
							<li><Link href="/accessibility" className="text-muted-foreground hover:text-foreground transition-colors">Accessibility</Link></li>
						</ul>
					</nav>
				</div>

				<div className="py-8 border-t border-border">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-muted-foreground text-sm mb-4 md:mb-0">
							© {new Date().getFullYear()} <Link href="/" className="hover:text-foreground transition-colors">{brandName} </Link>. All Rights Reserved.
						</p>
						<div className="flex space-x-4">
							<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
								<Facebook className="w-5 h-5" />
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
								<Twitter className="w-5 h-5" />
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
								<Linkedin className="w-5 h-5" />
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="YouTube">
								<Youtube className="w-5 h-5" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

