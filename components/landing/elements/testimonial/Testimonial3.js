import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import Image from "next/image"

export default function Testimonial3({ item }) {
	return (
		<Card className="relative overflow-hidden border-border/40 shadow-sm hover:shadow-md transition-all duration-300 group">
			{/* Decorative elements */}
			<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full z-0"></div>
			<div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-tr-full z-0"></div>

			<CardContent className="p-6 relative z-10">
				{/* Quote icon */}
				<div className="absolute top-6 left-6 text-primary/10 transform -translate-x-1/2 -translate-y-1/2">
					<Quote size={40} className="rotate-180 group-hover:text-primary/20 transition-colors duration-300" />
				</div>

				{/* Avatar and person info */}
				<div className="flex items-center mb-4">
					<div className="relative mr-4">
						<div className="absolute inset-0 rounded-full bg-primary/10 blur-sm transform scale-110 group-hover:scale-125 transition-transform duration-300"></div>
						<div className="relative size-14 rounded-full border-2 border-background overflow-hidden shadow-sm">
							<Image
								width={60}
								height={60}
								src={`/images/avatar/${item.img}`}
								alt={item.name || "Testimonial avatar"}
								className="size-full object-cover"
							/>
						</div>
					</div>

					<div>
						<h5 className="text-base font-semibold leading-tight">{item.name || "Jenny Missy"}</h5>
						<h6 className="text-sm text-muted-foreground">{item.position || "Web Developer"}</h6>
					</div>
				</div>

				{/* Rating */}
				<div className="flex mb-3 items-center">
					{[...Array(5)].map((_, i) => (
						<Star key={i} className="w-4 h-4 fill-primary text-primary mr-0.5" strokeWidth={1.5} />
					))}
					<span className="text-xs text-muted-foreground ml-2 font-medium">5.0</span>
				</div>

				{/* Testimonial text */}
				<div className="relative">
					<p className="text-muted-foreground text-sm leading-relaxed">
						"Each day, I'm inspired by my colleagues to drive innovation that accomplishes this. The supportive
						environment and collaborative culture have truly helped me grow professionally."
					</p>
				</div>
			</CardContent>
		</Card>
	)
}

