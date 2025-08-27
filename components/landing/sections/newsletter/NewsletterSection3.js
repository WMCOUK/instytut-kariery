import { Card, CardContent } from '@/components/ui/card'
import Newsletter1 from '../../elements/newsletter/Newsletter1'

export default function NewsletterSection3() {
	return (
		<section className="py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<Card className="relative overflow-hidden">
					<div
						className="absolute inset-0 z-0 opacity-100"
						style={{
							backgroundImage: "url('/images/pattern/bg2.webp')",
							backgroundSize: "contain",
							backgroundPosition: "center center",
							backgroundRepeat: "no-repeat",
						}}
					/>
					<CardContent className="relative z-10 px-10 py-16 text-center">
						<h2 className="text-3xl sm:text-4xl md:text-[48px] leading-tight font-bold tracking-tight mb-5">
							Stay Up to Date
						</h2>
						<p className="text-lg max-w-2xl mx-auto text-muted-foreground">
							Subscribe to our newsletter to receive our weekly feed.
						</p>

						<Newsletter1 />
					</CardContent>
				</Card>
			</div>
		</section>
	)
}




