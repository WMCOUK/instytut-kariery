"use client"

import CategoryGrid1 from "@/components/landing/elements/category/CategoryGrid1"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function CategorySlider1({ industries = [] }) {
	if (industries.length === 0) return null

	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			className="w-full"
		>
			<CarouselContent>
				{industries.map((item) => (
					<CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
						<CategoryGrid1 item={item} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
