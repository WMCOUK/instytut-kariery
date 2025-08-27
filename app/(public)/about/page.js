import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import NewsletterSection1 from '@/components/landing/sections/newsletter/NewsletterSection1'
import TeamSection2 from '@/components/landing/sections/team/TeamSection2'
import TestimonialSection1 from '@/components/landing/sections/testimonial/TestimonialSection1'
import WhyChooseSection1 from '@/components/landing/sections/why/WhyChooseSection1'
const page = () => {
	return (
		<>
			<LayoutLanding1
				breadcrumbTitle={"About Us"}
				breadcrumbSubTitle={"We help employers and candidates find the right fit"}
				breadcrumbAlign={"center"}
			>
				<TeamSection2 />
				<WhyChooseSection1 />
				<TestimonialSection1 />
				<NewsletterSection1 />
			</LayoutLanding1>
		</>
	)
}

export default page