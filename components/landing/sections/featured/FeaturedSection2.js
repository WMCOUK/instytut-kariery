'use client'
import JobGrid2 from '@/components/landing/elements/job/JobGrid2'
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchFeaturedJob } from '@/fetchSwr'

export default function FeaturedSection2() {
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

					<div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-7 mt-20">
						{isLoading ? [...Array(4)].map((_, i) => (
							<div className="group cursor-pointer rounded-xl border border-muted-foreground/10 transition-all hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/5 hover:border-primary" key={i}>
								<div className="p-6">
									<div className="flex flex-col md:flex-row items-start md:items-center justify-between">
										<div className="flex items-center">
											<Skeleton className="w-12 h-12 rounded-lg bg-muted/20" />
											<div className="ml-3">
												<Skeleton className="h-4 w-32 mb-2" />
												<div className="flex mt-1 space-x-3 text-sm">
													<Skeleton className="h-4 w-20" />
													<Skeleton className="h-4 w-16" />
													<Skeleton className="h-4 w-24" />
												</div>
											</div>
										</div>
										<Skeleton className="mt-4 md:mt-0 h-8 w-24 rounded-lg" />
									</div>

									<Skeleton className="mt-5 h-6 w-3/4" />
									<Skeleton className="my-3 h-4 w-full" />
									<Skeleton className="h-4 w-5/6" />

									<div className="flex items-center justify-between mt-5">
										<Skeleton className="h-4 w-32" />
										<Skeleton className="h-6 w-20 rounded-lg" />
									</div>
								</div>
							</div>
						)) : jobs?.slice(0, 4)?.map((item, i) => (
							<JobGrid2 item={item} key={i} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

