import { formatDate, truncateToWords } from "@/utils"
import Image from "next/image"
import Link from "next/link"

const BlogGrid3 = ({ item }) => {
	const { slug, title, img, subTitle, user, blogCategory } = item || {}
	const date = formatDate(item?.createdAt)
	const trunateTitle = truncateToWords(title, 6)
	return (
		<div className="w-full mb-8 rounded-2xl bg-card">
			<Link href={`/blog/${slug}`}>
				<div className="py-8 px-5">
					<p className="mb-3 text-sm text-muted-foreground">
						<span className="inline-block py-1 px-3 text-xs font-semibold bg-secondary text-secondary-foreground rounded-xl mr-3">
							{blogCategory?.title || "Uncategorized"}
						</span>
						<span className="text-muted-foreground text-xs">{date}</span>
					</p>
					<h3 className="my-2 text-2xl font-bold text-foreground">

						{trunateTitle || "Untitled Blog"}
					</h3>
					<p className="text-muted-foreground leading-loose">
						{subTitle || "No description available."}
					</p>

					<div className="inline-flex items-center text-foreground text-sm mt-5">
						<div className="flex-shrink-0 relative flex items-center space-x-2">
							<Image
								className="rounded-full"
								width={30}
								height={30}
								src={user?.avatar || "/images/avatar/1.png"}
								alt={user?.name || "Author"}
							/>
							<span className="block text-muted-foreground hover:text-foreground font-medium">
								{user?.name || "Unknown Author"}
							</span>
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default BlogGrid3

