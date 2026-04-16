import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import BlogSection1 from '@/components/landing/sections/blog/BlogSection1'
import NewsletterSection1 from '@/components/landing/sections/newsletter/NewsletterSection1'
import prisma from '@/utils/prismadb'
import { getTranslations } from 'next-intl/server'

export const metadata = {
	title: "Blog | Instytut Kariery",
	description: "Artykuły, porady kariery i aktualności ze świata rekrutacji. Bądź na bieżąco z trendami na rynku pracy.",
}

async function getInitialPosts() {
	const pageSize = 10
	try {
		const [posts, totalPost] = await Promise.all([
			prisma.post.findMany({
				take: pageSize,
				skip: 0,
				orderBy: { createdAt: "desc" },
				include: { user: true, comment: true },
			}),
			prisma.post.count(),
		])
		return {
			posts,
			totalPage: Math.ceil(totalPost / pageSize),
		}
	} catch (error) {
		console.error("Error fetching initial posts:", error)
		return { posts: [], totalPage: 0 }
	}
}

export default async function Blog() {
	const t = await getTranslations('breadcrumb.pages.blog')
	const initialData = await getInitialPosts()

	return (
		<LayoutLanding1
			breadcrumbTitle={t('title')}
			breadcrumbSubTitle={t('subtitle')}
		>
			<BlogSection1 initialData={initialData} />
			<NewsletterSection1 />
		</LayoutLanding1>
	)
}
