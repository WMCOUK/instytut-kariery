import CategorySlider1 from '@/components/landing/slider/CategorySlider1'
import prisma from '@/utils/prismadb'
import SectionTitle2 from '../../elements/SectionTitle/SectionTitle2'

async function getIndustries() {
	try {
		return await prisma.jobIndustry.findMany({
			orderBy: { createdAt: 'asc' },
		})
	} catch {
		return []
	}
}

export default async function CategorySection1() {
	const industries = await getIndustries()

	if (industries.length === 0) return null

	return (
		<div className="section-padding">
			<div className="container">
				<SectionTitle2
					title="Top Categories"
					subTitle="Explore Exciting Opportunities in the Digital World"
					linkTitle="All Categories"
					url="jobs"
				/>
				<div className="category-slider1">
					<CategorySlider1 industries={industries} />
				</div>
			</div>
		</div>
	)
}
