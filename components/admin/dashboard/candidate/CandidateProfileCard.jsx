'use client'

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { fetchCandidateSkill } from "@/fetchSwr"
import CurrentUserClient from "@/utils/currentUserClient"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

export default function CandidateProfileCard() {
	const searchParams = useSearchParams()
	const page = parseInt(searchParams.get("page") || "1")
	const { skills, totalPage, mutate, isLoading } = fetchCandidateSkill(page)

	const user = CurrentUserClient()

	const colors = ["#2196F3", "#E91E63", "#3F51B5", "#FFC107", "#4CAF50", "#9C27B0"]

	return (
		<div className="py-6">
			{/* Header */}
			<div className="flex justify-between items-start mb-8">
				<div className="flex gap-4">
					<div className="relative w-16 h-16 rounded-lg overflow-hidden">
						<Image src={user?.personal?.image || "/images/placeholder.svg"} alt="Profile picture" fill className="object-cover" />
					</div>
					<div>
						<h2 className="text-xl font-semibold">{user?.personal?.name}</h2>
						<p className="text-primary mb-2">{user?.personal?.designation}</p>
						<div className="flex items-center text-muted-foreground text-sm">
							<MapPin className="w-4 h-4 mr-1" />
							{user?.personal?.city}, {user?.personal?.country}
						</div>
					</div>
				</div>
				<Link href={`/candidates/${user?.id}`} className="text-sm text-blue-600 hover:underline">
					<Button>Profile</Button>
				</Link>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				{/* Skills Progress Bars */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold">Skills</h3>
					<div className="space-y-4">
						{skills.map((skill, index) => (
							<div key={skill.id} className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>{skill.title}</span>
									<span>{skill.percentage}%</span>
								</div>
								<Progress
									value={skill.percentage}
									className="h-2 bg-gray-100"
									style={{ '--progress-color': colors[index % colors.length] }}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Recharts Donut Chart */}
				<div className="w-full flex justify-center">
					<PieChart width={300} height={300}>
						<Pie
							data={skills}
							dataKey="percentage"
							nameKey="title"
							cx="50%"
							cy="50%"
							outerRadius={100}
							innerRadius={60}
							paddingAngle={2}
							label
						>
							{skills.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
							))}
						</Pie>
						<Tooltip />
						<Legend
							formatter={(value) => (
								<span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{value}</span>
							)}
						/>
					</PieChart>
				</div>
			</div>
		</div>
	)
}

