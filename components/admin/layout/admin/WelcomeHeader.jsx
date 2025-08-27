'use client'
import currentUserClient from "@/utils/currentUserClient"

export default function WelcomeHeader() {
	const user = currentUserClient()
	// console.log(user)

	return (
		<div className="space-y-1">
			<h1 className="text-2xl font-semibold tracking-tight">Hello, {user?.personal?.name || "You"}</h1>
			<p className="text-sm text-muted-foreground">Here is your daily activities and applications</p>
		</div>
	)
}

