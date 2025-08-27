import Image from "next/image"
import Link from "next/link"

export default function City1({ item }) {
	return (
		<Link href={`/jobs?jobLocation=${item.slug}`} className="block group">
			<div className="relative bg-background rounded-xl shadow-sm border border-border/30 transition-all duration-300 group-hover:shadow-md group-hover:border-primary/10 group-hover:translate-y-[-4px] overflow-hidden pt-14 pb-5 px-4">
				{/* Minimal top gradient */}
				<div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary/5 to-transparent"></div>

				{/* Simplified airplane window */}
				<div className="relative mx-auto -mt-10 mb-5">
					<div className="relative w-28 h-24 mx-auto rounded-[40%_40%_45%_45%/60%_60%_40%_40%] bg-card p-2 shadow-sm border border-border/50 transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-md">
						{/* Simplified inner window */}
						<div className="relative w-full h-full rounded-[40%_40%_45%_45%/60%_60%_40%_40%] bg-background overflow-hidden">
							{/* Subtle reflection */}
							<div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white/30 to-transparent z-10 pointer-events-none"></div>

							{/* Image */}
							<div className="relative w-full h-full overflow-hidden rounded-[40%_40%_45%_45%/60%_60%_40%_40%]">
								<Image
									width={120}
									height={120}
									src={`${item.image ? item.image : "/images/placeholder.svg"}`}
									alt={item.title || "City view"}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Simplified content */}
				<div className="text-center">
					<h4 className="text-base font-medium mb-1.5 transition-colors duration-300 group-hover:text-primary">
						{item.title}
					</h4>
					<div className="text-xs text-muted-foreground">
						<span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70 mr-1.5 align-middle"></span>
						{item?.job?.length} Positions
					</div>
				</div>
			</div>
		</Link>
	)
}

