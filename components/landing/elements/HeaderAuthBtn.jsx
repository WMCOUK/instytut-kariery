import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { CircleUser } from "lucide-react"
import Link from "next/link"

import SignoutBtn from "@/components/admin/elements/SignoutBtn"
import currentUserClient from "@/utils/currentUserClient"
// import SignoutBtn from "./SignoutBtn"

export default function HeaderAuthBtn() {
	const user = currentUserClient()

	// console.log(user)


	return (
		<>
			{!user ? (
				<Link href="/signin">
					<Button className="px-4 block" title="Sign in">
						Sign in
					</Button>
				</Link>
			) : (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full h-9 w-9 hover:bg-transparent hover:text-primary"
						>
							{user?.personal?.image ? (
								<Avatar className="h-8 w-8">
									<AvatarImage src={user?.personal?.image} alt={user?.personal?.name || ""} />
									<AvatarFallback>{user?.personal?.name?.charAt(0)}</AvatarFallback>
								</Avatar>
							) : (
								<CircleUser className="h-5 w-5" />
							)}
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						<div className="flex items-center justify-start gap-2 p-2">
							<Avatar className="h-8 w-8">
								<AvatarImage src={user?.personal?.image} alt={user?.personal?.name || ""} />
								<AvatarFallback>{user?.personal?.name?.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{user?.personal?.name}</p>
								<p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
							</div>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							{user?.isAdmin && <Link href="/admin/overview">Dashboard</Link>}
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							{user?.isRecruiter && <Link href="/recruiter/overview">Dashboard</Link>}
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							{user?.isCandidate && <Link href="/candidate/overview">Dashboard</Link>}
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/admin/profile">Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/admin/settings/profile">Settings</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<SignoutBtn />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</>
	)
}

