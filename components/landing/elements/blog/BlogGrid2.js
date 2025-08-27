import { formatDate } from "@/utils"
import Image from "next/image"
import Link from "next/link"

const BlogGrid2 = ({ item }) => {
	const { slug, title, img, subTitle, user, blogCategory } = item || {}
	const date = formatDate(item?.createdAt)

	return (
		<div className="w-full mb-8 rounded-xl bg-card group">
			<Link href={`/blog/${slug}`}>
				<div className="relative w-full h-80">
					<Image
						className="object-cover rounded-tl-xl rounded-tr-xl"
						src={img}
						alt={title || "Blog Image"}
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<div className="pt-8 pb-2 px-5">
					<p className="mb-3 text-sm text-primary">
						<span className="inline-block py-1 px-3 text-xs font-semibold bg-primary text-primary-foreground rounded-xl mr-3">
							{blogCategory?.title || "Uncategorized"}
						</span>
						<span className="text-muted-foreground text-xs">{date}</span>
					</p>
					<h3 className="my-2 text-xl font-medium text-foreground group-hover:text-primary transition duration-200">
						{title || "Untitled Blog"}
					</h3>
					<p className="text-muted-foreground leading-loose">
						{subTitle || "No description available."}
					</p>
					<div className="inline-flex items-center text-sm mt-5">
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

export default BlogGrid2

