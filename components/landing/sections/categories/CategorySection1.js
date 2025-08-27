'use client'
import CategorySlider1 from '@/components/landing/slider/CategorySlider1'
import SectionTitle2 from '../../elements/SectionTitle/SectionTitle2'

export default function CategorySection1() {
	return (
		<>
			<div className="section-padding">
				<div className="container">
					<SectionTitle2
						title="Top Categories"
						subTitle="Explore Exciting Opportunities in the Digital World"
						linkTitle="All Categories"
						url="jobs"
					/>
					<div className="category-slider1">
						<CategorySlider1 />
					</div>
				</div>
			</div>
		</>
	)
}

