'use client'

import DocsContent from '@/components/landing/layout/docs/content'
import Link from 'next/link'
import { brandName } from '@/utils'
export function Introduction({ title, path }) {
	const details = [
		{ label: 'Item Name', value: brandName },
		{ label: 'Item Version', value: 'v1.0' },
		{ label: 'Author', value: 'Prexius', isLink: true, href: '#' },
		{ label: 'Email', value: 'imsaifun@gmail.com', isLink: true, href: 'mailto:imsaifun@gmail.com' },
		{ label: 'WhatsApp', value: '+8801843666660', isLink: true, href: 'https://wa.me/8801843666660' },
		{ label: 'Discord', value: 'imsaifun', isLink: true, href: 'https://discord.gg/imsaifun' },
		{ label: 'License', value: 'ThemeForest under License', isLink: true, href: '#' }
	]

	return (
		<DocsContent title={title} path={path}>
			<p className="mb-8 text-lg leading-relaxed">
				Welcome to the {brandName} documentation. This guide provides everything you need to set up and leverage the {brandName} application to build a professional job listing directory.
			</p>

			<div className="mb-10 space-y-6">
				<section>
					<h4 className="font-semibold text-xl mb-2">Why is {brandName} important?</h4>
					<p className="text-muted-foreground leading-relaxed">
						 simplifies recruitment creation with a full-stack solution built using cutting-edge technologies like Next.js. It saves time, minimizes complexity, and offers tools for effective job management.
					</p>
				</section>

				<section>
					<h4 className="font-semibold text-xl mb-2">Who Uses {brandName}?</h4>
					<p className="text-muted-foreground leading-relaxed">
						{brandName} is ideal for recruiters, businesses, startups, and developers seeking to launch a powerful job listing platform or directory with minimal setup.
					</p>
				</section>

				<section>
					<h4 className="font-semibold text-xl mb-2">Why is {brandName} the Best?</h4>
					<p className="text-muted-foreground leading-relaxed">
						{brandName} stands out with its intuitive interface, seamless integrations (Stripe, NextAuth, etc.), customizable features, and optimized performance for scalability and responsiveness.
					</p>
				</section>
			</div>

			<div className="bg-muted rounded-lg p-6 space-y-4">
				{details.map((item, index) => (
					<div key={index} className="flex items-center">
						<span className="font-semibold w-36">{item.label}:</span>
						{item.isLink ? (
							<Link href={item.href} className="text-primary hover:underline truncate" target="_blank" rel="noopener noreferrer">
								{item.value}
							</Link>
						) : (
							<span className="truncate">{item.value}</span>
						)}
					</div>
				))}
			</div>
		</DocsContent>
	)
}
