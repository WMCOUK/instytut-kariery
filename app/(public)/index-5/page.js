import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import BannerSection1 from '@/components/landing/sections/banner/BannerSection1'
import BlogSection2 from '@/components/landing/sections/blog/BlogFeatured1'
import BrandSection1 from '@/components/landing/sections/brand/BrandSection1'
import CategorySection5 from '@/components/landing/sections/categories/CategorySection5'
import CitySection1 from '@/components/landing/sections/city/CitySection1'
import CounterSection1 from '@/components/landing/sections/counter/CounterSection1'
import FeaturedSection5 from '@/components/landing/sections/featured/FeaturedSection5'
import HeroSection5 from '@/components/landing/sections/hero/HeroSection5'
import NewsletterSection2 from '@/components/landing/sections/newsletter/NewsletterSection2'
import TestimonialSection1 from '@/components/landing/sections/testimonial/TestimonialSection1'
import WhyChooseSection1 from '@/components/landing/sections/why/WhyChooseSection1'

export default function page() {
	return (
		<>
			<LayoutLanding1>
				<HeroSection5 />
				<CategorySection5 />
				<FeaturedSection5 />
				<CounterSection1 />
				<WhyChooseSection1 />
				<BannerSection1 />
				<CitySection1 />
				<TestimonialSection1 />
				<BrandSection1 />
				<BlogSection2 />
				<NewsletterSection2 />
			</LayoutLanding1>
		</>
	)
}
