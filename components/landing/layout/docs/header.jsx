'use client'

import { ThemeSwitcherBtn } from '@/components/admin/elements/ThemeSwitcherBtn'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'

export function DocsHeader({ onMenuClick }) {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="px-5 flex h-14 items-center justify-between">
				<div className="flex items-center gap-2">
					{/* Mobile Menu Button */}
					<Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
						<Menu className="h-5 w-5" />
					</Button>
					<Link href="/">
						<Logo size="lg" />
					</Link>
				</div>

				<div className="flex items-center gap-2">
					<Button asChild variant="ghost" className="hidden md:inline-flex">
						<Link href="/">Website</Link>
					</Button>
					<ThemeSwitcherBtn />
				</div>
			</div>
		</header>
	)
}
