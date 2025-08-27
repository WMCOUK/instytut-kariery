'use client'
import CategoryGrid2 from '@/components/landing/elements/category/CategoryGrid2'
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAllIndustry } from '@/fetchSwr'

export default function CategorySection2() {
	const { industries, totalIndustry, mutate, isLoading } = fetchAllIndustry()
	return (
		<>
			<div className="py-12 md:py-24 lg:py-32">
				<div className="container">
					<SectionTitle
						style={1}
						title="Top Categories"
						subTitle="Explore Exciting Opportunities in the Digital World"
						linkTitle="All Categories"
						url="jobs"
					/>
					<div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  xxl:grid-cols-4 gap-7 mt-20">
						{isLoading ? [...Array(8)].map((_, i) => (
							<div className="flex items-center border border-border rounded-xl" key={i}>
								<div className="py-6 px-6 bg-muted rounded-xl">
									<Skeleton className="h-12 w-12 mx-auto" />
								</div>
								<div className="ml-4 space-y-2">
									<Skeleton className="h-4 w-[150px]" />
									<Skeleton className="h-4 w-[100px]" />
								</div>
							</div>
						)) :
							industries?.slice(0, 8)?.map((item, i) => (
								<CategoryGrid2 item={item} key={i} style={2} />
							))
						}
					</div>
				</div>
			</div>
		</>
	)
}



