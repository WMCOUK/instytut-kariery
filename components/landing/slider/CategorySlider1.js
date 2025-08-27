"use client"

import CategoryGrid1 from "@/components/landing/elements/category/CategoryGrid1"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchAllIndustry } from "@/fetchSwr"

const CategorySlider1 = () => {
	const { industries, isLoading } = fetchAllIndustry(1)

	return (
		<>
			{isLoading && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
					{[...Array(6)].map((_, i) => (
						<div className="px-5 py-5 bg-card rounded-xl text-center" key={i}>
							<div className="py-8">
								<Skeleton className="h-12 w-12 mx-auto" />
							</div>
							<Skeleton className="h-4 w-[100px] mx-auto mb-2" />
							<Skeleton className="h-4 w-[120px] mx-auto mb-5" />
							<Skeleton className="h-4 w-[150px] mx-auto" />
						</div>
					))}
				</div>
			)}
			{!isLoading && industries && (
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent>
						{industries.map((item, index) => (
							<CarouselItem key={index} className="sm:basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
								<CategoryGrid1 item={item} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			)}
		</>
	)
}

export default CategorySlider1

