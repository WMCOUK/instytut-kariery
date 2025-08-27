'use client'

import DataTableColumnHeader from "@/components/admin/datatable/ColumnHeader"
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
import { MoreHorizontal, Pencil, ReceiptText, TrashIcon } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import DeleteCandidateCvDialog from "../elements/DeleteCandidateCvDialog"
import SkeletonWrapper from "../elements/SkeletonWrapper"

const columns = (openDeleteDialog) => [
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
	// 			<div className="w-10 h-10 rounded-full bg-gray-500"></div>
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
			<RowActions attribute={row.original} openDeleteDialog={openDeleteDialog} />
		),
	},
]

function CandidateCvTable({ data = [], totalPage, page, isLoading }) {
	const currentPage = parseInt(page)
	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const [pagination, setPagination] = useState({
		pageIndex: currentPage - 1,
		pageSize: ATTRIBUTE_PER_PAGE,
	})

	const isMobile = useIsMobile()

	// Centralized delete dialog state
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [slugToDelete, setSlugToDelete] = useState(null)
	const [titleToDelete, setTitleToDelete] = useState(null)

	// Function to open delete dialog for selected attribute
	const openDeleteDialog = (attribute) => {
		setSlugToDelete(attribute.slug)
		setTitleToDelete(attribute.title)
		setShowDeleteDialog(true)
	}

	const table = useReactTable({
		data,
		columns: columns(openDeleteDialog), // pass openDeleteDialog to columns
		getCoreRowModel: getCoreRowModel(),
		state: { sorting, columnFilters, pagination },
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
			{/* Only one dialog instance controlled here */}
			<DeleteCandidateCvDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				slug={slugToDelete}
				attributeTitle={titleToDelete}
			/>

			<SkeletonWrapper isLoading={isLoading}>
				<div className="rounded-md border">
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
							{table.getRowModel().rows.map((row, index) => (
								<TableRow
									key={row.id}
									className={`${index % 2 === 0 ? 'bg-muted/50' : ''
										} hover:bg-accent hover:text-accent-foreground cursor-pointer`}
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
			</SkeletonWrapper>
		</div>
	)
}

function RowActions({ attribute, openDeleteDialog }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/candidate/attributes/cv/${attribute?.slug}`}>
					<DropdownMenuItem>
						<ReceiptText className="h-4 w-4" /> Details
					</DropdownMenuItem>
				</Link>
				<Link href={`/candidate/attributes/cv/edit/${attribute?.slug}`}>
					<DropdownMenuItem>
						<Pencil className="h-4 w-4" /> Edit
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem onClick={() => openDeleteDialog(attribute)}>
					<TrashIcon className="h-4 w-4" /> Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CandidateCvTable
