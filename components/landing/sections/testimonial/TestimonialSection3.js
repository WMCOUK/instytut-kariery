import TestimonalSlider3 from '@/components/landing/slider/TestimonalSlider3'
import SectionTitle2 from '../../elements/SectionTitle/SectionTitle2'

export default function TestimonialSection3() {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				{/* <div className="text-center">
					<h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold mb-2">
						Why Our Clients Admire Us
					</h2>
					<p className="text-primary-foreground/80 mt-2">
						Testimonials that Showcase our Exceptional Service and Dedication
					</p>
				</div> */}
				<SectionTitle2
					title="Clients review"
					subTitle="Testimonials that Showcase our Exceptional Service and Dedication"
				// linkText="All Categories"
				/>

				<div className="mt-0">
					<TestimonalSlider3 />
				</div>
			</div>
		</section>
	)
}


