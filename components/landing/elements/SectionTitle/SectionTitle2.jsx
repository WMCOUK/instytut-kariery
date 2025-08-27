


export default function SectionTitle2({ title, subTitle, linkTitle, url, style }) {
	return (
		<>

			<div className="flex items-center justify-center text-center mb-12 max-w-3xl mx-auto">
				<div>
					<h2 className="text-xl md:text-2xl xl:text-2xl font-bold text-foreground">{title}</h2>
					{subTitle && <p className="text-sm md:text-sm text-muted-foreground mt-2">{subTitle}</p>}
				</div>

				{/* {linkTitle && (
					<Link
						href={`/${url ?? "#"}`}
						className="flex justify-start lg:justify-end items-center text-primary hover:underline"
					>
						<span className="text-sm md:text-base">{linkTitle}</span>
						<ChevronRight className="h-5 w-5 ml-1" />
					</Link>
				)} */}
			</div>
		</>
	)
}

