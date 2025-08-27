'use client'
import BlogGrid3 from "@/components/landing/elements/blog/BlogGrid3"
import SectionTitle from "@/components/landing/elements/SectionTitle/SectionTitle1"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchQueryPost } from "@/fetchSwr"
export default function BlogFeatured2() {
	const { posts, count, isLoading } = fetchQueryPost(1)
	return (
		<>

			<div className="section-padding">
				<div className="container">
					<SectionTitle
						style={2}
						title="Exploring the World of Knowledge"
						subTitle="Unleash Your Curiosity with Engaging Articles, Expert Opinions, and Inspiring Stories"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-5 mt-20">
						{isLoading && [...Array(3)].map((_, i) => (
							<div className="w-full mb-8 rounded-2xl" key={i}>
								<div className="py-8 px-5">
									<Skeleton className="h-4 mb-3 w-1/3" />
									<Skeleton className="h-8 mb-2 w-1/2" />
									<Skeleton className="h-4 w-4/5" />

									<div className="inline-flex items-center text-gray-800 text-sm mt-5">
										<div className="flex-shrink-0 relative flex items-center space-x-2">
											<Skeleton className="h-8 w-8 rounded-full" />
											<Skeleton className="h-4 w-24" />
										</div>
									</div>
								</div>
							</div>
						))}
						{posts?.slice(0, 3)?.map((item, i) => (
							<BlogGrid3 item={item} key={i} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}