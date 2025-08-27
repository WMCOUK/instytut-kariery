import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CandidateGrid1({ item }) {
	const imageSrc = item?.personal?.image || "/images/placeholder.svg" // Use a default image

	return (
		<div className="relative bg-primary/5 px-6 py-8 rounded-xl text-center wow animate__animated animate__fadeInUp">
			{imageSrc && (
				<Image
					width={70}
					height={70}
					src={imageSrc}
					alt={item?.personal?.name || "Candidate"}
					className="rounded-full mx-auto bg-primary"
				/>
			)}
			<h4 className="mt-5 mb-1 text-lg font-medium">{item?.personal?.name}</h4>
			<p className="text-gray-600 text-sm">{item?.personal?.designation}</p>
			<span className="flex items-center py-4 justify-center">
				<MapPin className="mr-1" size={16} />
				{item?.personal?.city}, {item?.personal?.country}
			</span>
			<Link href={`/candidates/${item?.id}`} className="text-primary inline-block text-sm">
				View Profile
			</Link>
		</div>
	)
}
