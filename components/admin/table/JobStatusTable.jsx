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
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
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
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import DeleteJobDialog from "../elements/DeleteJobDialog"

const columns = (openDeleteDialog) => [
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
			<div className="capitalize" dangerouslySetInnerHTML={{ __html: row.original?.title }} />
		),
	},
	{
		accessorKey: "recruiter",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Recruiter" />,
		cell: ({ row }) => <div className="capitalize">{row.original.recruiter?.title}</div>,
	},
	{
		accessorKey: "jobIndustry",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
		cell: ({ row }) => <div className="capitalize">{row.original.jobIndustry?.title}</div>,
	},
	{
		accessorKey: "status",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
		cell: ({ row }) => <div className="capitalize">{row.original.status}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => <RowActions job={row.original} openDeleteDialog={openDeleteDialog} />,
	},
]

function JobStatusTable({ jobs = [], totalPage, page, isLoading, status, onSearch }) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const currentPage = Number.parseInt(page)
	const prevBtn = currentPage - 1
	const nextBtn = currentPage + 1
	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const [globalFilter, setGlobalFilter] = useState(searchParams.get("search") || "")
	const [pagination, setPagination] = useState({
		pageIndex: currentPage - 1,
		pageSize: TABLE_ROW_PAGE,
	})

	// Lifted delete dialog state here
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [slugToDelete, setSlugToDelete] = useState(null)

	useEffect(() => {
		onSearch(globalFilter)
	}, [globalFilter, onSearch])

	// Function to open the delete dialog for a specific job slug
	const openDeleteDialog = (slug) => {
		setSlugToDelete(slug)
		setShowDeleteDialog(true)
	}

	const table = useReactTable({
		data: jobs,
		columns: columns(openDeleteDialog),
		getCoreRowModel: getCoreRowModel(),
		state: {
			sorting,
			columnFilters,
			pagination,
			globalFilter,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		pageCount: totalPage,
	})

	const handleSearchChange = (event) => {
		const value = event.target.value
		setGlobalFilter(value)
		router.push(`/recruiter/job/${status}?page=1&search=${encodeURIComponent(value)}`)
	}

	return (
		<div className="w-full">
			{/* Single DeleteJobDialog instance */}
			<DeleteJobDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} slug={slugToDelete} />

			<div className="flex flex-wrap items-center justify-between gap-2 py-4">
				<Input
					placeholder="Search jobs..."
					value={globalFilter ?? ""}
					onChange={handleSearchChange}
					className="max-w-sm"
				/>
				<div className="flex flex-wrap gap-2">
					<DataTableViewOptions table={table} />
				</div>
			</div>

			{isLoading ? (
				<div className="rounded-md border overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[80px]">Image</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Recruiter</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: jobs.length || 10 }).map((_, index) => (
								<TableRow key={index}>
									<TableCell>
										<Skeleton className="h-10 w-10 rounded-full" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[140px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[100px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[80px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[60px]" />
									</TableCell>
									<TableCell className="text-right">
										<Skeleton className="h-8 w-8 rounded-full ml-auto" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
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

			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
				<div className="text-sm text-muted-foreground text-center sm:text-left w-full sm:w-auto">
					Page {currentPage} of {totalPage}
				</div>
				<div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							router.push(
								`/recruiter/job/${status}?page=${prevBtn}&search=${encodeURIComponent(
									globalFilter
								)}`
							)
						}
						disabled={currentPage === 1}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							router.push(
								`/recruiter/job/${status}?page=${nextBtn}&search=${encodeURIComponent(
									globalFilter
								)}`
							)
						}
						disabled={currentPage === totalPage}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}

function RowActions({ job, openDeleteDialog }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/recruiter/job/${job.slug}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<ReceiptText className="h-4 w-4 text-muted-foreground" />
						Details
					</DropdownMenuItem>
				</Link>
				<Link href={`/recruiter/job/edit/${job.slug}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<Pencil className="h-4 w-4 text-muted-foreground" />
						Edit
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					className="flex items-center gap-2"
					onSelect={(e) => {
						e.preventDefault()
						openDeleteDialog(job.slug)
					}}
				>
					<TrashIcon className="h-4 w-4 text-muted-foreground" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default JobStatusTable
