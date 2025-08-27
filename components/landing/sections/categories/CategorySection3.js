'use client'
import CategoryGrid3 from '@/components/landing/elements/category/CategoryGrid3'
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAllIndustry } from '@/fetchSwr'

export default function CategorySection3() {
	const { industries, totalIndustry, mutate, isLoading } = fetchAllIndustry()
	return (
		<>
			<div className="section-padding">
				<div className="container">
					<SectionTitle
						style={1}
						title="Top Categories"
						subTitle="Explore Exciting Opportunities in the Digital World"
						linkTitle="All Categories"
						url="jobs"
					/>
					<div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7 mt-20">
						{isLoading ? [...Array(8)].map((_, i) => (
							<div className="px-3 py-3 rounded-2xl text-center" key={i}>
								<div className="py-6">
									<Skeleton className="h-12 w-12 mx-auto" />
								</div>
								<Skeleton className="h-4 w-[100px] mx-auto mb-3" />
								<Skeleton className="h-4 w-[150px] mx-auto" />
							</div>
						)) :
							industries?.slice(0, 8)?.map((item, i) => (
								<CategoryGrid3 item={item} key={i} />
							))}
					</div>
				</div>
			</div>
		</>
	)
}
