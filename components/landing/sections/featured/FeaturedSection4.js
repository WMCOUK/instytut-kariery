'use client'
import JobGrid4 from '@/components/landing/elements/job/JobGrid4'
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchFeaturedJob } from '@/fetchSwr'

export default function FeaturedSection4() {
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
							<div className="group overflow-hidden rounded-xl border border-muted-foreground/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/5" key={i}>
								<div className="p-6">
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<Skeleton className="w-12 h-12 rounded-lg bg-muted/20" />
											<div className="ml-4">
												<Skeleton className="h-5 w-32 mb-2" />
												<Skeleton className="h-4 w-20" />
											</div>
										</div>
										<Skeleton className="h-6 w-20 rounded-lg bg-muted/20" />
									</div>

									<div className="mt-5">
										<Skeleton className="h-6 w-48 mb-4" />
										<div className="w-full bg-muted/20 rounded-full h-2">
											<Skeleton className="h-2 rounded-full bg-primary/20" style={{ width: "50%" }} />
										</div>
									</div>

									<div className="mt-6 flex items-center justify-between">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-4 w-32" />
									</div>
								</div>
							</div>
						)) : jobs?.slice(0, 6)?.map((item, i) => (
							<JobGrid4 item={item} key={i} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

