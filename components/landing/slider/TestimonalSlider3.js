"use client"

import Testimonial3 from "@/components/landing/elements/testimonial/Testimonial3"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useState } from "react"

const data = [
	{
		name: "Sarah Johnson",
		position: "UX Designer",
		img: "1.png",
	},
	{
		name: "Mark Williams",
		position: "Software Engineer",
		img: "2.png",
	},
	{
		name: "Emily Chen",
		position: "Product Manager",
		img: "3.png",
	},
	{
		name: "David Rodriguez",
		position: "Marketing Specialist",
		img: "4.png",
	},
	{
		name: "Aisha Patel",
		position: "Data Analyst",
		img: "5.png",
	},
	{
		name: "Michael Thompson",
		position: "Frontend Developer",
		img: "6.png",
	},
]

const TestimonialCarousel = () => {
	const [api, setApi] = useState(null)
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!api) return

		setCount(api.scrollSnapList().length)

		const handleSelect = () => {
			setCurrent(api.selectedScrollSnap())
		}

		api.on("select", handleSelect)

		return () => {
			api.off("select", handleSelect)
		}
	}, [api])

	return (
		<div className="relative">
			<Carousel
				className="w-full"
				setApi={setApi}
				opts={{
					align: "start",
					loop: true,
				}}
			>
				<CarouselContent className="-ml-2 md:-ml-4">
					{data.map((item, index) => (
						<CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
							<div className="p-1">
								<Testimonial3 item={item} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				{/* Navigation controls */}
				<div className="flex items-center justify-center mt-8 gap-4">
					<CarouselPrevious
						variant="outline"
						className="relative static transform-none h-9 w-9 rounded-full border-primary/20 hover:bg-primary/5 hover:border-primary/30"
					/>

					{/* Indicators */}
					<div className="flex items-center gap-1.5">
						{Array.from({ length: count }).map((_, i) => (
							<button
								key={i}
								onClick={() => api?.scrollTo(i)}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${current === i ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/50"
									}`}
								aria-label={`Go to slide ${i + 1}`}
							/>
						))}
					</div>

					<CarouselNext
						variant="outline"
						className="relative static transform-none h-9 w-9 rounded-full border-primary/20 hover:bg-primary/5 hover:border-primary/30"
					/>
				</div>
			</Carousel>
		</div>
	)
}

export default TestimonialCarousel

