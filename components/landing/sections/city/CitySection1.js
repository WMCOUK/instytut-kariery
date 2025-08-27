'use client'
import City1 from '@/components/landing/elements/city/City1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAllLocation } from '@/fetchSwr'
import SectionTitle2 from '../../elements/SectionTitle/SectionTitle2'




export default function CitySection1() {
	const { locations, isLoading } = fetchAllLocation()
	return (
		<>
			<div className="section-padding">
				<div className="container">
					<SectionTitle2
						title="Popular Cities"
						subTitle="Thriving Hubs for Career Advancement and Exciting Opportunities"
					// linkText="All Categories"
					/>

					<div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-7 mt-20">
						{isLoading && [...Array(6)].map((_, i) => (
							<div className="block group" key={i}>
								<div className="city1-content relative bg-card text-center px-3 py-5 rounded-xl my-5">
									<div className="my-4 rounded-xl mx-auto absolute -top-12 left-0 right-0 bottom-0">
										<Skeleton className="w-24 h-24 mx-auto rounded-xl" />
									</div>
									<div className="mt-16">
										<Skeleton className="h-5 w-3/4 mx-auto mb-3" />
										<Skeleton className="h-3 w-1/2 mx-auto" />
									</div>
								</div>
							</div>
						))}
						{locations?.slice(6,12).map((item, i) => (
							<City1 item={item} key={i} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

