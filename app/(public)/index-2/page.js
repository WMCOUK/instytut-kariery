import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import BannerSection2 from '@/components/landing/sections/banner/BannerSection2'
import BlogSection2 from '@/components/landing/sections/blog/BlogFeatured1'
import BrandSection2 from '@/components/landing/sections/brand/BrandSection2'
import CategorySection2 from '@/components/landing/sections/categories/CategorySection2'
import CitySection2 from '@/components/landing/sections/city/CitySection2'
import CounterSection1 from '@/components/landing/sections/counter/CounterSection1'
import FeaturedSection2 from '@/components/landing/sections/featured/FeaturedSection2'
import HeroSection2 from '@/components/landing/sections/hero/HeroSection2'
import NewsletterSection2 from '@/components/landing/sections/newsletter/NewsletterSection2'
import TestimonialSection2 from '@/components/landing/sections/testimonial/TestimonialSection2'
import WhyChooseSection2 from '@/components/landing/sections/why/WhyChooseSection2'

export default function Index2() {
	return (
		<>
			<LayoutLanding1>
				<HeroSection2 />
				<CategorySection2 />
				<FeaturedSection2 />
				<BannerSection2 />
				<WhyChooseSection2 />
				<CounterSection1 />
				<TestimonialSection2 />
				<CitySection2 />
				<BrandSection2 />
				<BlogSection2 />
				<NewsletterSection2 />
			</LayoutLanding1>
		</>
	)
}
