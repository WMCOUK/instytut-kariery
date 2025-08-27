import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { truncateToWords } from "@/utils"
import { Building2, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function RecruiterList1({ item }) {
	const description = truncateToWords(item?.description, 15)

	return (
		<Link href={`/recruiters/${item?.slug}`} className="block w-full mb-4 group">
			<Card className="transition-all duration-300 hover:shadow-md border border-border/60 group-hover:border-primary/20">
				<CardContent className="p-0">
					<div className="flex flex-col sm:flex-row items-start p-5 gap-5">
						<div className="relative w-full sm:w-auto flex-shrink-0">
							<div className="relative h-32 sm:h-24 sm:w-24 w-full overflow-hidden rounded-lg bg-muted">
								<Image
									fill
									src={item?.image || "/placeholder.svg?height=96&width=96"}
									alt={item?.title}
									className="object-cover transition-transform group-hover:scale-105"
								/>
							</div>
						</div>

						<div className="flex-grow space-y-3">
							<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
								<div>
									<h4 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
										{item?.title}
									</h4>
									<div className="flex flex-wrap items-center gap-3 mt-1.5">
										<span className="text-sm flex items-center text-muted-foreground">
											<MapPin className="mr-1 h-3.5 w-3.5" />
											{item?.city}, {item?.country}
										</span>
										{item?.industry && (
											<span className="text-sm flex items-center text-muted-foreground">
												<Building2 className="mr-1 h-3.5 w-3.5" />
												{item?.industry}
											</span>
										)}
									</div>
								</div>
								<Badge variant="secondary" className="h-7 px-3 sm:self-start">
									{item?.job?.length} {item?.job?.length === 1 ? "Job" : "Jobs"}
								</Badge>
							</div>

							<p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{description}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}

