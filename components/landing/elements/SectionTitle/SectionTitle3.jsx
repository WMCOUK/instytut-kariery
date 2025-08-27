


export default function SectionTitle3({ title, subTitle, linkTitle, url, style }) {
	return (
		<>

			{/* <div className="grid lg:grid-cols-2 gap-4 items-end mb-12">
				<div>
					<h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">{title}</h2>
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
			</div> */}

			<div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
				Why Choose Us
			</div>
			<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
				Connecting you to your dream career
			</h2>
			<p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
				At our job website, we prioritize delivering an exceptional experience that sets us apart from the
				competition. Here's why thousands of job seekers and employers trust our platform every day.
			</p>
		</>
	)
}


