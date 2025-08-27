import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { brandName } from "@/utils"
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export default function FooterLanding1() {
	const currentYear = new Date().getFullYear()

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
							{brandName} is your gateway to career success. We connect talented professionals with innovative companies,
							fostering growth and opportunity in the ever-evolving job market.
						</p>
						<div className="flex space-x-5">
							{[
								{ icon: <Facebook size={18} />, label: "Facebook" },
								{ icon: <Linkedin size={18} />, label: "LinkedIn" },
								{ icon: <Twitter size={18} />, label: "Twitter" },
								{ icon: <Instagram size={18} />, label: "Instagram" },
								{ icon: <Youtube size={18} />, label: "YouTube" },
							].map((social, i) => (
								<Link
									key={i}
									href="#"
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
						<h4 className="font-semibold text-base mb-5 tracking-wide">Quick Links</h4>
						<ul className="space-y-3">
							{["Home", "About Us", "Find Jobs", "For Employers", "Pricing"].map((item, i) => (
								<li key={i}>
									<Link
										href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
										className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group text-sm"
									>
										<span className="w-0 h-px bg-primary transition-all duration-300 mr-0 group-hover:w-3 group-hover:mr-2"></span>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="lg:col-span-2">
						<h4 className="font-semibold text-base mb-5 tracking-wide">Company</h4>
						<ul className="space-y-3">
							{[`Contact Us", "Careers at ${brandName}`, "Privacy Policy", "Terms of Service", "FAQ"].map((item, i) => (
								<li key={i}>
									<Link
										href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
										className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group text-sm"
									>
										<span className="w-0 h-px bg-primary transition-all duration-300 mr-0 group-hover:w-3 group-hover:mr-2"></span>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="lg:col-span-4">
						<h4 className="font-semibold text-base mb-5 tracking-wide">Stay Connected</h4>
						<p className="mb-5 text-muted-foreground text-sm">
							Subscribe to our newsletter for the latest job opportunities and career advice.
						</p>
						<form className="space-y-3">
							<div className="relative overflow-hidden rounded-md transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/30">
								<Input
									type="email"
									placeholder="Enter your email"
									className="w-full pr-12 bg-background border-border/30 focus-visible:ring-0 focus-visible:ring-offset-0 h-11"
									aria-label="Email for newsletter"
								/>
								<Button
									type="submit"
									size="sm"
									className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-3 transition-transform duration-300 hover:translate-x-0.5"
								>
									Subscribe
									<ArrowRight className="ml-2 h-3.5 w-3.5" />
								</Button>
							</div>
							<p className="text-xs text-muted-foreground/80">
								By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
							</p>
						</form>
					</div>
				</div>

				<div className="border-t border-border/20 pt-8 mt-8">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
						<div className="space-y-3">
							<h5 className="font-medium text-sm tracking-wide">Contact Us</h5>
							<ul className="space-y-2.5">
								<li className="flex items-center text-sm text-muted-foreground group">
									<Mail
										size={14}
										className="mr-2.5 text-primary/50 group-hover:text-primary transition-colors duration-300"
									/>
									<a href="mailto:info@test.com" className="hover:text-primary transition-colors duration-200">
										info@test.com
									</a>
								</li>
								<li className="flex items-center text-sm text-muted-foreground group">
									<Phone
										size={14}
										className="mr-2.5 text-primary/50 group-hover:text-primary transition-colors duration-300"
									/>
									<a href="tel:+1234567890" className="hover:text-primary transition-colors duration-200">
										+1 (234) 567-890
									</a>
								</li>
								<li className="flex items-start text-sm text-muted-foreground">
									<MapPin size={14} className="mr-2.5 mt-0.5 text-primary/50" />
									<span>123 Career Avenue, Opportunity City, 54321, Dreamland</span>
								</li>
							</ul>
						</div>

						<div className="text-left md:text-right">
							<p className="text-sm text-muted-foreground mb-3">© {currentYear} {brandName}. All rights reserved.</p>
							<div className="flex space-x-6">
								{["Privacy", "Terms", "Cookies"].map((item, i) => (
									<Link
										key={i}
										href={`/${item.toLowerCase()}`}
										className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
									>
										{item}
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

