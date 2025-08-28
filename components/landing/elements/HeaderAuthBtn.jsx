"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fetchHeaderAuthUser } from "@/fetchSwr"
import currentUserClient from "@/utils/currentUserClient"
import { CircleUser } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function HeaderAuthBtn() {
	const currentUser = currentUserClient()
	if (!currentUser) {
		return (
			<Link href="/signin">
				<Button className="px-4 block">Sign in</Button>
			</Link>
		)
	}

	const { id, email, isAdmin, isRecruiter, isCandidate } = currentUser

	console.log(currentUser);
	
	const { user, isLoading } = fetchHeaderAuthUser(id)

	if (isLoading) return null // or a small skeleton loader

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full h-9 w-9 hover:bg-transparent hover:text-primary"
				>
					{user?.personal?.image ? (
						<Avatar className="h-8 w-8">
							<AvatarImage src={user.personal.image} alt={user?.personal?.name || ""} />
							<AvatarFallback>{user?.personal?.name?.charAt(0)}</AvatarFallback>
						</Avatar>
					) : (
						<CircleUser className="h-5 w-5" />
					)}
					<span className="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56">
				<div className="flex items-center gap-2 p-2">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user?.personal?.image} alt={user?.personal?.name || ""} />
						<AvatarFallback>{user?.personal?.name?.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<p className="text-sm font-medium">{user?.personal?.name}</p>
						<p className="text-xs text-muted-foreground">{email}</p>
					</div>
				</div>

				<DropdownMenuSeparator />

				{isAdmin && (
					<DropdownMenuItem asChild>
						<Link href="/admin/overview">Dashboard</Link>
					</DropdownMenuItem>
				)}

				{isRecruiter && (
					<DropdownMenuItem asChild>
						<Link href="/recruiter/overview">Dashboard</Link>
					</DropdownMenuItem>
				)}

				{isCandidate && (
					<DropdownMenuItem asChild>
						<Link href="/candidate/overview">Dashboard</Link>
					</DropdownMenuItem>
				)}

				<DropdownMenuItem asChild>
					<Link href="/profile">Profile</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/settings">Settings</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
