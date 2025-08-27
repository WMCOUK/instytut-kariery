import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import HeroSection3 from '@/components/landing/sections/hero/HeroSection3'
// import Layout from '@/components/layout/landing/Layout'
import BlogSection3 from '@/components/landing/sections/blog/BlogFeatured2'
import BrandSection3 from '@/components/landing/sections/brand/BrandSection3'
import CategorySection3 from '@/components/landing/sections/categories/CategorySection3'
import CitySection3 from '@/components/landing/sections/city/CitySection3'
import FeaturedSection3 from '@/components/landing/sections/featured/FeaturedSection3'
import NewsletterSection3 from '@/components/landing/sections/newsletter/NewsletterSection3'
import TestimonialSection3 from '@/components/landing/sections/testimonial/TestimonialSection3'

export default function page() {
	return (
		<>
			<LayoutLanding1 isTransparentHeader>
				<HeroSection3 />
				<CategorySection3 />
				<FeaturedSection3 />
				<TestimonialSection3 />
				<BrandSection3 />
				<CitySection3 />
				<BlogSection3 />
				<NewsletterSection3 />
			</LayoutLanding1>
		</>
	)
}
