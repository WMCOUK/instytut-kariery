'use client'
import { brandName } from '@/utils'
import { ArrowRight, Facebook, Linkedin, Youtube } from 'lucide-react'
import Link from "next/link"
import { useState } from 'react'

export default function FooterLanding2() {
	const [email, setEmail] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		// Handle newsletter subscription
		console.log('Subscribed with email:', email)
		setEmail('')
	}

	return (
		<footer className="border-t">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
					<div className="lg:col-span-2">
						<Link href="/" className="inline-block mb-6">
							<span className="text-3xl font-bold">{brandName}</span>
						</Link>
						<p className="text-base mb-6">
							Connecting talented professionals with innovative companies.
							Discover your next career opportunity or find the perfect candidate with {brandName}
						</p>
						<form onSubmit={handleSubmit} className="flex mb-6">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-grow px-4 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-primary"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
								Subscribe
							</button>
						</form>
						<div className="flex space-x-4">
							<Link href="#" className="hover:text-primary transition-colors">
								<Facebook size={24} />
							</Link>
							<Link href="#" className="hover:text-primary transition-colors">
								<Linkedin size={24} />
							</Link>
							<Link href="#" className="hover:text-primary transition-colors">
								<Youtube size={24} />
							</Link>
						</div>
					</div>
					<div>
						<h4 className="font-semibold text-lg mb-4">For Job Seekers</h4>
						<ul className="space-y-2">
							<li><Link href="/jobs" className="hover:underline flex items-center"><ArrowRight size={16} className="mr-2" /> Browse Jobs</Link></li>
							<li><Link href="/career-advice" className="hover:underline flex items-center"><ArrowRight size={16} className="mr-2" /> Career Advice</Link></li>
							<li><Link href="/resume-builder" className="hover:underline flex items-center"><ArrowRight size={16} className="mr-2" /> Resume Builder</Link></li>
							<li><Link href="/salary-calculator" className="hover:underline flex items-center"><ArrowRight size={16} className="mr-2" /> Salary Calculator</Link></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-lg mb-4">For Employers</h4>
						<ul className="space-y-2">
							<li><Link href="/post-job" className="hover:underline flex items-center"><ArrowRight size={16} className="mr-2" /> Post a Job</Link></li>
							<li><Link href="/talent-search" className="hover:underline flex items-center"><ArrowRight size={16} className="mr-2" /> Talent Search</Link></li>
							<li><Link href="/pricing" className="hover:underline flex items-center"><ArrowRight size={16} className="mr-2" /> Pricing</Link></li>
							<li><Link href="/employer-resources" className="hover:underline flex items-center"><ArrowRight size={16} className="mr-2" /> Employer Resources</Link></li>
						</ul>
					</div>
				</div>
				<div className="border-t pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center mb-4">
						<p className="text-sm mb-4 md:mb-0">
							© {new Date().getFullYear()} {brandName} All rights reserved.
						</p>
						<div className="flex flex-wrap justify-center space-x-4">
							<Link href="/about" className="text-sm hover:underline">About Us</Link>
							<Link href="/contact" className="text-sm hover:underline">Contact</Link>
							<Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
							<Link href="/terms" className="text-sm hover:underline">Terms of Service</Link>
						</div>
					</div>
					<div className="flex justify-center mt-4 text-sm">
						<Link href="/sitemap" className="hover:underline mr-4">Sitemap</Link>
						<span className="text-muted-foreground">|</span>
						<Link href="/accessibility" className="hover:underline ml-4">Accessibility</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

