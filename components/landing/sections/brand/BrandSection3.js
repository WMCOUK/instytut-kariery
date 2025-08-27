

import BrandSlider2 from '@/components/landing/slider/BrandSlider2'

export default function BrandSection3() {
	return (
		<>
			<div className="py-16 relative bg-card">
				<div className="container">
					{/* <SectionTitle
                        style={2}
                        title="Clients & Partners"
                        subTitle="Dedicated and Trusted Partners"
                    /> */}


					<div className="flex items-center py-8 px-5 rounded-lg">
						<h3 className='min-w-[300px] font-semibold'>Trusted By Us</h3>
						<BrandSlider2 />
					</div>
				</div>
			</div>
		</>
	)
}
