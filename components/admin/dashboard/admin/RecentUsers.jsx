"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { fetchAllUser } from "@/fetchSwr"
import Link from "next/link"

export default function RecentUsers() {
	const { users } = fetchAllUser(1)

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Recent Users</h2>
				<Link href="/users" className="text-sm font-medium text-primary hover:underline">
					View All
				</Link>
			</div>

			<div className="space-y-3">
				{users?.slice(0, 4).map((user, index) => (
					<Card key={index} className="flex items-center gap-4 p-4 hover:shadow-sm transition-shadow">
						<Avatar className="h-12 w-12">
							<AvatarImage src={user?.personal?.image} alt={user?.personal?.name} />
							<AvatarFallback>
								{user?.personal?.name
									?.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>

						<CardContent className="p-0 flex-1">
							<p className="font-medium">{user?.personal?.name}</p>
							<p className="text-sm text-muted-foreground">{user.email}</p>
							<p className="text-sm text-muted-foreground">{user?.personal?.country}</p>
						</CardContent>

						<div className="text-sm font-semibold text-primary">${user.amount}</div>
					</Card>
				))}
			</div>
		</div>
	)
}
