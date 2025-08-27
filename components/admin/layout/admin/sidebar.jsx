"use client"

import Logo from "@/components/logo"
import { cn } from "@/utils"
import CurrentUserClient from "@/utils/currentUserClient"
import { X } from "lucide-react"
import Link from "next/link"
import { MainNav } from "./nav"
import { appSidebarData } from "./nav-data"

export function DashboardSidebar({ mobileOpen = false, setMobileOpen }) {
	const currentUser = CurrentUserClient()
	const { navMain } = appSidebarData(currentUser)

	return (
		<>
			{/* Desktop Sidebar */}
			<div className="fixed top-0 left-0 bottom-0 z-50 w-[260px] hidden md:flex flex-col bg-card border-r">
				<div className="h-[80px] flex items-center px-6 border-b">
					<Link href="/" className="flex items-center">
						<Logo size="md" />
					</Link>
				</div>
				<div className="flex-1 overflow-y-auto py-4 px-2">
					<MainNav variant="desktop" items={navMain} />
				</div>
			</div>

			{/* Mobile Sidebar Drawer */}
			<div
				className={cn(
					"fixed top-0 left-0 bottom-0 w-[260px] bg-card border-r p-4 overflow-y-auto rounded-r-xl shadow-lg md:hidden transition-transform duration-300 ease-in-out z-50",
					mobileOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				<div className="flex items-center justify-between mb-6">
					<Link href="/" className="flex items-center">
						<Logo size="md" />
					</Link>
					<button onClick={() => setMobileOpen(false)} aria-label="Close sidebar">
						<X className="w-6 h-6" />
					</button>
				</div>
				<MainNav variant="mobile" items={navMain} />
			</div>

			{/* Overlay */}
			{mobileOpen && (
				<div
					onClick={() => setMobileOpen(false)}
					className="fixed inset-0 bg-black/50 md:hidden z-40"
				/>
			)}
		</>
	)
}
