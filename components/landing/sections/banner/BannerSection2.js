import Link from 'next/link'

export default function BannerSection2() {
	return (
		<div className="section-padding">
			<div className="container">
				<div className="px-10 py-16 rounded-2xl bg-gradient-to-t from-primary-foreground to-primary relative z-10 overflow-hidden">
					<div
						className="absolute inset-0 z-0 opacity-20"
						style={{
							backgroundImage: "url('/images/bg/1.jpg')",
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
						}}
					/>
					<div className="max-w-3xl mx-auto text-center relative z-10">
						<h2 className='text-4xl font-bold mb-8 text-white'>
							Discover Career Opportunities
						</h2>
						<p className='text-lg text-white/80'>
							We help candidates know whether they're qualified for a job – and allow you to see their match potential – giving you a better pool of qualified candidates to choose from.
						</p>
						<Link
							href="#"
							className='bg-primary hover:bg-primary/80 transition duration-150 inline-block mt-8 text-white min-w-[180px] text-center py-3 rounded-xl font-medium'
						>
							All Job Offers
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}


