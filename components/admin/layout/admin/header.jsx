"use client"

import HeaderAuthBtn from "@/components/admin/elements/HeaderAuthBtn"
import LanguageDropdown from "@/components/admin/elements/LanguageDropdown"
import { ThemeSwitcherBtn } from "@/components/admin/elements/ThemeSwitcherBtn"
import { Input } from "@/components/ui/input"
import { Menu, Search } from "lucide-react"

export function DashboardHeader({ onMobileMenuClick }) {
	return (
		<header className="container mx-auto fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:left-[260px] z-30">
			<div className="flex h-[88px] items-center px-4 md:px-0">
				{/* Mobile menu button */}
				<button
					onClick={onMobileMenuClick}
					className="mr-4 md:hidden p-2 rounded-md hover:bg-muted"
					aria-label="Toggle menu"
				>
					<Menu className="w-6 h-6" />
				</button>

				<div className="flex justify-between items-center w-full">
					{/* Search Input */}
					<div className="flex-1 max-w-md relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
						<Input
							type="search"
							placeholder="Search here..."
							className="w-full pl-9 pr-4 bg-card border-0 shadow-sm rounded-full h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
						/>
					</div>

					{/* Right side */}
					<div className="flex items-center gap-3 ml-4">
						{/* <LanguageDropdown /> */}
						<ThemeSwitcherBtn />
						<HeaderAuthBtn />
					</div>
				</div>
			</div>
		</header>
	)
}
