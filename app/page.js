import LayoutLanding1 from "@/components/landing/layout/landing/LayoutLanding1"
import Banner1 from "@/components/landing/sections/banner/BannerSection1"
import BlogFeatured1 from "@/components/landing/sections/blog/BlogFeatured1"
import BrandSection1 from "@/components/landing/sections/brand/BrandSection1"
import CategorySection1 from "@/components/landing/sections/categories/CategorySection1"
import CitySection1 from "@/components/landing/sections/city/CitySection1"
import CounterSection1 from "@/components/landing/sections/counter/CounterSection1"
import FeaturedSection3 from "@/components/landing/sections/featured/FeaturedSection3"
import HeroSection1 from "@/components/landing/sections/hero/HeroSection1"
import NewsletterSection1 from "@/components/landing/sections/newsletter/NewsletterSection1"
import TestimonialSection3 from "@/components/landing/sections/testimonial/TestimonialSection3"
import WhyChooseSection1 from "@/components/landing/sections/why/WhyChooseSection1"
export default function Home() {

	return (
		<>
			<LayoutLanding1 isTransparentHeader>
				<HeroSection1 />
				<BrandSection1 />
				<CategorySection1 />
				<FeaturedSection3 />
				<CounterSection1 />
				<WhyChooseSection1 />
				<Banner1 />
				<TestimonialSection3 />
				<CitySection1 />
				<BlogFeatured1 />
				<NewsletterSection1 />
			</LayoutLanding1>
		</>
	)
}
