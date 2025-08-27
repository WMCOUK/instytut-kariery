import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CandidateList({ item }) {
	const imageSrc = item?.personal?.image || "/images/placeholder.svg"
	const isAvailable = item?.status === "available"

	return (
		<div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 group">
			{/* Profile Image with Status Indicator */}
			<div className="relative flex-shrink-0">
				<div className="h-16 w-16 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700 group-hover:border-primary/20 transition-colors duration-300 shadow-sm">
					<Image
						width={64}
						height={64}
						src={imageSrc || "/placeholder.svg"}
						alt={item?.personal?.name || "Candidate"}
						className="object-cover h-full w-full"
					/>
				</div>
				{isAvailable && (
					<span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
				)}
			</div>

			{/* Candidate Information */}
			<div className="flex-grow space-y-2">
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
						{item?.personal?.name || "Unnamed Candidate"}
					</h3>
					{item?.featured && (
						<Badge
							variant="outline"
							className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
						>
							Featured
						</Badge>
					)}
				</div>

				<p className="text-gray-700 dark:text-gray-300 font-medium">
					{item?.personal?.designation || "Position not specified"}
				</p>

				<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
					{item?.personal?.city && (
						<div className="flex items-center">
							<MapPin className="mr-1.5 h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
							<span>
								{item.personal.city}
								{item?.personal?.country && `, ${item.personal.country}`}
							</span>
						</div>
					)}

					{item?.experience && (
						<div className="flex items-center">
							<Briefcase className="mr-1.5 h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
							<span>{item.experience} experience</span>
						</div>
					)}

					{item?.lastActive && (
						<div className="flex items-center">
							<Clock className="mr-1.5 h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
							<span>Active {item.lastActive}</span>
						</div>
					)}
				</div>
			</div>

			{/* Action Button */}
			<div className="flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0">
				<Button
					asChild
					variant="outline"
					className="w-full sm:w-auto group-hover:bg-primary group-hover:text-white transition-all duration-300"
				>
					<Link href={`/candidates/${item?.id}`}>View Profile</Link>
				</Button>
			</div>
		</div>
	)
}

