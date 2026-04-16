import JobGrid3 from '@/components/landing/elements/job/JobGrid3'
import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import prisma from '@/utils/prismadb'

async function getFeaturedJobs() {
	try {
		return await prisma.job.findMany({
			where: { isFeatured: true },
			orderBy: { createdAt: 'desc' },
			take: 6,
			include: {
				recruiter: true,
				jobLocation: true,
			},
		})
	} catch {
		return []
	}
}

export default async function FeaturedSection3() {
	const jobs = await getFeaturedJobs()

	if (jobs.length === 0) return null

	return (
		<div className="section-padding">
			<div className="container">
				<SectionTitle
					style={1}
					title="Featured Job Offers"
					subTitle="Explore Exciting Opportunities with Prominent Employers"
					linkTitle="All Job Offers"
					url="jobs"
				/>

				<div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-7 mt-20">
					{jobs.map((item) => (
						<JobGrid3 item={item} key={item.id} />
					))}
				</div>
			</div>
		</div>
	)
}
