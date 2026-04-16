import City1 from '@/components/landing/elements/city/City1'
import prisma from '@/utils/prismadb'
import SectionTitle2 from '../../elements/SectionTitle/SectionTitle2'

async function getPopularCities() {
	try {
		return await prisma.jobLocation.findMany({
			orderBy: { createdAt: 'asc' },
			skip: 6,
			take: 6,
		})
	} catch {
		return []
	}
}

export default async function CitySection1() {
	const locations = await getPopularCities()

	if (locations.length === 0) return null

	return (
		<div className="section-padding">
			<div className="container">
				<SectionTitle2
					title="Popular Cities"
					subTitle="Thriving Hubs for Career Advancement and Exciting Opportunities"
				/>

				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-7 mt-20">
					{locations.map((item) => (
						<City1 item={item} key={item.id} />
					))}
				</div>
			</div>
		</div>
	)
}
