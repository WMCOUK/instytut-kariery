"use client"

import DataTableColumnHeader from "@/components/admin/datatable/ColumnHeader"
import DataTableViewOptions from "@/components/admin/datatable/ColumnToggle"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { POST_PER_PAGE } from "@/utils"
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, Pencil, ReceiptText, TrashIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import DeletePostDialog from "../elements/DeletePostDialog"

const columns = (openDeleteDialog, setSlugToDelete) => [
	// {
	// 	accessorKey: "img",
	// 	header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
	// 	cell: ({ row }) => (
	// 		<Image
	// 			height={40}
	// 			width={40}
	// 			src={`${row.original.img ? row.original.img : "/images/dummy.jpg"}`}
	// 			alt={row.original.slug}
	// 			className="rounded-md"
	// 		/>
	// 	),
	// },
	{
		accessorKey: "title",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
		cell: ({ row }) => (
			<div className="capitalize" dangerouslySetInnerHTML={{ __html: row.original?.title }} />
		),
	},
	{
		accessorKey: "blogCategory",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
		cell: ({ row }) => <div className="capitalize">{row.original.blogCategory?.title}</div>,
	},
	{
		accessorKey: "views",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Views" />,
		cell: ({ row }) => <div className="capitalize">{row.original.views}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row, table }) => (
			<RowActions
				post={row.original}
				mutate={table.options.meta?.mutate}
				openDeleteDialog={openDeleteDialog}
				setSlugToDelete={setSlugToDelete}
			/>
		),
	},
]

function PostTable({ posts = [], totalPage, page, isLoading, totalPost, mutate }) {
	const currentPage = Number.parseInt(page)
	const prevBtn = currentPage - 1
	const nextBtn = currentPage + 1
	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const [pagination, setPagination] = useState({
		pageIndex: currentPage - 1,
		pageSize: POST_PER_PAGE,
	})

	// Lifted delete dialog state
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [slugToDelete, setSlugToDelete] = useState(null)

	const table = useReactTable({
		data: posts,
		columns: columns(setShowDeleteDialog, setSlugToDelete),
		getCoreRowModel: getCoreRowModel(),
		state: {
			sorting,
			columnFilters,
			pagination,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: setPagination,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		pageCount: totalPage,
		meta: {
			mutate,
		},
	})

	return (
		<div className="w-full">
			{/* Single Delete Dialog */}
			<DeletePostDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				slug={slugToDelete}
				mutate={mutate}
			/>

			{/* Top Controls */}
			<div className="flex flex-wrap items-end justify-between gap-2 py-4">
				<div className="text-sm text-muted-foreground">
					Page {currentPage} of {totalPage}
				</div>
				<div className="flex flex-wrap gap-2">
					<DataTableViewOptions table={table} />
				</div>
			</div>

			{/* Table */}
			{isLoading ? (
				<div className="rounded-md border overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[80px]">Image</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Views</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: POST_PER_PAGE }).map((_, index) => (
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
			) : (
				<div className="rounded-md border overflow-x-auto">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="px-4 py-2 text-muted-foreground text-sm"
										>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className={`transition-colors ${row.index % 2 === 0 ? "bg-background" : "bg-muted/50"
										} hover:bg-muted`}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="px-4 py-2 text-sm">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}

			{/* Pagination */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
				<div className="text-sm text-muted-foreground text-center sm:text-left">
					{totalPost > 0 ? (
						<>
							Showing{" "}
							<span className="font-medium">{(currentPage - 1) * POST_PER_PAGE + 1}</span> to{" "}
							<span className="font-medium">{Math.min(currentPage * POST_PER_PAGE, totalPost)}</span> of{" "}
							<span className="font-medium">{totalPost}</span> posts
						</>
					) : (
						"No posts to display"
					)}
				</div>
				<div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
					{currentPage > 1 ? (
						<Link href={`?page=${prevBtn}`} passHref>
							<Button variant="outline" size="sm">
								Previous
							</Button>
						</Link>
					) : (
						<Button variant="outline" size="sm" disabled>
							Previous
						</Button>
					)}
					{currentPage < totalPage ? (
						<Link href={`?page=${nextBtn}`} passHref>
							<Button variant="outline" size="sm">
								Next
							</Button>
						</Link>
					) : (
						<Button variant="outline" size="sm" disabled>
							Next
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

function RowActions({ post, mutate, openDeleteDialog, setSlugToDelete }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/admin/post/${post.slug}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<ReceiptText className="h-4 w-4 text-muted-foreground" />
						Details
					</DropdownMenuItem>
				</Link>
				<Link href={`/admin/post/edit/${post.slug}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<Pencil className="h-4 w-4 text-muted-foreground" />
						Edit
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					className="flex items-center gap-2"
					onSelect={(e) => {
						e.preventDefault()
						setTimeout(() => {
							setSlugToDelete(post.slug)
							openDeleteDialog(true)
						}, 150)
					}}
				>
					<TrashIcon className="h-4 w-4 text-muted-foreground" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default PostTable
