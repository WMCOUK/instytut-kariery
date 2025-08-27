'use client'

import PostCreateForm from '@/components/admin/form/PostCreateForm'
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"

export default function PostPage() {

	return (
		<LayoutAdmin>
			<PostCreateForm />
		</LayoutAdmin>
	)
}

