import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import BannerSection1 from '@/components/landing/sections/banner/BannerSection1'
import BlogSection3 from '@/components/landing/sections/blog/BlogFeatured2'
import BrandSection2 from '@/components/landing/sections/brand/BrandSection2'
import CategorySection4 from '@/components/landing/sections/categories/CategorySection4'
import CitySection1 from '@/components/landing/sections/city/CitySection1'
import CounterSection1 from '@/components/landing/sections/counter/CounterSection1'
import FeaturedSection4 from '@/components/landing/sections/featured/FeaturedSection4'
import HeroSection4 from '@/components/landing/sections/hero/HeroSection4'
import NewsletterSection3 from '@/components/landing/sections/newsletter/NewsletterSection3'
import TestimonialSection3 from '@/components/landing/sections/testimonial/TestimonialSection3'
import WhyChooseSection3 from '@/components/landing/sections/why/WhyChooseSection3'

export default function page() {
	return (
		<>
			<LayoutLanding1>
				<HeroSection4 />
				<CategorySection4 />
				<FeaturedSection4 />
				<WhyChooseSection3 />
				<BannerSection1 />
				<CitySection1 />
				<TestimonialSection3 />
				<CounterSection1 />
				<BrandSection2 />
				<BlogSection3 />
				<NewsletterSection3 />
			</LayoutLanding1>
		</>
	)
}
