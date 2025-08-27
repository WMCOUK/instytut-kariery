"use client"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function BreadcrumbLanding({
	breadcrumbTitle,
	breadcrumbSubTitle,
	breadcrumbItems = [],
	backgroundImage,
	isTransparentHeader,
}) {
	const hasBackgroundImage = Boolean(backgroundImage)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Delay the animation slightly for a better effect
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 100)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div
			className={`py-12 relative overflow-hidden
        ${isTransparentHeader
					? "bg-gradient-to-br from-purple-100 via-blue-100 to-teal-100 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-teal-900/20"
					: "bg-background text-foreground"
				}`}
			style={
				hasBackgroundImage
					? {
						backgroundImage: `url(${backgroundImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}
					: {}
			}
		>
			{/* Background decorations */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/5"></div>

				{/* Subtle dot pattern */}
				<div className="absolute inset-0 opacity-[0.02]">
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern id="breadcrumbDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
								<circle cx="2" cy="2" r="1" fill="currentColor" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#breadcrumbDots)" />
					</svg>
				</div>
			</div>

			{/* Backdrop blur */}
			<div
				className={`absolute inset-0 ${hasBackgroundImage ? "bg-background/70" : "bg-primary/[0.05]"
					} backdrop-blur-[2px]`}
			/>

			<div className="container relative z-10">
				<div className={`space-y-5 flex justify-between items-center ${isTransparentHeader ? "pt-12 md:pt-16" : ""}`}>
					<div
						className={`transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
					>
						<h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{breadcrumbTitle}</h1>
						{breadcrumbSubTitle && (
							<p className="text-sm md:text-base text-muted-foreground max-w-2xl">{breadcrumbSubTitle}</p>
						)}
					</div>

					<div
						className={`transition-all duration-700 delay-150 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
					>
						<Breadcrumb className="text-sm">
							<BreadcrumbList className="flex-wrap">
								<BreadcrumbItem>
									<BreadcrumbLink
										href="/"
										className="text-muted-foreground hover:text-primary transition-colors duration-200"
									>
										Home
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator>
									<ChevronRight className="h-3.5 w-3.5 text-muted-foreground/70" />
								</BreadcrumbSeparator>

								{breadcrumbItems?.length > 0 ? (
									breadcrumbItems.map((item, index) => (
										<BreadcrumbItem key={index}>
											{index === breadcrumbItems.length - 1 ? (
												<BreadcrumbPage className="font-medium text-foreground">{item.label}</BreadcrumbPage>
											) : (
												<>
													<BreadcrumbLink
														href={item.href}
														className="text-muted-foreground hover:text-primary transition-colors duration-200"
													>
														{item.label}
													</BreadcrumbLink>
													<BreadcrumbSeparator>
														<ChevronRight className="h-3.5 w-3.5 text-muted-foreground/70" />
													</BreadcrumbSeparator>
												</>
											)}
										</BreadcrumbItem>
									))
								) : (
									<BreadcrumbItem>
										<BreadcrumbPage className="font-medium text-foreground">{breadcrumbTitle}</BreadcrumbPage>
									</BreadcrumbItem>
								)}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</div>
			</div>
		</div>
	)
}

