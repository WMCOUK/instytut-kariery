import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import PostTable from "@/components/admin/table/PostTable"
import { Button } from "@/components/ui/button"
import { TABLE_ROW_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"
import Link from "next/link"

export const dynamic = 'force-dynamic'

async function getPosts(page) {
	const take = TABLE_ROW_PAGE
	const skip = TABLE_ROW_PAGE * (page - 1)
	try {
		const [posts, totalPost] = await prisma.$transaction([
			prisma.post.findMany({
				take,
				skip,
				include: { user: true, blogCategory: true, comment: true },
			}),
			prisma.post.count(),
		])
		return {
			posts,
			totalPost,
			totalPage: Math.ceil(totalPost / take),
			currentPage: page,
		}
	} catch (error) {
		console.error("Error fetching posts:", error)
		return { posts: [], totalPost: 0, totalPage: 0, currentPage: page }
	}
}

export default async function PostPage({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { posts, totalPost, totalPage, currentPage } = await getPosts(page)

	return (
		<LayoutAdmin>
			<div className="flex justify-end mb-4">
				<Button asChild>
					<Link href="/admin/post/create">Create Post</Link>
				</Button>
			</div>

			<PostTable
				posts={posts}
				totalPage={totalPage}
				page={currentPage.toString()}
				isLoading={false}
				totalPost={totalPost}
			/>

			{(!posts || posts.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No posts found</h3>
			)}
		</LayoutAdmin>
	)
}
