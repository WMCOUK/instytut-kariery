'use client'
import JobGrid5 from '@/components/landing/elements/job/JobGrid5'
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchFeaturedJob } from '@/fetchSwr'

export default function FeaturedSection5() {
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

					<div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 mt-20">
						{isLoading ? [...Array(6)].map((_, i) => (
							<div className="group overflow-hidden rounded-xl border border-muted-foreground/20 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/5" key={i}>
								<div className="relative px-6 pt-6 pb-5">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-4">
											<Skeleton className="w-12 h-12 rounded-lg" />
											<div>
												<Skeleton className="h-4 w-32 mb-2" />
												<Skeleton className="h-4 w-24" />
											</div>
										</div>
									</div>

									<div className="absolute top-6 right-6 flex space-x-2">
										<Skeleton className="h-8 w-8 rounded-full" />
										<Skeleton className="h-8 w-8 rounded-full" />
									</div>

									<div className="mt-4">
										<Skeleton className="h-6 w-48 mb-3" />
										<Skeleton className="h-4 w-full mb-2" />
										<Skeleton className="h-4 w-3/4" />
									</div>

									<div className="mt-4 flex flex-wrap gap-2">
										<Skeleton className="h-6 w-20 rounded-full" />
										<Skeleton className="h-6 w-20 rounded-full" />
										<Skeleton className="h-6 w-20 rounded-full" />
										<Skeleton className="h-6 w-28 rounded-full" />
									</div>
								</div>
							</div>
						)) : jobs?.slice(0, 6)?.map((item, i) => (
							<JobGrid5 item={item} key={i} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

