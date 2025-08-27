'use client'
import CategoryGrid4 from '@/components/landing/elements/category/CategoryGrid4'
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAllIndustry } from '@/fetchSwr'

export default function CategorySection4() {
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
					<div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-7 mt-20">
						{isLoading ? [...Array(8)].map((_, i) => (
							<div className="py-5 rounded-2xl text-left bg-card px-5" key={i}>
								<div className="h-20 w-20 flex items-center justify-center bg-primary/20 rounded-xl mb-5">
									<Skeleton className="h-12 w-12 mx-auto" />
								</div>
								<Skeleton className="h-4 w-[150px] mb-2" />
								<Skeleton className="h-4 w-[100px]" />
							</div>
						)) :
							industries?.slice(0, 12)?.map((item, i) => (
								<CategoryGrid4 item={item} key={i} />
							))}
					</div>
				</div>
			</div>
		</>
	)
}
