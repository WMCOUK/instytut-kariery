"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Monthly data (original)
const monthlyData = [
	{ month: "Mar", applications: 40, interviews: 28, rejected: 20 },
	{ month: "Apr", applications: 58, interviews: 32, rejected: 24 },
	{ month: "May", applications: 50, interviews: 35, rejected: 26 },
	{ month: "Jun", applications: 62, interviews: 30, rejected: 20 },
	{ month: "Jul", applications: 40, interviews: 28, rejected: 22 },
	{ month: "Aug", applications: 62, interviews: 32, rejected: 28 },
	{ month: "Sep", applications: 45, interviews: 20, rejected: 34 },
	{ month: "Oct", applications: 55, interviews: 28, rejected: 22 },
	{ month: "Nov", applications: 45, interviews: 30, rejected: 20 },
	{ month: "Dec", applications: 58, interviews: 38, rejected: 28 },
]

// Weekly data
const weeklyData = [
	{ week: "W1", applications: 15, interviews: 8, rejected: 5 },
	{ week: "W2", applications: 18, interviews: 12, rejected: 7 },
	{ week: "W3", applications: 22, interviews: 15, rejected: 10 },
	{ week: "W4", applications: 16, interviews: 10, rejected: 8 },
	{ week: "W5", applications: 20, interviews: 14, rejected: 9 },
	{ week: "W6", applications: 24, interviews: 16, rejected: 12 },
	{ week: "W7", applications: 19, interviews: 13, rejected: 8 },
	{ week: "W8", applications: 21, interviews: 15, rejected: 10 },
]

// Daily data
const dailyData = [
	{ day: "Mon", applications: 8, interviews: 5, rejected: 3 },
	{ day: "Tue", applications: 10, interviews: 7, rejected: 4 },
	{ day: "Wed", applications: 12, interviews: 8, rejected: 5 },
	{ day: "Thu", applications: 9, interviews: 6, rejected: 4 },
	{ day: "Fri", applications: 11, interviews: 7, rejected: 5 },
	{ day: "Sat", applications: 7, interviews: 4, rejected: 3 },
	{ day: "Sun", applications: 5, interviews: 3, rejected: 2 },
]

const config = {
	applications: {
		label: "Applications",
		color: "hsl(142.1, 76.2%, 36.3%)",
	},
	interviews: {
		label: "Interviews",
		color: "hsl(221.2, 83.2%, 53.3%)",
	},
	rejected: {
		label: "Rejected",
		color: "hsl(0, 84.2%, 60.2%)",
	},
}

export default function RecruiterJobChart() {
	const [period, setPeriod] = useState("monthly")

	// Select the appropriate data and x-axis key based on the selected period
	const chartData = period === "daily" ? dailyData : period === "weekly" ? weeklyData : monthlyData

	const xAxisKey = period === "daily" ? "day" : period === "weekly" ? "week" : "month"

	return (
		<Card className="w-full mb-5">
			<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 pb-2">
				<CardTitle className="text-base">Vacancy Status</CardTitle>
				<div className="w-full sm:w-auto">
					<ToggleGroup
						type="single"
						value={period}
						onValueChange={(value) => value && setPeriod(value)}
						size="sm"
						className="flex w-full sm:w-auto"
					>
						<ToggleGroupItem value="daily" className="text-xs flex-1 sm:flex-none px-2 sm:px-3">
							Daily
						</ToggleGroupItem>
						<ToggleGroupItem value="weekly" className="text-xs flex-1 sm:flex-none px-2 sm:px-3">
							Weekly
						</ToggleGroupItem>
						<ToggleGroupItem value="monthly" className="text-xs flex-1 sm:flex-none px-2 sm:px-3">
							Monthly
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
			</CardHeader>
			<CardContent className="pt-4 sm:pt-6">
				<div className="h-[250px] sm:h-[300px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
							<XAxis
								dataKey={xAxisKey}
								axisLine={false}
								tickLine={false}
								tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
								dy={10}
							/>
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
								dx={-10}
							/>
							<Tooltip content={<CustomTooltip period={period} />} />
							<Line
								type="monotone"
								dataKey="applications"
								stroke={config.applications.color}
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 6 }}
							/>
							<Line
								type="monotone"
								dataKey="interviews"
								stroke={config.interviews.color}
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 6 }}
							/>
							<Line
								type="monotone"
								dataKey="rejected"
								stroke={config.rejected.color}
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				{/* Legend */}
				<div className="flex flex-wrap items-center justify-center gap-4 mt-4">
					{Object.entries(config).map(([key, { label, color }]) => (
						<div key={key} className="flex items-center">
							<div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }} />
							<span className="text-xs sm:text-sm">{label}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

const CustomTooltip = ({ active, payload, label, period }) => {
	if (active && payload && payload.length) {
		const periodLabel = period === "daily" ? "Day" : period === "weekly" ? "Week" : "Month"

		return (
			<Card className="border-none shadow-md">
				<CardContent className="p-2">
					<p className="text-sm font-semibold mb-2">
						{periodLabel}: {label}
					</p>
					{payload.map((entry) => (
						<div key={entry.name} className="flex items-center justify-between text-sm">
							<span className="flex items-center">
								<span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: config[entry.name].color }} />
								{config[entry.name].label}:
							</span>
							<span className="font-medium ml-2">{entry.value}</span>
						</div>
					))}
				</CardContent>
			</Card>
		)
	}
	return null
}

