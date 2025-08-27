'use client'

import { docsSections } from '@/components/landing/layout/docs/docsSections'
import { cn } from '@/utils'
import { tableOfContents } from './doc-menu'

export function DocsSidebar({ currentIndex, setCurrentIndex, onLinkClick }) {
	// Flatten all items for easy index lookup (you probably already have this)
	// docsSections is your flat array with title, slug, Component

	return (
		<div className="h-full py-6 pr-4 lg:py-8 overflow-y-auto">
			<nav className="w-full space-y-6">
				{tableOfContents.map((section) => {
					const Icon = section.icon
					return (
						<div key={section.title}>
							<div className="flex items-center gap-2 px-2 py-1 text-sm font-semibold text-foreground">
								<Icon className="h-4 w-4 text-muted-foreground" />
								<span>{section.title}</span>
							</div>
							<div className="mt-1 space-y-1">
								{section.items.map((item) => {
									const slug = item.href.slice(1)
									const index = docsSections.findIndex((sec) => sec.slug === slug)
									const isActive = index === currentIndex

									return (
										<button
											key={item.href}
											onClick={() => {
												if (index !== -1) {
													setCurrentIndex(index)
													onLinkClick?.()
												}
											}}
											className={cn(
												'w-full text-left rounded-md px-2 py-1 text-sm transition-colors',
												isActive
													? 'bg-accent font-medium text-accent-foreground'
													: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
											)}
										>
											{item.title}
										</button>
									)
								})}
							</div>
						</div>
					)
				})}
			</nav>
		</div>
	)
}
