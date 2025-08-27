"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useIsMobile } from "@/utils/useMobile"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
	{ month: "Mar", accepts: 40, pendings: 28, rejected: 20 },
	{ month: "Apr", accepts: 58, pendings: 32, rejected: 24 },
	{ month: "May", accepts: 50, pendings: 35, rejected: 26 },
	{ month: "Jun", accepts: 62, pendings: 30, rejected: 20 },
	{ month: "Jul", accepts: 40, pendings: 28, rejected: 22 },
	{ month: "Aug", accepts: 62, pendings: 32, rejected: 28 },
	{ month: "Sep", accepts: 45, pendings: 20, rejected: 34 },
	{ month: "Oct", accepts: 55, pendings: 28, rejected: 22 },
	{ month: "Nov", accepts: 45, pendings: 30, rejected: 20 },
	{ month: "Dec", accepts: 58, pendings: 38, rejected: 28 },
]

const config = {
	accepts: {
		label: "Accepts",
		color: "hsl(142.1, 76.2%, 36.3%)",
	},
	pendings: {
		label: "Pendings",
		color: "hsl(221.2, 83.2%, 53.3%)",
	},
	rejected: {
		label: "Rejected",
		color: "hsl(0, 84.2%, 60.2%)",
	},
}

export default function AdminJobChart() {
	const isMobile = useIsMobile()

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-base">Job Status</CardTitle>
			</CardHeader>
			<CardContent className={`pt-${isMobile ? "2" : "6"}`}>
				<div className={`h-[${isMobile ? "250px" : "250px"}] w-full`}>
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={data}
							margin={{
								top: 5,
								right: isMobile ? 5 : 10,
								left: isMobile ? 0 : 10,
								bottom: 0,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
							<XAxis
								dataKey="month"
								axisLine={false}
								tickLine={false}
								tick={{ fill: "hsl(var(--muted-foreground))", fontSize: isMobile ? 10 : 12 }}
								dy={10}
								interval={isMobile ? 1 : 0}
							/>
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{ fill: "hsl(var(--muted-foreground))", fontSize: isMobile ? 10 : 12 }}
								dx={isMobile ? -5 : -10}
								width={isMobile ? 25 : 35}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Legend
								verticalAlign="top"
								height={36}
								iconType="circle"
								iconSize={8}
								formatter={(value) => (
									<span className={`text-${isMobile ? "xs" : "sm"} text-muted-foreground`}>{config[value].label}</span>
								)}
							/>
							<Line
								type="monotone"
								dataKey="accepts"
								stroke={config.accepts.color}
								strokeWidth={2}
								dot={false}
								activeDot={{ r: isMobile ? 6 : 8 }}
							/>
							<Line
								type="monotone"
								dataKey="pendings"
								stroke={config.pendings.color}
								strokeWidth={2}
								dot={false}
								activeDot={{ r: isMobile ? 6 : 8 }}
							/>
							<Line
								type="monotone"
								dataKey="rejected"
								stroke={config.rejected.color}
								strokeWidth={2}
								dot={false}
								activeDot={{ r: isMobile ? 6 : 8 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

const CustomTooltip = ({ active, payload, label }) => {
	const isMobile = useIsMobile()

	if (active && payload && payload.length) {
		return (
			<Card className="border-none shadow-md max-w-[200px]">
				<CardContent className="p-2">
					<p className={`text-${isMobile ? "xs" : "sm"} font-semibold mb-2`}>{label}</p>
					<div className="space-y-1">
						{payload.map((entry) => (
							<div key={entry.name} className={`flex items-center justify-between text-${isMobile ? "xs" : "sm"}`}>
								<span className="flex items-center">
									<span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: config[entry.name].color }} />
									{config[entry.name].label}:
								</span>
								<span className="font-medium ml-2">{entry.value}</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		)
	}
	return null
}

