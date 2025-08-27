"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"

const brands = [
	{ id: 1, src: "/images/brand/1.png" },
	{ id: 2, src: "/images/brand/2.png" },
	{ id: 3, src: "/images/brand/3.png" },
	{ id: 4, src: "/images/brand/4.png" },
	{ id: 5, src: "/images/brand/5.png" },
	{ id: 6, src: "/images/brand/1.png" },
	{ id: 7, src: "/images/brand/2.png" },
	{ id: 8, src: "/images/brand/3.png" },
	{ id: 9, src: "/images/brand/4.png" },
	{ id: 10, src: "/images/brand/5.png" },
]

const BrandSlider2 = () => {

	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 2000,
				}),
			]}
			className="w-full"
		>
			<CarouselContent>
				{brands.map((brand) => (
					<CarouselItem key={brand.id} className="basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
						<Link href="#" className="flex items-center bg-background/50 border border-primary/10 gap-5  h-20 rounded-lg shadow-lg">
							<Image
								className="mt-2 max-w-[90px] mx-auto transition-all duration-300 hover:scale-110"
								src={brand.src || "/placeholder.svg"}
								alt={`Brand ${brand.id}`}
								width={90}
								height={90}
							/>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	)
}

export default BrandSlider2

