"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { fetchAllUser } from "@/fetchSwr"

export default function RecentUsers() {
	const { users } = fetchAllUser(1)
	// console.log(users);

	return (
		<>
			{users?.map((user, index) => (
				<div
					key={index}
					className="flex flex-wrap items-center justify-between border-b border-border py-3 last:border-0 gap-2"
				>
					<div className="flex items-center flex-grow">
						<Avatar className="h-8 w-8 sm:h-9 sm:w-9">
							<AvatarImage src={user?.personal?.image} alt="Avatar" />
							<AvatarFallback>
								{user.userName
									?.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div className="ml-3 sm:ml-4 space-y-0 sm:space-y-1">
							<p className="text-xs sm:text-sm font-medium leading-tight">{user?.personal?.name}</p>
							<p className="text-xs sm:text-sm text-muted-foreground">{user.email}</p>
						</div>
					</div>
					<div className="text-xs sm:text-sm font-medium ml-auto">{user.amount}</div>
				</div>
			))}
		</>
	)
}

