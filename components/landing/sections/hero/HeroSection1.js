"use client"

import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import HeroSearch from "../../elements/search/HeroSearch"

export default function HeroSection1() {
	return (
		<div>
			<section className="relative py-24 sm:py-30 md:py-36 lg:py-40 overflow-hidden bg-gradient-to-b from-background to-background/80">
				<div className="absolute inset-0 -z-10 opacity-100">
					<Image
						src="/images/bg/5.jpg?height=1080&width=1920"
						alt="Background pattern"
						fill
						className="object-cover"
					/>
				</div>

				<div className="container px-4 md:px-6 mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16 items-center">
						<div className="lg:col-span-3 flex flex-col justify-center space-y-4 sm:space-y-6  lg:mx-0">
							<div className="flex items-center space-x-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
								<Badge variant="outline" className="px-2 sm:px-3 py-1 border-primary/30 bg-primary/10 text-primary">
									<Image src="/images/icons/hand.svg" width={16} height={16} alt="Hand icon" className="mr-1.5" />
									Welcome to our platform
								</Badge>
							</div>

							<h1
								className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight animate-fade-up"
								style={{ animationDelay: "0.2s" }}
							>
								Find the perfect talent for your <br className="hidden lg:inline" />
								<span className="text-primary relative">
									next project
									<span className="absolute -z-10 bottom-1 sm:bottom-2 left-0 right-0 h-2 sm:h-3 bg-primary/20 rounded-full"></span>
								</span>
							</h1>

							<p
								className="text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-up"
								style={{ animationDelay: "0.3s" }}
							>
								Connect with top freelancers and agencies from around the world. Find the right skills for your project
								and build your business with confidence.
							</p>

							<div className="pt-2 sm:pt-4 animate-fade-up w-full" style={{ animationDelay: "0.4s" }}>
								<HeroSearch />
							</div>

							<div
								className="text-xs sm:text-sm md:text-base text-muted-foreground animate-fade-up"
								style={{ animationDelay: "0.5s" }}
							>
								<span className="font-medium text-foreground mr-2">Popular searches:</span>
								<div className="flex flex-wrap gap-2 mt-2">
									{["Web Developer", "UX Designer", "Content Writer", "Marketing Expert", "Mobile Developer"].map(
										(term, index) => (
											<Link
												key={index}
												href={`/jobs?search=${term.trim().toLowerCase()}`}
												className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-background rounded-full border hover:border-primary hover:bg-primary hover:text-white transition-colors duration-200"
											>
												{term.trim()}
											</Link>
										),
									)}
								</div>
							</div>
						</div>

						<div className="lg:col-span-2 relative h-[400px] sm:h-[500px] lg:h-[600px] mt-8 lg:mt-0 flex items-center justify-center">
							{/* Profile cards - responsive positioning and sizing */}
							<div className="rounded-full overflow-hidden absolute -left-4 sm:-left-8 md:-left-16 top-8 sm:top-16 z-10 shadow-lg bg-background p-2 sm:p-3 pr-4 sm:pr-6 flex items-center gap-2 sm:gap-3 hidden sm:flex">
								<div className="relative w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden">
									<Image
										src="/images/avatar/1.png?height=40&width=40"
										alt="Web Developer profile"
										width={40}
										height={40}
										className="object-cover"
									/>
									<div className="absolute bottom-0 right-0 w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full border-2 border-background"></div>
								</div>
								<div className="flex flex-col">
									<span className="text-sm sm:text-base font-medium">Sarah Chen</span>
									<div className="flex items-center">
										<span className="text-xs text-muted-foreground">Web Developer</span>
										<div className="flex items-center ml-2">
											<Star className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-500 text-yellow-500" />
											<span className="ml-1 text-xs sm:text-sm font-medium">4.9</span>
										</div>
									</div>
								</div>
							</div>

							<div className="rounded-full overflow-hidden absolute right-4 sm:right-8 md:right-12 top-[45%] z-10 shadow-lg bg-background p-2 sm:p-3 pr-4 sm:pr-6 flex items-center gap-2 sm:gap-3 hidden sm:flex">
								<div className="relative w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden">
									<Image
										src="/images/avatar/2.png?height=40&width=40"
										alt="UX Designer profile"
										width={40}
										height={40}
										className="object-cover"
									/>
									<div className="absolute bottom-0 right-0 w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full border-2 border-background"></div>
								</div>
								<div className="flex flex-col">
									<span className="text-sm sm:text-base font-medium">Marcus Johnson</span>
									<div className="flex items-center">
										<span className="text-xs text-muted-foreground">UX Designer</span>
										<div className="flex items-center ml-2">
											<Star className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-500 text-yellow-500" />
											<span className="ml-1 text-xs sm:text-sm font-medium">5.0</span>
										</div>
									</div>
								</div>
							</div>

							<div className="rounded-full overflow-hidden absolute -left-10 bottom-8 sm:-bottom-8 z-10 shadow-lg bg-background p-2 sm:p-3 pr-4 sm:pr-6 flex items-center gap-2 sm:gap-3 hidden sm:flex">
								<div className="relative w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden">
									<Image
										src="/images/avatar/3.png?height=40&width=40"
										alt="Marketing Specialist profile"
										width={40}
										height={40}
										className="object-cover"
									/>
									<div className="absolute bottom-0 right-0 w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full border-2 border-background"></div>
								</div>
								<div className="flex flex-col">
									<span className="text-sm sm:text-base font-medium">Aisha Patel</span>
									<div className="flex items-center">
										<span className="text-xs text-muted-foreground">Marketing Specialist</span>
										<div className="flex items-center ml-2">
											<Star className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-500 text-yellow-500" />
											<span className="ml-1 text-xs sm:text-sm font-medium">4.8</span>
										</div>
									</div>
								</div>
							</div>

							{/* Main image container with custom rounded shape - responsive height */}
							<div className="relative h-full w-full  mx-auto">
								{/* This is the main container with the custom rounded shape */}
								<div className="absolute inset-0 overflow-hidden rounded-[100px_15px_100px_15px] md:rounded-[180px_20px_180px_20px]">
									{/* Single full-height image */}
									<div className="h-full w-full relative">
										<Image src="/images/hero/1.jpg" alt="Cozy apartment interior" fill className="object-cover" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

