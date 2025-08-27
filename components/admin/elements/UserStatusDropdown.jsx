"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fetchUser } from "@/fetchSwr"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { toast } from 'sonner'

export default function UserStatusDropdown({ id, isRole }) {
	console.log(isRole)

	const { mutate } = fetchUser(id)
	const [loading, setLoading] = useState(false)
	const [selectedRole, setSelectedRole] = useState(isRole)

	const router = useRouter()

	const submitUserStatus = async (newStatus) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/user/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ isRole: newStatus })
			})

			mutate()

			if (response.ok) {
				toast.success("Status Updated successful!")
			} else {
				throw new Error('User update failed')
			}
		} catch (error) {
			toast.error("Something went wrong")
		} finally {
			setLoading(false)
		}
	}

	const handleStatusChange = (newStatus) => {
		setSelectedRole(newStatus)
		submitUserStatus(newStatus)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-[180px] justify-between">
					<span className="capitalize">{selectedRole}</span>
					<ChevronDownIcon className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[180px]">
				<DropdownMenuLabel>User Status</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={selectedRole} onValueChange={handleStatusChange}>
					<DropdownMenuRadioItem value="ADMIN">Admin</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="USER">User</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="CANDIDATE">Candidate</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="RECRUTER">Recruter</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function ChevronDownIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	)
}
