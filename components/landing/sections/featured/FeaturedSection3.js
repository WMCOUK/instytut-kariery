'use client'
import JobGrid3 from '@/components/landing/elements/job/JobGrid3'
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchFeaturedJob } from '@/fetchSwr'

export default function FeaturedSection3() {
	const { jobs, isLoading } = fetchFeaturedJob()
	return (
		<>
			<div className="section-padding">
				<div className="container">
					<SectionTitle
						style={1}
						title="Featured Job Offers"
						subTitle="Explore Exciting Opportunities with Prominent Employers"
						linkTitle="All Job Offers"
						url="jobs"
					/>

					<div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-7 mt-20">
						{isLoading ? [...Array(6)].map((_, i) => (
							<div className="group overflow-hidden transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/5 border-0" key={i}>
								<div className="p-0">
									<div className="relative bg-gradient-to-br from-primary/5 to-primary/10 px-6 pt-5 pb-5 group-hover:bg-primary/80 transition-all duration-500 ease-in-out">
										<div className="flex items-center justify-between mb-4">
											<div className="flex items-center mr-3">
												<Skeleton className="relative overflow-hidden rounded-lg w-14 h-14 bg-muted/20" />
												<div className="ml-4">
													<Skeleton className="h-5 w-36 mb-2" />
													<Skeleton className="h-4 w-52" />
												</div>
											</div>
										</div>

										<div className="flex flex-wrap gap-2 mb-4">
											{[...Array(4)].map((_, i) => (
												<Skeleton key={i} className="h-6 w-16 rounded-lg bg-muted/20" />
											))}
											<Skeleton className="h-6 w-20 rounded-lg bg-muted/20" />
										</div>

										<div className="flex items-center justify-between text-sm">
											<Skeleton className="h-4 w-32" />
											<Skeleton className="h-4 w-40" />
										</div>

										<div className="absolute top-1/2 -right-12 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
											<Skeleton className="w-8 h-8 rounded-full bg-muted/20" />
										</div>
									</div>
								</div>
							</div>
						)) : jobs?.slice(0, 6)?.map((item, i) => (
							<JobGrid3 item={item} key={i} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

