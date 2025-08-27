'use client'
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import CategoryTable from "@/components/admin/table/CategoryTable"
import { Button } from "@/components/ui/button"
import { fetchCategory } from "@/fetchSwr"
// import { fetchCategory } from "@/fetchSwr"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function Page() {
	const searchParams = useSearchParams()
	const page = parseInt(searchParams.page) || 1
	const { categories, totalPage, mutate, isLoading } = fetchCategory(page)

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
