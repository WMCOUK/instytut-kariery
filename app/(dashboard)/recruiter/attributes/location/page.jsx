
'use client'
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import JobAttributeTable from "@/components/admin/table/JobAttributeTable"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { fetchLocation } from "@/fetchSwr"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
export default function LocationAttributes() {
	const searchParams = useSearchParams()
	const page = Number.parseInt(searchParams.get("page") || "1")

	const { locations, totalPage, currentPage, isLoading, mutate } = fetchLocation(page)
	return (
		<LayoutAdmin>
			<div className="flex justify-between items-center">
				<div>Location</div>
				<Button asChild>
					<Link href="/recruiter/attributes/location/create">Create Location</Link>
				</Button>
			</div>
			{isLoading &&
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[80px]">Image</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Slug</TableHead>
								<TableHead>Icon</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 10 }).map((_, index) => (
								<TableRow key={index}>
									<TableCell>
										<Skeleton className="h-10 w-10 rounded-full" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[140px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[180px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[100px]" />
									</TableCell>
									<TableCell className="text-right">
										<Skeleton className="h-8 w-8 rounded-full ml-auto" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className="flex items-center justify-between px-4 py-4 border-t">
						<Skeleton className="h-4 w-[180px]" />
						<div className="flex gap-2">
							<Skeleton className="h-8 w-20" />
							<Skeleton className="h-8 w-20" />
						</div>
					</div>
				</div>
			}
			<JobAttributeTable
				data={locations}
				totalPage={totalPage}
				page={currentPage}
				attributePath="location"
				isLoading={isLoading}
			/>
		</LayoutAdmin>
	)
}
