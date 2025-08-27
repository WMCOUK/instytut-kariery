"use client"

import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

const PageCard = ({ name, image, url }) => {
	return (
		<Link href={url}>
			<div className="relative overflow-hidden rounded-lg shadow group cursor-pointer">
				<div className="relative overflow-hidden">
					<img
						src={image || "/images/placeholder.svg"}
						alt={`${name} preview`}
						className="object-cover transition-transform duration-300 group-hover:scale-110"
					/>
				</div>
				<div className="text-center relative inset-0 bg-gradient-to-t from-black/0 via-black/0 to-transparent flex flex-col justify-end p-4">
					<h4 className="text-xl font-semibold mb-1">{name}</h4>
					<div className="flex justify-center items-center text-sm">
						View Page <ArrowRight className="ml-2 h-4 w-4" />
					</div>
				</div>
			</div>
		</Link>
	)
}

const PageSection = ({ pages }) => (
	<div className="mt-24">
		<div className="max-w-xl mx-auto">
			{pages.map((page, index) => (
				<div key={index}>
					<PageCard name={page.name} image={page.image} url={page.url} />
				</div>
			))}
		</div>
	</div>
)

export default function PageShowcase() {
	const { resolvedTheme } = useTheme()

	const landingPages = [
		{
			name: "Home",
			image: resolvedTheme === "dark" ? "/images/demo/landing/17.png" : "/images/demo/landing/18.png",
			url: "/",
		},
	]

	return (
		<section className="py-24 bg-gradient-to-b from-background to-muted/30" id="pages">
			<div className="container px-4 md:px-6">
				<PageSection pages={landingPages} />
			</div>
		</section>
	)
}

