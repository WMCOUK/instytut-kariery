'use client'
import DataTableColumnHeader from "@/components/admin/datatable/ColumnHeader"
import DataTableViewOptions from "@/components/admin/datatable/ColumnToggle"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { CATEGORY_PER_PAGE } from "@/utils"
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
import DeleteCategoryDialog from "../elements/DeleteCategoryDialog"
import SkeletonWrapper from "../elements/SkeletonWrapper"

function CategoryTable({ data = [], totalPage, page, isLoading }) {
	const currentPage = parseInt(page)
	const prevBtn = currentPage - 1
	const nextBtn = currentPage + 1
	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const [pagination, setPagination] = useState({
		pageIndex: currentPage - 1,
		pageSize: CATEGORY_PER_PAGE,
	})

	// Lifted delete dialog state
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [categoryToDelete, setCategoryToDelete] = useState(null)

	// Open dialog with selected category
	const openDeleteDialog = (category) => {
		setCategoryToDelete(category)
		setShowDeleteDialog(true)
	}

	const columns = [
		{
			accessorKey: "title",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
			cell: ({ row }) => <div className="capitalize">{row.original.title}</div>,
		},
		// {
		// 	accessorKey: "image",
		// 	header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
		// 	cell: ({ row }) =>
		// 		row.original.img ? (
		// 			<Image
		// 				src={row.original.img}
		// 				alt={row.original.title || "Category Image"}
		// 				width={40}
		// 				height={40}
		// 				className="rounded-full"
		// 			/>
		// 		) : (
		// 			<div className="w-10 h-10 rounded-full bg-gray-500"></div>
		// 		),
		// },
		{
			id: "actions",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
			enableHiding: false,
			cell: ({ row }) => (
				<RowActions category={row.original} openDeleteDialog={openDeleteDialog} />
			),
		},
	]

	const table = useReactTable({
		data,
		columns,
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
	})

	return (
		<div className="w-full">
			{/* Delete dialog controlled here */}
			<DeleteCategoryDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				id={categoryToDelete?.slug}
			/>

			{/* Header */}
			<div className="flex flex-wrap items-end justify-between gap-2 py-4">
				<div className="text-sm text-muted-foreground">
					Page {currentPage} of {totalPage}
				</div>
				<div className="flex flex-wrap gap-2">
					<DataTableViewOptions table={table} />
				</div>
			</div>

			{/* Table with SkeletonWrapper */}
			<SkeletonWrapper isLoading={isLoading}>
				<div className="rounded-md border overflow-x-auto">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{isLoading
								? Array.from({ length: CATEGORY_PER_PAGE }).map((_, rowIndex) => (
									<TableRow key={rowIndex} className="animate-pulse">
										{columns.map((_, colIndex) => (
											<TableCell key={colIndex}>
												<div className="h-4 w-4/5 bg-muted rounded" />
											</TableCell>
										))}
									</TableRow>
								))
								: table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
										className={
											row.index % 2 === 0
												? "bg-background"
												: "bg-muted/50 hover:bg-muted"
										}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))}
						</TableBody>
					</Table>
				</div>

				{/* Pagination */}
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
					<div className="text-sm text-muted-foreground">
						{data.length > 0 ? (
							<>
								Showing{" "}
								<span className="font-medium">
									{pagination.pageIndex * pagination.pageSize + 1}
								</span>{" "}
								to{" "}
								<span className="font-medium">
									{Math.min(
										(pagination.pageIndex + 1) * pagination.pageSize,
										data.length
									)}
								</span>{" "}
								out of <span className="font-medium">{data.length}</span> rows
							</>
						) : (
							"No data to display"
						)}
					</div>

					<div className="flex gap-2">
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
			</SkeletonWrapper>
		</div>
	)
}

function RowActions({ category, openDeleteDialog }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"} className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/post/category/${category.slug}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<ReceiptText className="h-4 w-4 text-muted-foreground" />
						Details
					</DropdownMenuItem>
				</Link>
				<Link href={`/post/category/edit/${category.slug}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<Pencil className="h-4 w-4 text-muted-foreground" />
						Edit
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					className="flex items-center gap-2"
					onClick={() => openDeleteDialog(category)}
				>
					<TrashIcon className="h-4 w-4 text-muted-foreground" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CategoryTable
