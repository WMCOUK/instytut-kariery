import Newsletter1 from '../../elements/newsletter/Newsletter1'

export default function NewsletterSection2() {
	return (
		<section className="py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="px-10 py-16 rounded-2xl text-center bg-foreground dark:bg-primary/30 relative z-10 overflow-hidden">
					<div
						className="absolute inset-0 z-0 opacity-100"
						style={{
							backgroundImage: "url('/images/pattern/bg4.webp')",
						}}
					/>
					<div className="relative z-10">
						<h2 className="text-3xl sm:text-4xl md:text-[48px] leading-tight font-bold tracking-tight mb-5 text-card-foreground text-white">
							Stay Up to Date
						</h2>
						<p className="text-lg max-w-2xl mx-auto text-muted-foreground">
							Subscribe to our newsletter to receive our weekly feed.
						</p>

							<Newsletter1 />
					</div>
				</div>
			</div>
		</section>
	)
}



