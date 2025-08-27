"use client"

import { cn } from "@/utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function MainNav({ variant = "desktop", items = [] }) {
	const pathname = usePathname()
	const isDesktop = variant === "desktop"
	const [openItems, setOpenItems] = useState({})

	const toggleOpen = (url) => {
		setOpenItems((prev) => ({ ...prev, [url]: !prev[url] }))
	}

	useEffect(() => {
		const activeOpen = {}
		items.forEach((item) => {
			if (item.items?.some((sub) => sub.url === pathname)) {
				activeOpen[item.url || item.title] = true
			}
		})
		setOpenItems((prev) => ({ ...prev, ...activeOpen }))
	}, [pathname, items])

	return (
		<nav
			className={cn(
				"flex text-muted-foreground",
				isDesktop ? "flex-col gap-2" : "flex-col w-full pt-2"
			)}
		>
			{items.map((item) => {
				const key = `${item.title}-${item.url || "no-url"}`
				const isActive = pathname === item.url
				const hasChildren = item.items && item.items.length > 0
				const isOpen = openItems[item.url || item.title]

				return (
					<div key={key} className="w-full">
						<div
							onClick={() => hasChildren && toggleOpen(item.url || item.title)}
							className={cn(
								"flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors group",
								isActive
									? "bg-muted/50 text-primary"
									: "hover:bg-muted hover:text-foreground"
							)}
						>
							<Link href={item.url || "#"} className="flex items-center gap-3 flex-1">
								<item.icon className="h-5 w-5 opacity-80 group-hover:opacity-100" />
								<span className="text-sm font-medium">{item.title}</span>
							</Link>
							{hasChildren &&
								(isOpen ? (
									<ChevronUp className="w-4 h-4" />
								) : (
									<ChevronDown className="w-4 h-4" />
								))}
						</div>

						{hasChildren && isOpen && (
							<div className="ml-6 mt-1 flex flex-col gap-1">
								{item.items.map((subItem) => {
									const subKey = `${subItem.title}-${subItem.url}`
									const isSubActive = pathname === subItem.url
									return (
										<Link
											key={subKey}
											href={subItem.url}
											className={cn(
												"flex items-center gap-2 text-sm transition-colors px-2 py-1 rounded-md",
												isSubActive
													? "bg-muted/50 text-primary"
													: "text-muted-foreground hover:text-foreground hover:bg-muted"
											)}
										>
											{subItem.icon && <subItem.icon className="w-4 h-4" />}
											<span>{subItem.title}</span>
										</Link>
									)
								})}
							</div>
						)}
					</div>
				)
			})}
		</nav>
	)
}
