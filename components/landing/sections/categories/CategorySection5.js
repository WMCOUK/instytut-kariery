'use client'
import CategoryGrid5 from '@/components/landing/elements/category/CategoryGrid5'
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAllIndustry } from '@/fetchSwr'

export default function CategorySection5() {
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
					<div className="grid  grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-7 mt-20">
						{isLoading ? [...Array(8)].map((_, i) => (
							<div className="px-5 py-5 border rounded-2xl" key={i}>
								<Skeleton className="h-4 w-[100px] mb-4 rounded-xl" />
								<div className="py-8">
									<Skeleton className="h-12 w-12 mx-auto" />
								</div>
								<Skeleton className="h-4 w-[150px] mx-auto" />
							</div>
						)) :
							industries?.slice(0, 10)?.map((item, i) => (
								<CategoryGrid5 item={item} key={i} />
							))}
					</div>
				</div>
			</div>
		</>
	)
}
