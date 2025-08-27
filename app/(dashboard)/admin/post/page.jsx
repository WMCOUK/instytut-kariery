"use client"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import PostTable from "@/components/admin/table/PostTable"
import { Button } from "@/components/ui/button"
import { fetchQueryPost } from "@/fetchSwr"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PostPage() {
	const searchParams = useSearchParams()
	const page = Number.parseInt(searchParams.get("page") || "1")
	const { posts, totalPost, totalPage, currentPage, error, mutate, isLoading } = fetchQueryPost(page)

	// console.log(posts)

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
				isLoading={isLoading}
				totalPost={totalPost}
				mutate={mutate}
			/>

			{!isLoading && (!posts || posts.length === 0) && (
				<h3 className="flex justify-center items-center py-8">No posts found</h3>
			)}
		</LayoutAdmin>
	)
}

