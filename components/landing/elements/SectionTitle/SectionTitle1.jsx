import { ChevronRight } from 'lucide-react'
import Link from "next/link"



export default function SectionTitle1({ title, subTitle, linkTitle, url, style }) {
	return (
		<>

			<div className="grid lg:grid-cols-2 gap-4 items-end mb-12">
				<div>
					<h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{title}</h2>
					{subTitle && <p className="text-sm md:text-base text-muted-foreground mt-2">{subTitle}</p>}
				</div>

				{linkTitle && (
					<Link
						href={`/${url ?? "#"}`}
						className="flex justify-start lg:justify-end items-center text-primary hover:underline"
					>
						<span className="text-sm md:text-base">{linkTitle}</span>
						<ChevronRight className="h-5 w-5 ml-1" />
					</Link>
				)}
			</div>
		</>
	)
}


