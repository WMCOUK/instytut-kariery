"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import Price1 from "../../elements/price/Price1"
import HeroSearch from "../../elements/search/HeroSearch"

export default function HeroSection3() {
	const t = useTranslations("landing.hero3")
	const [mounted, setMounted] = useState(false)
	const heroRef = useRef(null)

	// Animation timing control
	useEffect(() => {
		setMounted(true)

		// Cleanup function
		return () => {
			setMounted(false)
		}
	}, [])

	return (
		<section
			ref={heroRef}
			className="relative flex flex-col justify-center items-center overflow-hidden min-h-[70vh] bg-gradient-to-br from-purple-100 via-blue-100 to-teal-100 dark:from-purple-950/30 dark:via-blue-950/30 dark:to-teal-950/30"
		>
			{/* Animated background decorations */}
			<div className="absolute inset-0 overflow-hidden">

				{/* Animated particles */}
				<div className="particle-container absolute inset-0">
					{[...Array(30)].map((_, index) => (
						<div
							key={index}
							className={`particle absolute rounded-full bg-primary/30 dark:bg-primary/50 
                ${index % 3 === 0 ? "w-1 h-1" : index % 3 === 1 ? "w-1.5 h-1.5" : "w-2 h-2"}`}
							style={{
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
								animationDuration: `${Math.random() * 10 + 10}s`,
								animationDelay: `${Math.random() * 5}s`,
							}}
						/>
					))}
				</div>

				{/* Geometric shapes */}
				<div className="absolute inset-0">
					{/* Light mode shapes */}
					<div className="dark:opacity-0 transition-opacity duration-500">
						<div className="absolute top-[5%] left-[5%] w-64 h-64 rounded-full border border-primary/10 opacity-70"></div>
						<div className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full border border-blue-400/10 opacity-70"></div>
						<div className="absolute top-[20%] right-[20%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-400/5 to-blue-400/5 blur-xl"></div>
						<div className="absolute bottom-[30%] left-[15%] w-48 h-48 rounded-full bg-gradient-to-tr from-blue-400/5 to-teal-400/5 blur-xl"></div>
					</div>

					{/* Dark mode shapes - more vibrant */}
					<div className="opacity-0 dark:opacity-100 transition-opacity duration-500">
						<div className="absolute top-[5%] left-[5%] w-64 h-64 rounded-full border border-primary/20 opacity-70"></div>
						<div className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full border border-blue-400/20 opacity-70"></div>
						<div className="absolute top-[20%] right-[20%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-400/10 to-blue-400/10 blur-xl"></div>
						<div className="absolute bottom-[30%] left-[15%] w-48 h-48 rounded-full bg-gradient-to-tr from-blue-400/10 to-teal-400/10 blur-xl"></div>
					</div>
				</div>

				{/* Animated gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 dark:from-transparent dark:via-background/10 dark:to-background/30 animate-pulse-slow"></div>

				{/* Grid pattern */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 lg:py-36 relative z-10">
				<div className="max-w-4xl mx-auto text-center">
					{/* Animated highlight for title */}
					<div className="relative inline-block">
						<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-3 sm:mb-4 md:mb-6 relative z-10">
							<span className="relative">
								{t("title")}
								{/* <span className="absolute -bottom-1 left-0 w-full h-3 bg-primary/20 dark:bg-primary/30 rounded-full -z-10 animate-pulse-slow"></span> */}
							</span>
							<br className="hidden sm:block" />
							{t("titleContinued")}
						</h1>
					</div>

					<p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 mb-5 sm:mb-6 md:mb-8 max-w-3xl mx-auto">
						{t("description")}
					</p>

					<div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-fit mx-auto">
						<Price1 />

						<div className="flex justify-center items-center gap-1 sm:gap-2 mt-3 sm:mt-0">
							<div className="flex -space-x-2 sm:-space-x-3 animate-fade-in">
								{[1, 2, 3, 4].map((index) => (
									<Avatar
										key={index}
										className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-2 border-background transition-all duration-300 hover:scale-110 hover:z-10 opacity-0 animate-fade-in`}
										style={{ animationDelay: `${index * 150}ms` }}
									>
										<AvatarImage src={`/images/avatar/${index}.png?height=32&width=32`} alt={`User ${index}`} />
									</Avatar>
								))}
							</div>
							<span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
								Reach 100K+ Professionals
							</span>
						</div>
					</div>

					<div className="flex justify-center mt-8 sm:mt-10 md:mt-12 w-full mx-auto px-2 sm:px-4 relative">
						{/* Search highlight effect */}
						<div className="absolute -inset-4 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-full blur-xl opacity-70 animate-pulse-slow"></div>
						<div className="relative w-full">
							<HeroSearch />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

