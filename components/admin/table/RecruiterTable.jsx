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
import { TABLE_ROW_PAGE } from "@/utils"
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
import DeleteRecruiterDialog from "../elements/DeleteRecruiterDialog"

const columns = (openDeleteDialog, setSlugToDelete) => [
	// {
	// 	accessorKey: "image",
	// 	header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
	// 	cell: ({ row }) => (
	// 		<Image
	// 			height={40}
	// 			width={40}
	// 			src={row.original.image || "/images/dummy.jpg"}
	// 			alt={row.original.slug}
	// 			className="rounded-md"
	// 		/>
	// 	),
	// },
	{
		accessorKey: "title",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
		cell: ({ row }) => (
			<div
				className="capitalize"
				dangerouslySetInnerHTML={{ __html: row.original?.title }}
			/>
		),
	},
	{
		accessorKey: "jobIndustry",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Industry" />,
		cell: ({ row }) => <div className="capitalize">{row.original.jobIndustry?.title}</div>,
	},
	{
		accessorKey: "country",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
		cell: ({ row }) => <div className="capitalize">{row.original.country}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<RowActions
				recruiter={row.original}
				openDeleteDialog={openDeleteDialog}
				setSlugToDelete={setSlugToDelete}
			/>
		),
	},
]

function RowActions({ recruiter, openDeleteDialog, setSlugToDelete }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/recruiter/${recruiter.slug}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<ReceiptText className="h-4 w-4 text-muted-foreground" />
						Details
					</DropdownMenuItem>
				</Link>
				<Link href={`/recruiter/edit/${recruiter.slug}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<Pencil className="h-4 w-4 text-muted-foreground" />
						Edit
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					className="flex items-center gap-2"
					onSelect={(e) => {
						e.preventDefault()
						// delay so dropdown menu closes before dialog opens
						setTimeout(() => {
							setSlugToDelete(recruiter.slug)
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

export default function RecruiterTable({
	recruiters = [],
	totalPage,
	page,
	isLoading,
	totalRecruiter,
}) {
	const currentPage = Number.parseInt(page)
	const prevBtn = currentPage - 1
	const nextBtn = currentPage + 1

	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const [pagination, setPagination] = useState({
		pageIndex: currentPage - 1,
		pageSize: TABLE_ROW_PAGE,
	})

	// State for managing delete dialog in parent
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [slugToDelete, setSlugToDelete] = useState(null)

	const table = useReactTable({
		data: recruiters,
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
	})

	return (
		<div className="w-full">
			{/* Delete Dialog rendered here */}
			<DeleteRecruiterDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				slug={slugToDelete}
			/>

			{/* Header section */}
			<div className="flex flex-wrap items-end justify-between gap-2 py-4">
				<div className="text-sm text-muted-foreground">
					Page {currentPage} of {totalPage}
				</div>
				<div className="flex flex-wrap gap-2">
					<DataTableViewOptions table={table} />
				</div>
			</div>

			{/* Table loading skeleton */}
			{isLoading ? (
				<div className="rounded-md border overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[80px]">Image</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Industry</TableHead>
								<TableHead>Country</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 10 }).map((_, index) => (
								<TableRow key={index}>
									<TableCell>
										<div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
									</TableCell>
									<TableCell>
										<div className="h-4 w-[140px] bg-gray-200 animate-pulse" />
									</TableCell>
									<TableCell>
										<div className="h-4 w-[180px] bg-gray-200 animate-pulse" />
									</TableCell>
									<TableCell>
										<div className="h-4 w-[100px] bg-gray-200 animate-pulse" />
									</TableCell>
									<TableCell className="text-right">
										<div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse ml-auto" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className="flex items-center justify-between px-4 py-4 border-t">
						<div className="h-4 w-[180px] bg-gray-200 animate-pulse" />
						<div className="flex gap-2">
							<div className="h-8 w-20 bg-gray-200 animate-pulse" />
							<div className="h-8 w-20 bg-gray-200 animate-pulse" />
						</div>
					</div>
				</div>
			) : (
				// Loaded table
				<div className="rounded-md border overflow-x-auto">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="px-4 py-3 text-muted-foreground text-sm"
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
					{totalRecruiter > 0 ? (
						<>
							Showing{" "}
							<span className="font-medium">
								{(currentPage - 1) * TABLE_ROW_PAGE + 1}
							</span>{" "}
							to{" "}
							<span className="font-medium">
								{Math.min(currentPage * TABLE_ROW_PAGE, totalRecruiter)}
							</span>{" "}
							out of <span className="font-medium">{totalRecruiter}</span> recruiters
						</>
					) : (
						"No recruiters to display"
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
