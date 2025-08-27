"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
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


export default function CandidateJobChart() {
	return (
		<Card className="w-full mb-5">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-base">Vacancy Status</CardTitle>
				{/* <ToggleGroup type="single" defaultValue="monthly" size="sm">
					<ToggleGroupItem value="daily" className="text-xs px-3">
						Daily
					</ToggleGroupItem>
					<ToggleGroupItem value="weekly" className="text-xs px-3">
						Weekly
					</ToggleGroupItem>
					<ToggleGroupItem value="monthly" className="text-xs px-3">
						Monthly
					</ToggleGroupItem>
				</ToggleGroup> */}
			</CardHeader>
			<CardContent className="pt-6">
				<div className="h-[300px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
							<XAxis
								dataKey="month"
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
							<Tooltip content={<CustomTooltip />} />
							<Line
								type="monotone"
								dataKey="applications"
								stroke={config.applications.color}
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 8 }}
							/>
							<Line
								type="monotone"
								dataKey="interviews"
								stroke={config.interviews.color}
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 8 }}
							/>
							<Line
								type="monotone"
								dataKey="rejected"
								stroke={config.rejected.color}
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 8 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<Card className="border-none shadow-md">
				<CardContent className="p-2">
					<p className="text-sm font-semibold mb-2">{label}</p>
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