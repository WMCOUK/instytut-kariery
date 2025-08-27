'use client'
import City3 from "@/components/landing/elements/city/City3"
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAllLocation } from '@/fetchSwr'




const CitySection3 = () => {
	const { locations, isLoading } = fetchAllLocation()
	return (
		<>
			<div className="section-padding">
				<div className="container">
					<SectionTitle
						style={2}
						title="Popular Cities"
						subTitle="Thriving Hubs for Career Advancement and Exciting Opportunities"
					// linkText="All Categories"
					/>

					<div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-7 mt-20">
						{isLoading && [...Array(12)].map((_, i) => (
							<div className="block group" key={i}>
								<div className="city2-content relative text-center px-3 py-5 rounded-3xl">
									<div className="mx-auto rounded-full h-32 w-full">
										<Skeleton className="h-full w-full rounded-full" />
									</div>
									<div className="mt-4">
										<Skeleton className="h-6 w-3/4 mx-auto mb-2" />
										<Skeleton className="h-4 w-1/2 mx-auto" />
									</div>
								</div>
							</div>
						))}
						{locations?.map((item, i) => (
							<City3 item={item} key={i} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default CitySection3