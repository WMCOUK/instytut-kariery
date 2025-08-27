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
import DeleteCandidateSkillDialog from "../elements/DeleteCandidateSkillDialog"
import SkeletonWrapper from "../elements/SkeletonWrapper"

function CandidateSkillTable({ data = [], totalPage, page, isLoading }) {
	const currentPage = parseInt(page)
	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const [pagination, setPagination] = useState({
		pageIndex: currentPage - 1,
		pageSize: ATTRIBUTE_PER_PAGE,
	})

	// Lift dialog state here
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [slugToDelete, setSlugToDelete] = useState(null)
	const [titleToDelete, setTitleToDelete] = useState(null)

	// Function to open delete dialog with selected attribute info
	const openDeleteDialog = (attribute) => {
		setSlugToDelete(attribute.slug)
		setTitleToDelete(attribute.title)
		setShowDeleteDialog(true)
	}

	const columns = [
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
			cell: ({ row }) => <RowActions attribute={row.original} openDeleteDialog={openDeleteDialog} />,
		},
	]

	const table = useReactTable({
		data,
		columns,
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
			{/* Only one delete dialog */}
			<DeleteCandidateSkillDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				slug={slugToDelete}
				attributeTitle={titleToDelete}
			/>

			<SkeletonWrapper isLoading={isLoading}>
				<div className="rounded-md border overflow-x-auto">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id} className="px-2 py-3 first:pl-4 last:pr-4">
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
									className={`${index % 2 === 0 ? 'bg-muted/50' : ''} hover:bg-accent hover:text-accent-foreground cursor-pointer`}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="px-2 py-3 first:pl-4 last:pr-4">
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
				<Link href={`/candidate/attributes/skill/${attribute?.slug}`}>
					<DropdownMenuItem>
						<ReceiptText className="h-4 w-4" /> Details
					</DropdownMenuItem>
				</Link>
				<Link href={`/candidate/attributes/skill/edit/${attribute?.slug}`}>
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

export default CandidateSkillTable
