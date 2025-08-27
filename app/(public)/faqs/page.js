import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import FaqSection1 from '@/components/landing/sections/faq/FaqSection1'
import NewsletterSection1 from '@/components/landing/sections/newsletter/NewsletterSection1'
import WhyChooseSection2 from '@/components/landing/sections/why/WhyChooseSection2'
const page = () => {
	return (
		<>
			<LayoutLanding1
				breadcrumbTitle={"Faqs"}
				breadcrumbSubTitle={"Work for the best companies in the world"}
			>
				<div className="container">
					<div className="pt-24">
						<SectionTitle
							style={1}
							title="Frequently Ask Your Questions"
							subTitle="Unleash Your Curiosity with Engaging Articles, Expert Opinions, and Inspiring Stories"
						/>
					</div>
					<FaqSection1 />
				</div>
				<WhyChooseSection2 />
				<NewsletterSection1 />
			</LayoutLanding1>
		</>
	)
}

export default page