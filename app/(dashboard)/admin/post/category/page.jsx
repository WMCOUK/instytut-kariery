import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import CategoryTable from "@/components/admin/table/CategoryTable"
import { Button } from "@/components/ui/button"
import { CATEGORY_PER_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"
import Link from "next/link"

export const dynamic = 'force-dynamic'

async function getCategories(page) {
	const take = CATEGORY_PER_PAGE
	const skip = take * (page - 1)
	try {
		const [categories, total] = await Promise.all([
			prisma.blogCategory.findMany({
				skip,
				take,
				orderBy: { posts: { _count: "desc" } },
				include: { _count: { select: { posts: true } } },
			}),
			prisma.blogCategory.count(),
		])
		return { categories, totalPage: Math.ceil(total / take) }
	} catch (error) {
		console.error("Error fetching categories:", error)
		return { categories: [], totalPage: 0 }
	}
}

export default async function PostCategoryPage({ searchParams }) {
	const params = await searchParams
	const page = Number.parseInt(params?.page || "1")
	const { categories, totalPage } = await getCategories(page)

	return (
		<LayoutAdmin>
			<div className="flex justify-start">
				<Button asChild>
					<Link href="/admin/post/category/create">Create Category</Link>
				</Button>
			</div>
			<CategoryTable data={categories} totalPage={totalPage} page={page} />
		</LayoutAdmin>
	)
}
