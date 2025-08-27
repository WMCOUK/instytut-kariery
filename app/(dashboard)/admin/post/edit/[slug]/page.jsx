// 'use client'

import PostEditForm from "@/components/admin/form/PostEditForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { getPostDetails } from "@/utils/fetchServer"

export async function generateMetadata({ params }) {
	const { slug } = await params
	const post = await getPostDetails(slug)
	return {
		title: post?.title
	}
}


export default async function PostEditPage({ params }) {
	const { slug } = await params
	const post = await getPostDetails(slug)
	// console.log(post);
	return (
		<>

			<LayoutAdmin>
				<PostEditForm post={post} />
			</LayoutAdmin>
		</>
	)
}
