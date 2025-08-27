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
import DeleteUserDialog from "../elements/DeleteUserDialog"

const columns = (openDeleteDialog, setUserIdToDelete) => [
	// {
	// 	accessorKey: "image",
	// 	header: ({ column }) => <DataTableColumnHeader column={column} title="Image" />,
	// 	cell: ({ row }) =>
	// 		row.original.image ? (
	// 			<Image
	// 				src={row.original.image || "/placeholder.svg"}
	// 				alt={row.original.name}
	// 				width={40}
	// 				height={40}
	// 				className="rounded-full"
	// 			/>
	// 		) : (
	// 			<div className="w-10 h-10 rounded-full bg-gray-500"></div>
	// 		),
	// },
	{
		accessorKey: "userName",
		header: ({ column }) => <DataTableColumnHeader column={column} title="User Name" />,
		cell: ({ row }) => <div className="capitalize">{row.original.userName}</div>,
	},
	{
		accessorKey: "isRole",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
		cell: ({ row }) => <div className="capitalize">{row.original.isRole}</div>,
	},
	{
		accessorKey: "onboard",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Onboard" />,
		cell: ({ row }) => <div className="capitalize">{row.original.onboard}</div>,
	},
	{
		accessorKey: "isSubscription",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Subscription" />,
		cell: ({ row }) => (
			<div className="capitalize">{row.original.isSubscription ? "Active" : "Inactive"}</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row, table }) => (
			<RowActions
				user={row.original}
				openDeleteDialog={openDeleteDialog}
				setUserIdToDelete={setUserIdToDelete}
				mutate={table.options.meta?.mutate}
			/>
		),
	},
]

function UserTable({ data = [], totalPage, page, isLoading, totalUser, mutate }) {
	const currentPage = Number.parseInt(page)
	const prevBtn = currentPage - 1
	const nextBtn = currentPage + 1
	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const [pagination, setPagination] = useState({
		pageIndex: currentPage - 1,
		pageSize: POST_PER_PAGE,
	})

	// Lift delete dialog state here
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [userIdToDelete, setUserIdToDelete] = useState(null)

	const table = useReactTable({
		data,
		columns: columns(setShowDeleteDialog, setUserIdToDelete),
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
			{/* Single Delete Dialog rendered here */}
			<DeleteUserDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				id={userIdToDelete}
				mutate={mutate}
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

			{/* Table */}
			<div className="rounded-md border overflow-x-auto">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className="px-4 py-2 text-muted-foreground text-sm">
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
							? Array.from({ length: POST_PER_PAGE }).map((_, index) => (
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
							))
							: table.getRowModel().rows.map((row) => (
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

			{/* Pagination Footer */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
				<div className="text-sm text-muted-foreground text-center sm:text-left">
					{totalUser > 0 ? (
						<>
							Showing{" "}
							<span className="font-medium">{(currentPage - 1) * POST_PER_PAGE + 1}</span> to{" "}
							<span className="font-medium">{Math.min(currentPage * POST_PER_PAGE, totalUser)}</span> of{" "}
							<span className="font-medium">{totalUser}</span> posts
						</>
					) : (
						"No posts to display"
					)}
				</div>
				<div className="flex gap-2 justify-center sm:justify-end">
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

function RowActions({ user, openDeleteDialog, setUserIdToDelete, mutate }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/admin/user/${user.id}`}>
					<DropdownMenuItem className="flex items-center gap-2">
						<ReceiptText className="h-4 w-4 text-muted-foreground" />
						Details
					</DropdownMenuItem>
				</Link>
				<Link href={`/admin/user/edit/${user.id}`}>
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
							setUserIdToDelete(user.id)
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

export default UserTable
