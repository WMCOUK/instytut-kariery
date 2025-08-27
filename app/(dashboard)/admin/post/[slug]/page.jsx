import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
// import Comments from "@/components/admin/elements/Comments"
import VideoPopup from "@/components/landing/elements/VideoPopup"
import Comments from "@/components/landing/elements/Comments"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { calculateReadTime, formatDate } from "@/utils"
import { getPostDetails } from "@/utils/fetchServer"
import Link from "next/link"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const post = await getPostDetails(slug)
	return {
		title: post?.title,
		description: post?.description?.substring(0, 160),
		openGraph: {
			title: post?.title,
			description: post?.description?.substring(0, 160),
			images: [{ url: post?.img }],
		},
	}
}

export default async function PostDetails({ params }) {
	const { slug } = await params
	const post = await getPostDetails(slug)
	const formattedDate = formatDate(post?.createdAt)
	const readTime = calculateReadTime(post?.description || '')

	return (
		<LayoutAdmin>
			<article className="py-10 md:py-20 animate-fade-in">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						{/* Post Header */}
						<header className="text-center mb-12">
							<Badge variant="outline" className="capitalize mb-4">
								{post?.catSlug}
							</Badge>
							<h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
								{post?.title}
							</h1>
							<div className="flex justify-center items-center space-x-4">
								<Avatar className="w-12 h-12">
									<AvatarImage src={post?.user?.image} alt={post?.user?.name} />
								</Avatar>
								<div className="text-left">
									<p className="text-gray-700 dark:text-gray-300 font-medium">
										{post?.user?.name}
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{formattedDate} · {readTime} min read
									</p>
								</div>
							</div>
						</header>

						{/* Featured Image with Video Popup */}
						<div className="relative aspect-video mb-12 rounded-xl overflow-hidden shadow-lg">
							<div
								className="absolute inset-0 bg-cover bg-center"
								style={{ backgroundImage: `url("${post?.img}")` }}
							>
								<div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>
							</div>
							<div className="absolute inset-0 flex items-center justify-center">
								<VideoPopup videoId={post?.videoId} style={5} />
							</div>
						</div>

						{/* Post Content */}
						<Card className="p-6 md:p-10 mb-12 prose dark:prose-invert max-w-none">
							{post?.description ? (
								<div dangerouslySetInnerHTML={{ __html: post.description }} />
							) : (
								<p className="text-gray-500 dark:text-gray-400">
									No description available.
								</p>
							)}
						</Card>

						{/* Tags */}
						<div className="mb-12">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
								Tags
							</h2>
							<div className="flex flex-wrap gap-2">
								{post?.tags.map((tag, i) => (
									<Link key={i} href={`/tag/${tag}`}>
										<Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
											{tag}
										</Badge>
									</Link>
								))}
							</div>
						</div>

						{/* Author Bio */}
						<Card className="flex flex-col md:flex-row items-start p-6 md:p-10 mb-12 bg-gray-50 dark:bg-gray-800/50">
							<Avatar className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-0 md:mr-6">
								<AvatarImage src={post?.user?.image} alt={post?.user?.name} />
							</Avatar>
							<div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									{post?.user?.name}
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
									{post?.user?.designation}
								</p>
								<p className="text-gray-600 dark:text-gray-300">
									{post?.user?.bio}
								</p>
							</div>
						</Card>

						{/* Comments Section */}
						<Separator className="my-12" />
						<Comments postSlug={slug} />
					</div>
				</div>
			</article>
		</LayoutAdmin>
	)
}

