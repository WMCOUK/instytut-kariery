'use client'
import JobList2 from '@/components/landing/elements/job/JobList2'
import SectionTitle2 from '@/components/landing/elements/SectionTitle/SectionTitle2'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchFeaturedJob } from '@/fetchSwr'

export default function FeaturedSection1() {
	const { jobs, isLoading } = fetchFeaturedJob()
	return (
		<>
			<div className="section-padding">
				<div className="container">
					<SectionTitle2
						title="Latest Job"
						subTitle="Explore Exciting Opportunities with Prominent Employers"
					// linkTitle="All Job Offers"
					// url="jobs"
					/>
					<div className="max-w-4xl mx-auto">
						<div className="grid xl:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-4">
							{isLoading ? [...Array(6)].map((_, i) => (
								<div className="group" key={i}>
									<div className="relative px-6 pt-5 pb-5 rounded-xl bg-primary/5">
										<div className="flex items-center">
											<Skeleton className="w-12 h-12 rounded-xl" />
											<div className="ml-4">
												<Skeleton className="h-4 w-24 mb-2" />
												<Skeleton className="h-3 w-32" />
											</div>
										</div>
										<div className="mt-4">
											<Skeleton className="h-6 w-full" />
										</div>
										<div className="my-3 flex space-x-2">
											{[...Array(3)].map((_, i) => (
												<Skeleton key={i} className="h-5 w-16 rounded-xl" />
											))}
										</div>
										<div className="flex items-center justify-between mt-5">
											<Skeleton className="h-4 w-20" />
											<Skeleton className="h-4 w-16" />
										</div>
									</div>
								</div>
							)) : jobs?.slice(0, 6).map((item, i) => (
								<JobList2 item={item} key={i} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}


