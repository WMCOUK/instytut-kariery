'use client'

import Testimonial2 from "@/components/landing/elements/testimonial/Testimonial2"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

const data = [
	{
		title: "Avy",
		img: "1.png",
		position: "Software Engineer"
	},
	{
		title: "Mark",
		img: "2.png",
		position: "Product Manager"
	},
	{
		title: "Avy",
		img: "3.png",
		position: "UX Designer"
	},
	{
		title: "Mark",
		img: "4.png",
		position: "Marketing Specialist"
	},
	{
		title: "Avy",
		img: "5.png",
		position: "Data Analyst"
	},
	{
		title: "Mark",
		img: "6.png",
		position: "Project Coordinator"
	}
]

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
	spaceBetween: 30,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
	loop: true,
	pagination: {
		dynamicBullets: true,
		el: '.testimonial1-pagination',
		clickable: true,
	},
}

const NavigationButtons = () => {
	const swiper = useSwiper()

	return (
		<div className="absolute bottom-3 right-28 flex z-10">
			<Button
				variant="outline"
				size="icon"
				className="rounded-r-none border-r-0 hover:bg-primary hover:text-primary-foreground"
				onClick={() => swiper.slidePrev()}
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="icon"
				className="rounded-l-none hover:bg-primary hover:text-primary-foreground"
				onClick={() => swiper.slideNext()}
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	)
}

const TestimonalSlider2 = () => {
	return (
		<div className="relative max-w-2xl mx-auto">
			<Swiper {...swiperOptions}>
				{data.map((item, i) => (
					<SwiperSlide key={i}>
						<Testimonial2 item={item} />
					</SwiperSlide>
				))}
				<NavigationButtons />
			</Swiper>
		</div>
	)
}

export default TestimonalSlider2

