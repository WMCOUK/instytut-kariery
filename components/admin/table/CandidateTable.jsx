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
import DeleteCandidateDialog from "../elements/DeleteCandidateDialog"

// columns is now a function to receive open dialog setters from parent
const columns = (openDeleteDialog, setCandidateIdToDelete) => [
	// {
	// 	accessorKey: "image",
	// 	header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
	// 	cell: ({ row }) => (
	// 		<Image
	// 			height={40}
	// 			width={40}
	// 			src={row.original?.personal?.image || "/images/dummy.jpg"}
	// 			alt={row.original?.personal?.name || "Candidate"}
	// 			className="rounded-md"
	// 		/>
	// 	),
	// },
	{
		accessorKey: "title",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
		cell: ({ row }) => <div className="capitalize">{row.original?.personal?.name}</div>,
	},
	{
		accessorKey: "jobIndustry",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Industry" />,
		cell: ({ row }) => <div className="capitalize">{row.original?.personal?.designation}</div>,
	},
	{
		accessorKey: "country",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
		cell: ({ row }) => <div className="capitalize">{row.original?.personal?.country}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<RowActions
				candidate={row.original}
				openDeleteDialog={openDeleteDialog}
				setCandidateIdToDelete={setCandidateIdToDelete}
			/>
		),
	},
]

function CandidateTable({ candidates = [], totalPage, page, isLoading, totalCandidate }) {
	const validCandidates = Array.isArray(candidates) ? candidates : []

	const currentPage = Number.parseInt(page) || 1
	const prevBtn = currentPage - 1
	const nextBtn = currentPage + 1

	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const [pagination, setPagination] = useState({
		pageIndex: currentPage - 1,
		pageSize: TABLE_ROW_PAGE,
	})

	// Manage delete dialog state here
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [candidateIdToDelete, setCandidateIdToDelete] = useState(null)

	const table = useReactTable({
		data: validCandidates,
		columns: columns(setShowDeleteDialog, setCandidateIdToDelete),
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
			{/* Delete dialog rendered once here */}
			<DeleteCandidateDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				id={candidateIdToDelete}
			/>

			<div className="flex flex-wrap items-end justify-between gap-2 py-4">
				<div className="text-sm text-muted-foreground">
					Page {isNaN(currentPage) ? 1 : currentPage} of {isNaN(totalPage) ? 1 : totalPage || 1}
				</div>
				<div className="flex flex-wrap gap-2">
					<DataTableViewOptions table={table} />
				</div>
			</div>

			{isLoading ? (
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted">
								<TableHead className="w-[80px]">Image</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Industry</TableHead>
								<TableHead>Country</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 10 }).map((_, index) => (
								<TableRow
									key={index}
									className={index % 2 === 0 ? undefined : "bg-muted/50"}
								>
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
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className="bg-muted">
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
							{table.getRowModel().rows.map((row, idx) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className={
										idx % 2 === 0
											? undefined
											: "bg-muted/50 hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
			)}

			<div className="flex items-center justify-between space-x-2 py-4 text-muted-foreground">
				<div>
					{totalCandidate > 0 ? (
						<>
							Showing{" "}
							<span className="font-medium">
								{isNaN(currentPage) ? 1 : (currentPage - 1) * TABLE_ROW_PAGE + 1}
							</span>{" "}
							to{" "}
							<span className="font-medium">
								{isNaN(currentPage) || isNaN(totalCandidate)
									? 0
									: Math.min(currentPage * TABLE_ROW_PAGE, totalCandidate)}
							</span>{" "}
							out of <span className="font-medium">{isNaN(totalCandidate) ? 0 : totalCandidate}</span>{" "}
							candidates
						</>
					) : (
						"No candidates to display"
					)}
				</div>
				<div className="space-x-5">
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

function RowActions({ candidate, openDeleteDialog, setCandidateIdToDelete }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/admin/candidate/${candidate.id}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<ReceiptText className="h-4 w-4 text-muted-foreground" />
						Details
					</DropdownMenuItem>
				</Link>
				<Link href={`/admin/candidate/edit/${candidate.id}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<Pencil className="h-4 w-4 text-muted-foreground" />
						Edit
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					className="flex items-center gap-2"
					onSelect={(e) => {
						e.preventDefault()
						// Delay to close dropdown before opening dialog
						setTimeout(() => {
							setCandidateIdToDelete(candidate.id)
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

export default CandidateTable
