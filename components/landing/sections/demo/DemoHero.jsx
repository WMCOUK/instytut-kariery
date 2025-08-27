"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const TypedText = ({ words }) => {
	const [currentWordIndex, setCurrentWordIndex] = useState(0)
	const [currentText, setCurrentText] = useState("")
	const [isDeleting, setIsDeleting] = useState(false)

	useEffect(() => {
		const typingInterval = 100 // Adjust for typing speed
		const deletingInterval = 50 // Adjust for deleting speed
		const pauseInterval = 1000 // Pause before deleting

		const type = () => {
			const currentWord = words[currentWordIndex]

			if (isDeleting) {
				setCurrentText(currentWord.substring(0, currentText.length - 1))
			} else {
				setCurrentText(currentWord.substring(0, currentText.length + 1))
			}

			if (!isDeleting && currentText === currentWord) {
				setTimeout(() => setIsDeleting(true), pauseInterval)
			} else if (isDeleting && currentText === "") {
				setIsDeleting(false)
				setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
			}
		}

		const timer = setTimeout(type, isDeleting ? deletingInterval : typingInterval)
		return () => clearTimeout(timer)
	}, [currentText, isDeleting, currentWordIndex, words])

	return <span className="">{currentText}</span>
}

export default function DemoHero() {
	return (
		<section id="hero" className="relative overflow-hidden bg-background py-20">
			<div className="container px-4 md:px-6">
				<div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-20">
					<div className="flex flex-col justify-center space-y-8">
						<div className="space-y-6">
							<div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
								New on CodeCanyon
							</div>
							<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
								The Ultimate <span className="text-primary">Recruitment</span>{" "}
								<TypedText words={["Solution", "Platform", "Ecosystem"]} />
							</h1>
							<p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
								A complete, customizable Recruitment platform that connects employers with talent. Ready to deploy, easy
								to customize.
							</p>
						</div>

						<div className="flex flex-col gap-3 min-[400px]:flex-row">
							<Button size="lg" asChild>
								<Link href="#pages">
									View Demo <ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<Link href="#packages">Buy Now</Link>
							</Button>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							{["Full-stack solution", "Responsive design", "Admin dashboard", "Payment integration"].map(
								(feature, index) => (
									<div key={index} className="flex items-center gap-2">
										<CheckCircle className="h-5 w-5 text-primary" />
										<span className="text-sm">{feature}</span>
									</div>
								),
							)}
						</div>
					</div>

					<div className="relative flex items-center justify-center lg:justify-end">
						<div className="relative w-full max-w-[600px]">
							{/* Desktop View */}
							<div className="relative z-10 overflow-hidden rounded-lg border shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3),0_0_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-15px_rgba(255,255,255,0.1),0_0_20px_-5px_rgba(255,255,255,0.05)]">
								<Image
									src="/images/demo/landing/hero1.png"
									width={800}
									height={600}
									alt="Recruitment Landing Page"
									className="w-full object-cover"
									priority
								/>
							</div>
							{/* Dashboard View */}
							<div className="absolute -bottom-6 -left-6 z-20 w-3/4 overflow-hidden rounded-lg border border-primary bg-background shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3),0_0_20px_-5px_rgba(0,0,0,0.1),0_0_0_4px_rgba(6,81,237,0.3)] dark:shadow-[0_10px_40px_-15px_rgba(255,255,255,0.1),0_0_20px_-5px_rgba(255,255,255,0.05),0_0_0_4px_rgba(6,81,237,0.3)]">
								<Image
									src="/images/demo/landing/hero2.png"
									width={600}
									height={400}
									alt="Recruitment Dashboard"
									className="w-full object-cover"
								/>
							</div>
							{/* Mobile View */}
							<div className="absolute -bottom-6 -right-5 z-30 w-1/3 overflow-hidden rounded-[2rem] border border-primary bg-background shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3),0_0_20px_-5px_rgba(0,0,0,0.1),0_0_0_4px_rgba(6,81,237,0.3)] dark:shadow-[0_10px_40px_-15px_rgba(255,255,255,0.1),0_0_20px_-5px_rgba(255,255,255,0.05),0_0_0_4px_rgba(6,81,237,0.3)]">
								<div className="relative pb-[200%]">
									<Image
										src="/images/demo/landing/hero3.png"
										fill
										alt="Recruitment Mobile View"
										className="object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Background decoration */}
			<div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
			<div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
		</section>
	)
}

