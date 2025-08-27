"use client"
import { useState } from "react"
import { Breadcrumb } from "./breadcrumb"
import { SiteFooter } from "./footer"
import { DashboardHeader } from "./header"
import { DashboardSidebar } from "./sidebar"

export default function LayoutAdmin({ children, breadcrumbTitle }) {
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

	return (
		<>
			<div className="relative min-h-screen">
				<DashboardSidebar
					mobileOpen={mobileSidebarOpen}
					setMobileOpen={setMobileSidebarOpen}
				/>
				<DashboardHeader
					onMobileMenuClick={() => setMobileSidebarOpen((open) => !open)}
				/>
				<div className="pt-[88px] pb-20 md:pl-[260px]">
					<main className="min-h-[calc(100vh-88px-64px)] container mx-auto">
						{breadcrumbTitle && (
							<Breadcrumb
								title={breadcrumbTitle}
								items={[
									{ title: "Home", href: "/" },
									{ title: breadcrumbTitle, href: "#" },
								]}
							/>
						)}
						{children}
					</main>
				</div>
				<SiteFooter />
			</div>
		</>
	)
}
