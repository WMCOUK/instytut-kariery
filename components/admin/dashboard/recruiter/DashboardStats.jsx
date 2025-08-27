"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchAllJobCount, fetchAllLocation, fetchAllRecruiter, fetchAllUser } from "@/fetchSwr"
import { ArrowDown, ArrowUp, Briefcase, MapPin, UserPlus, Users } from "lucide-react"

export default function DashboardStats() {
	const { allJobCount } = fetchAllJobCount()
	const { allRecruiterCount } = fetchAllRecruiter(1)
	const { totalLocation } = fetchAllLocation()
	const { totalUser } = fetchAllUser(1)

	const getPercentageChange = (current, previous) => {
		if (current === 0 && previous === 0) return { value: "0%", isPositive: true }
		if (previous === 0) return { value: "+100%", isPositive: true }
		const change = ((current - previous) / previous) * 100
		const isPositive = change >= 0
		return {
			value: isPositive ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`,
			isPositive,
		}
	}

	const stats = [
		{
			title: "Total Jobs",
			value: allJobCount?.toString() || "0",
			change: getPercentageChange(allJobCount || 0, allJobCount ? allJobCount - 1 : 0),
			icon: Briefcase,
		},
		{
			title: "Total Recruiters",
			value: allRecruiterCount?.toString() || "0",
			change: getPercentageChange(allRecruiterCount || 0, allRecruiterCount ? allRecruiterCount - 1 : 0),
			icon: UserPlus,
		},
		{
			title: "Total Locations",
			value: totalLocation?.toString() || "0",
			change: getPercentageChange(totalLocation || 0, totalLocation ? totalLocation - 1 : 0),
			icon: MapPin,
		},
		{
			title: "Total Users",
			value: totalUser?.toString() || "0",
			change: getPercentageChange(totalUser || 0, totalUser ? totalUser - 1 : 0),
			icon: Users,
		},
	]

	return (
		<div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat, index) => (
				<Card key={index} className="overflow-hidden">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
						<stat.icon className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stat.value}</div>
						<p
							className={`text-xs flex items-center gap-1 mt-1 ${stat.change.isPositive ? "text-green-600" : "text-red-600"
								}`}
						>
							{stat.change.isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
							{stat.change.value}
							<span className="hidden sm:inline"> from last month</span>
							<span className="inline sm:hidden"> last month</span>
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

