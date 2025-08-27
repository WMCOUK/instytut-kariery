import { BookOpen, Layers, Search, Shield } from "lucide-react"
import Image from "next/image"
import SectionTitle2 from "../../elements/SectionTitle/SectionTitle2"

const data = [
	{
		title: "Job Opportunities",
		desc: "We provide our customers with access to a vast and diverse range of job opportunities across various industries and sectors.",
		icon: <Layers size={24} />,
	},
	{
		title: "Search and Filtering",
		desc: "Our powerful search and filtering options allow users to refine their job searches based on specific criteria such as location",
		icon: <Search size={24} />,
	},
	{
		title: "Resources and Advice",
		desc: "Resources and Advice In addition to job listings, we offer a wealth of career resources and advice. Our blog, articles, and guides cover a wide.",
		icon: <BookOpen size={24} />,
	},
	{
		title: "Trust and Reliability",
		desc: "We have established a reputation for trust and reliability in the industry. Our commitment to quality job listings, data security.",
		icon: <Shield size={24} />,
	},
]

export default function WhyChooseSection1() {
	return (
		<section className="section-padding relative overflow-hidden">
			<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
			<div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl -z-10"></div>

			<div className="container py-12 mx-auto">
				<SectionTitle2
					title="Why choose us?"
					subTitle="At our job website, we prioritize delivering an exceptional customer experience that sets us apart from the competition. Here are some reasons why our customers love"
				/>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-12 items-center">
					{/* Image Section */}
					<div className="col-1 lg:col-span-2 mb-12 lg:mb-0 relative group">
						<div className="absolute inset-0 bg-primary/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 transform group-hover:scale-105"></div>
						<div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl">
							<Image
								src="/images/about/1.png"
								alt="Why Choose Us"
								width={500}
								height={400}
								className="sm:max-w-sm lg:max-w-full mx-auto rounded-2xl bg-primary/5 transform transition-transform duration-700 group-hover:scale-105 object-cover"
							/>
						</div>
						<div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
					</div>

					{/* Text Section */}
					<div className="col-span-3">
						<div className="grid md:grid-cols-2 gap-5">
							{data.map((item, i) => (
								<div
									className="group transform transition-transform duration-300 hover:-translate-y-2 shadow rounded-xl"
									key={i}
								>
									<div className="bg-card py-7 px-7 rounded-xl border border-transparent group-hover:border-primary/20 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 ease-in-out h-full">
										<div className="text-primary rounded-full p-3 bg-primary/10 inline-flex items-center justify-center group-hover:text-primary-foreground group-hover:bg-white/20 transition-all duration-300 mb-5 transform group-hover:rotate-6">
											{item.icon}
										</div>
										<h3 className="mb-2 text-xl font-semibold group-hover:text-primary-foreground transition-colors duration-300">
											{item.title}
										</h3>
										<p className="text-muted-foreground leading-loose group-hover:text-primary-foreground/90 transition-colors duration-300">
											{item.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
