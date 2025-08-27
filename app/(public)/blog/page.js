
import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import BlogSection1 from '@/components/landing/sections/blog/BlogSection1'
import NewsletterSection1 from '@/components/landing/sections/newsletter/NewsletterSection1'


export default function Blog() {
	return (
		<>
			<LayoutLanding1
				breadcrumbTitle={"Our Blog"}
				breadcrumbSubTitle={"Work for the best companies in the world"}
			>
				<BlogSection1 />
				<NewsletterSection1 />
			</LayoutLanding1>
		</>
	)
}