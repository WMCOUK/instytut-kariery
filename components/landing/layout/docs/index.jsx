// DocsLayout.jsx
'use client'

import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useState } from 'react'
import { DocsHeader } from './header'
import { DocsSidebar } from './sidebar'

export function DocsLayout({ children, currentIndex, setCurrentIndex }) {
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<div className="flex min-h-screen flex-col">
			<DocsHeader onMenuClick={() => setMobileOpen(true)} />
			<div className="px-5  flex-1 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
				{/* Desktop Sidebar */}
				<aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] md:sticky md:block">
					<DocsSidebar currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
				</aside>

				{/* Mobile Sidebar Drawer */}
				<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
					<SheetContent side="left" className="p-0 w-64">
						<DocsSidebar
							currentIndex={currentIndex}
							setCurrentIndex={(index) => {
								setCurrentIndex(index)
								setMobileOpen(false)
							}}
						/>
					</SheetContent>
				</Sheet>

				{/* Content */}
				<main className="relative py-6 lg:py-8 xl:grid">
					<div>{children}</div>
				</main>
			</div>
		</div>
	)
}
