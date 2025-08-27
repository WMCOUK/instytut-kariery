'use client'

import Testimonial1 from "@/components/landing/elements/testimonial/Testimonial1"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const data = [
	{
		title: "Avy",
		img: "1.png"
	},
	{
		title: "Mark",
		img: "2.png"
	},
	{
		title: "Avy",
		img: "3.png"
	},
	{
		title: "Mark",
		img: "4.png"
	},
	{
		title: "Avy",
		img: "5.png"
	},
	{
		title: "Mark",
		img: "6.png"
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
	// Navigation
	navigation: {
		nextEl: '.h1n',
		prevEl: '.h1p',
	},
}

export default function TestimonalSlider1() {
	return (
		<>
			<Swiper {...swiperOptions} className="relative max-w-4xl">
				{data.map((item, i) => (
					<SwiperSlide key={i}>
						<Testimonial1 item={item} />
					</SwiperSlide>
				))}
				<div className="absolute top-[47%] left-0 -right-0 flex justify-between z-10">
					<div className="prev h1p cursor-pointer">
						<button className='bg-primary/60 hover:bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center rounded-full shadow-md transition-colors duration-200'>
							<ChevronLeft size={24} />
						</button>
					</div>
					<div className="next h1n cursor-pointer">
						<button className='bg-primary/60 hover:bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center rounded-full shadow-md transition-colors duration-200'>
							<ChevronRight size={24} />
						</button>
					</div>
				</div>
			</Swiper>
		</>
	)
}



