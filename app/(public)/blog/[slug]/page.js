import Comments from "@/components/landing/elements/Comments"
import VideoPopup from "@/components/landing/elements/VideoPopup"
import LayoutLanding1 from "@/components/landing/layout/landing/LayoutLanding1"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/utils"
import { getPostDetails } from "@/utils/fetchServer"
import { CalendarIcon, Tag, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata({ params }) {
	const { slug } = params
	const post = await getPostDetails(slug)

	return {
		title: post?.title,
		description: post?.excerpt || `Read about ${post?.title}`,
		openGraph: {
			title: post?.title,
			description: post?.excerpt || `Read about ${post?.title}`,
			images: post?.img ? [{ url: post.img }] : undefined,
		},
	}
}

export default async function PostDetails({ params }) {
	const { slug } = await params
	const post = await getPostDetails(slug)
	const formattedDate = formatDate(post?.createdAt)
	console.log(post);
	

	// Get first letter of author name for avatar fallback
	const authorInitial = post?.user?.personal?.name ? post?.user?.personal?.name.charAt(0) : "U"

	return (
		<LayoutLanding1>
			<article className="py-12 sm:py-16 lg:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-5xl mx-auto">
						{/* Post Header */}
						<header className="text-center mb-12">
							<Link href={`/category/${post?.blogCategory?.slug || "#"}`}>
								<Badge
									variant="outline"
									className="text-xs font-medium capitalize mb-3 hover:bg-secondary/10 transition-colors"
								>
									{post?.blogCategory?.title}
								</Badge>
							</Link>
							<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-4 text-foreground tracking-tight">
								{post?.title}
							</h1>
							<div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
								<span className="flex items-center">
									<CalendarIcon className="mr-1.5 h-4 w-4" />
									{formattedDate}
								</span>
								<span className="flex items-center">
									<User className="mr-1.5 h-4 w-4" />
									{post?.user?.personal?.name}
								</span>
							</div>
						</header>

						{/* Featured Image with Video Popup */}
						<figure className="relative aspect-video mb-12 rounded-lg overflow-hidden shadow-lg">
							{post?.img ? (
								<Image
									src={post.img || "/placeholder.svg"}
									alt={post?.title || "Blog post featured image"}
									fill
									priority
									className="object-cover w-full h-full"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
								/>
							) : (
								<div className="w-full h-full bg-muted flex items-center justify-center">
									<span className="text-muted-foreground">No image available</span>
								</div>
							)}
							{post?.videoId && (
								<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
									<VideoPopup videoId={post.videoId} style={5} />
								</div>
							)}
						</figure>

						{/* Post Content */}
						<div className="p-6 sm:p-8 mb-12">
							<div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg">
								{post?.description ? (
									<div dangerouslySetInnerHTML={{ __html: post.description }} />
								) : (
									<p className="text-muted-foreground">No description available.</p>
								)}
							</div>
						</div>

						{/* Tags */}
						<section className="mb-12">
							<h2 className="text-xl font-semibold mb-4 text-foreground">Tags</h2>
							<div className="flex flex-wrap gap-2">
								{post?.tags?.length > 0 ? (
									post.tags.map((tag, i) => (
										<Link key={i} href={`/tag/${tag}`}>
											<Badge
												variant="secondary"
												className="text-xs py-1 px-2 rounded-full hover:bg-secondary/80 transition-colors"
											>
												<Tag className="mr-1 h-3 w-3" />
												{tag}
											</Badge>
										</Link>
									))
								) : (
									<span className="text-sm text-muted-foreground">No tags available</span>
								)}
							</div>
						</section>

						{/* Author Bio */}
						<Card className="p-6 sm:p-8 mb-12 shadow-md bg-card/50 backdrop-blur-sm">
							<div className="flex items-center space-x-4">
								<Avatar className="h-16 w-16 border border-primary/10">
									<AvatarImage src={post?.user?.personal?.image} alt={post?.user?.personal?.name || "Author"} />
									<AvatarFallback className="bg-primary/10 text-primary">{authorInitial}</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="text-lg font-semibold mb-1 text-foreground">{post?.user?.personal?.name}</h3>
									<p className="text-sm text-muted-foreground">{post?.user?.personal?.designation}</p>
								</div>
							</div>
							<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
								{post?.user?.personal?.bio || "No author bio available."}
							</p>
						</Card>

						{/* Comments Section */}
						<Separator className="my-12" />
						<Comments postSlug={slug} />
					</div>
				</div>
			</article>
		</LayoutLanding1>
	)
}

