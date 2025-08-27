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
import { ATTRIBUTE_PER_PAGE } from "@/utils"
import { useIsMobile } from "@/utils/useMobile"
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, Pencil, ReceiptText, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DeleteAttributeDialog from "../elements/DeleteAttributeDialog"
import SkeletonWrapper from "../elements/SkeletonWrapper"

const columns = (
	attributePath,
	setShowDeleteDialog,
	setDeleteSlug,
	setDeleteTitle
) => [
		// {
		// 	accessorKey: "image",
		// 	header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
		// 	cell: ({ row }) =>
		// 		row.original.image ? (
		// 			<Image
		// 				src={row.original.image}
		// 				alt={row.original.title}
		// 				width={40}
		// 				height={40}
		// 				className="rounded-full"
		// 			/>
		// 		) : (
		// 			<div className="w-10 h-10 rounded-full bg-gray-500" />
		// 		),
		// },
		{
			accessorKey: "title",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
			cell: ({ row }) => <div className="capitalize">{row.original.title}</div>,
		},
		{
			accessorKey: "slug",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
			cell: ({ row }) => <div >{row.original.slug}</div>,
		},
		{
			accessorKey: "icon",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Icon" />,
			cell: ({ row }) => <div className="capitalize">{row.original.icon}</div>,
		},
		{
			id: "actions",
			header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
			enableHiding: false,
			cell: ({ row }) => (
				<RowActions
					attribute={row.original}
					attributePath={attributePath}
					setShowDeleteDialog={setShowDeleteDialog}
					setDeleteSlug={setDeleteSlug}
					setDeleteTitle={setDeleteTitle}
				/>
			),
		},
	]

function RowActions({
	attribute,
	attributePath,
	setShowDeleteDialog,
	setDeleteSlug,
	setDeleteTitle,
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<Link
					href={`/recruiter/attributes/${attributePath}/${attribute.slug}`}
					passHref
					legacyBehavior
				>
					<DropdownMenuItem as="a" className="flex items-center gap-2">
						<ReceiptText className="h-4 w-4 text-muted-foreground" />
						Details
					</DropdownMenuItem>
				</Link>

				<Link
					href={`/recruiter/attributes/${attributePath}/edit/${attribute.slug}`}
					passHref
					legacyBehavior
				>
					<DropdownMenuItem as="a" className="flex items-center gap-2">
						<Pencil className="h-4 w-4 text-muted-foreground" />
						Edit
					</DropdownMenuItem>
				</Link>

				<DropdownMenuItem
					className="flex items-center gap-2"
					onSelect={(e) => {
						e.preventDefault()
						// delay opening dialog to ensure dropdown closes properly
						setTimeout(() => {
							setDeleteSlug(attribute.slug)
							setDeleteTitle(attribute.title)
							setShowDeleteDialog(true)
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

export default function JobAttributeTable({ data = [], totalPage, page, attributePath, isLoading }) {
	const currentPage = parseInt(page)
	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const [pagination, setPagination] = useState({
		pageIndex: currentPage - 1,
		pageSize: ATTRIBUTE_PER_PAGE,
	})

	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [deleteSlug, setDeleteSlug] = useState(null)
	const [deleteTitle, setDeleteTitle] = useState(null)

	const isMobile = useIsMobile()

	const table = useReactTable({
		data,
		columns: columns(attributePath, setShowDeleteDialog, setDeleteSlug, setDeleteTitle),
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
			{/* Delete Dialog */}
			<DeleteAttributeDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				slug={deleteSlug}
				attributePath={attributePath}
				attributeTitle={deleteTitle}
			/>

			{/* Pagination & Options */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
				<div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
					Page {currentPage} of {totalPage}
				</div>
				<div className="flex flex-wrap justify-center sm:justify-end gap-2 w-full sm:w-auto">
					<DataTableViewOptions table={table} />
				</div>
			</div>

			{/* Table with loading skeleton */}
			<SkeletonWrapper isLoading={isLoading}>
				{!isMobile ? (
					<div className="rounded-md border overflow-x-auto">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<TableHead
												key={header.id}
												className="px-2 py-3 first:pl-4 last:pr-4 text-muted-foreground text-sm"
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
										className={`hover:bg-muted transition-colors ${row.index % 2 === 0 ? "bg-background" : "bg-muted/40"
											}`}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="px-2 py-3 first:pl-4 last:pr-4 text-sm text-foreground"
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				) : (
					<div className="space-y-4">
						{table.getRowModel().rows.map((row) => (
							<div
								key={row.id}
								className="rounded-lg border p-4 space-y-2 bg-card shadow-sm"
							>
								{row.getVisibleCells().map((cell) => (
									<div
										key={cell.id}
										className="flex items-center justify-between py-1"
									>
										<span className="font-medium text-sm text-muted-foreground">
											{cell.column.columnDef.header({ column: cell.column })}
										</span>
										<span className="text-sm text-foreground">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</span>
									</div>
								))}
							</div>
						))}
					</div>
				)}

				{/* Pagination Controls */}
				<div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 space-x-0 sm:space-x-2 py-4">
					<div className="text-sm text-muted-foreground text-center sm:text-left w-full sm:w-auto">
						Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
						{Math.min(
							(pagination.pageIndex + 1) * pagination.pageSize,
							data.length
						)}{" "}
						of {data.length} rows
					</div>

					<div className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-end">
						<Button
							variant="outline"
							size="sm"
							disabled={currentPage <= 1 || data.length === 0}
							asChild
							className={`w-24 ${currentPage <= 1 || data.length === 0
								? "opacity-50 cursor-not-allowed"
								: ""
								}`}
						>
							<Link
								href={`?page=${Math.max(currentPage - 1, 1)}`}
								aria-disabled={currentPage <= 1 || data.length === 0}
							>
								Previous
							</Link>
						</Button>

						<Button
							variant="outline"
							size="sm"
							disabled={currentPage >= totalPage || data.length === 0}
							asChild
							className={`w-24 ${currentPage >= totalPage || data.length === 0
								? "opacity-50 cursor-not-allowed"
								: ""
								}`}
						>
							<Link
								href={`?page=${Math.min(currentPage + 1, totalPage)}`}
								aria-disabled={currentPage >= totalPage || data.length === 0}
							>
								Next
							</Link>
						</Button>
					</div>
				</div>
			</SkeletonWrapper>
		</div>
	)
}
