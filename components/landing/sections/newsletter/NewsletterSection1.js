import Newsletter1 from '../../elements/newsletter/Newsletter1'

export default function NewsletterSection1() {
	return (
		<section className="py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="px-10 py-16 rounded-2xl text-center bg-foreground dark:bg-primary/10 relative z-10 overflow-hidden">
					<div
						className="absolute inset-0 z-0 opacity-100"
						style={{
							backgroundImage: "url('/images/pattern/bg3.webp')",
							backgroundSize: "contain",
							backgroundPosition: "center center",
							backgroundRepeat: "no-repeat",
						}}
					/>
					<div className="relative z-10 text-center space-y-4">
						<h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white dark:text-primary">
							Stay Up to Date
						</h2>
						<p className=" text-white/80 dark:text-muted-foreground">
							Subscribe to our newsletter to receive our weekly feed.
						</p>
							<Newsletter1 />
					</div>
				</div>
			</div>
		</section>
	)
}
