import prisma from "@/utils/prismadb"
import BlogGrid1 from "../../elements/blog/BlogGrid1"
import SectionTitle2 from "../../elements/SectionTitle/SectionTitle2"

async function getFeaturedPosts() {
	try {
		return await prisma.post.findMany({
			orderBy: { createdAt: "desc" },
			take: 3,
			include: {
				user: { include: { personal: true } },
				blogCategory: true,
			},
		})
	} catch {
		return []
	}
}

export default async function BlogFeatured1() {
	const posts = await getFeaturedPosts()

	if (posts.length === 0) return null

	return (
		<section className="section-padding relative overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-20 left-0 w-40 h-[80%] border-r border-primary/10 dark:border-primary/20"></div>
				<div className="absolute top-20 left-10 w-40 h-[80%] border-r border-primary/5 dark:border-primary/10"></div>
				<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent"></div>
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent"></div>
				<div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-primary/10 dark:border-primary/20 opacity-50"></div>
				<div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full border border-primary/10 dark:border-primary/20 opacity-50"></div>
				<div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#ffffff0f_1px,transparent_1px)]"></div>
				<div className="absolute inset-0 bg-[url('/images/paper-texture.png')] bg-repeat opacity-[0.03] dark:opacity-0"></div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full bg-primary/5 blur-3xl opacity-0 dark:opacity-30"></div>
				<div className="absolute top-[15%] right-[10%] text-6xl text-primary/10 dark:text-primary/20 animate-float-slow">❝</div>
				<div className="absolute bottom-[20%] left-[15%] text-6xl text-primary/10 dark:text-primary/20 animate-float-slow-reverse">❞</div>
				<div className="absolute left-[5%] top-[30%] w-1 h-40 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-full"></div>
				<div className="absolute right-[8%] bottom-[20%] w-1 h-32 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-full"></div>
			</div>

			<div className="container relative z-10">
				<SectionTitle2
					title="Exploring the World of Knowledge"
					subTitle="Unleash Your Curiosity with Engaging Articles, Expert Opinions, and Inspiring Stories"
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
					{posts.map((item) => (
						<BlogGrid1 item={item} key={item.id} />
					))}
				</div>
			</div>
		</section>
	)
}
