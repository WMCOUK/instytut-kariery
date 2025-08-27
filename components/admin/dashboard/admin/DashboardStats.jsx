"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchAllJobCount, fetchAllLocation, fetchAllUser, fetchCountRecruiter } from "@/fetchSwr"
import { ArrowDown, ArrowUp, Briefcase, MapPin, UserPlus, Users } from "lucide-react"

export default function DashboardStats() {
	const { allJobCount } = fetchAllJobCount()
	const { totalRecruiter } = fetchCountRecruiter(1)
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
			iconBg: "bg-blue-100 dark:bg-blue-900",
			iconColor: "text-blue-600 dark:text-blue-400",
		},
		{
			title: "Total Recruiters",
			value: totalRecruiter?.toString() || "0",
			change: getPercentageChange(totalRecruiter || 0, totalRecruiter ? totalRecruiter - 1 : 0),
			icon: UserPlus,
			iconBg: "bg-green-100 dark:bg-green-900",
			iconColor: "text-green-600 dark:text-green-400",
		},
		{
			title: "Total Locations",
			value: totalLocation?.toString() || "0",
			change: getPercentageChange(totalLocation || 0, totalLocation ? totalLocation - 1 : 0),
			icon: MapPin,
			iconBg: "bg-yellow-100 dark:bg-yellow-900",
			iconColor: "text-yellow-600 dark:text-yellow-400",
		},
		{
			title: "Total Users",
			value: totalUser?.toString() || "0",
			change: getPercentageChange(totalUser || 0, totalUser ? totalUser - 1 : 0),
			icon: Users,
			iconBg: "bg-purple-100 dark:bg-purple-900",
			iconColor: "text-purple-600 dark:text-purple-400",
		},
	]

	return (
		<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
			{stats.map((stat, index) => (
				<Card
					key={index}
					className="overflow-hidden rounded-xl border border-border/50 hover:shadow-sm transition-all duration-200"
				>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
						<div className={`p-2 rounded-lg ${stat.iconBg}`}>
							<stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-semibold">{stat.value}</div>
						<p
							className={`text-xs flex items-center gap-1 mt-1 ${stat.change.isPositive
									? "text-green-600 dark:text-green-400"
									: "text-red-600 dark:text-red-400"
								}`}
						>
							{stat.change.isPositive ? (
								<ArrowUp className="h-3 w-3" />
							) : (
								<ArrowDown className="h-3 w-3" />
							)}
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
