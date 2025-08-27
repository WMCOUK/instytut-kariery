// import Filter1 from '@/components/elements/Filter1'
// import Pagination from '@/components/elements/Pagination'
// import BlogGrid1 from '@/components/elements/blog/BlogGrid1'
import BlogGrid1 from '@/components/landing/elements/blog/BlogGrid1'
import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import NewsletterSection1 from '@/components/landing/sections/newsletter/NewsletterSection1'
// import NewsletterSection1 from '@/components/sections/landing/newsletter/Newsletter1'
import { Skeleton } from '@/components/ui/skeleton'
import { getTagDetails } from "@/utils/fetchServer"

export default async function TagsPage({ params }) {
	const { slug } = await params
	const post = await getTagDetails(slug)
	const isLoading = !post

	return (
		<LayoutLanding1
			breadcrumbTitle={"Our Blog"}
			breadcrumbSubTitle={"Work for the best companies in the world"}
			// breadcrumbAlign={"center"}
			// headerBg={"transparent"}
			isTransparentHeader
		>
			<div className="section-padding">
				<div className="container">
					{/* <Filter1 content="Blog" /> */}
					<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12">
						{isLoading && [...Array(6)].map((_, i) => (
							<div className="w-full mb-8 bg-card rounded-xl border-0 animate-pulse" key={i}>
								<div className="block">
									<div className="p-0">
										<Skeleton className="relative w-full aspect-video rounded-t-xl overflow-hidden" />
									</div>
									<div className="py-8 px-5">
										<div className="mb-3 text-sm">
											<Skeleton className="inline-block py-1 px-3 text-xs font-semibold  rounded-xl mr-3 w-20 h-6" />
										</div>
										<div className="my-2 text-xl font-semibold">
											<Skeleton className=" h-6 w-3/4 rounded" />
										</div>
										<div className=" leading-loose">
											<Skeleton className="h-4 w-full  rounded my-2" />
										</div>
										<div className=" leading-loose">
											<Skeleton className="h-4 w-5/6  rounded" />
										</div>
									</div>
								</div>
							</div>
						))}
						{post?.map((item, i) => (
							<BlogGrid1 item={item} key={i} />
						))}
					</div>
					{/* <Pagination /> */}
				</div>
			</div>
			<NewsletterSection1 />
		</LayoutLanding1>
	)
}

