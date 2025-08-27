'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'

export default function Testimonial2({ item }) {
	return (
		<div className="p-8 max-w-xl mx-auto mt-8 mb-10 relative rounded-xl bg-transparent">
			<div className="flex mb-4">
				{[...Array(5)].map((_, index) => (
					<Star key={index} className="w-5 h-5 mr-1 text-primary fill-current" />
				))}
			</div>
			<Image
				width={80}
				height={80}
				src={`/images/avatar/${item.img}`}
				alt={`Avatar of ${item.name}`}
				className="absolute -bottom-7 right-3 md:-right-8 rounded-xl border-4 border-border"
			/>
			<p className="my-7 text-xl text-foreground">
				{item.quote || "Each day, I'm inspired by my colleagues to drive innovation that accomplishes this. Jobster fosters an environment of trust and support where I can drive customer success."}
			</p>
			<h4 className="mb-1 text-lg font-semibold text-primary">{item.name || "Jenny Missy"}</h4>
			<h6 className="text-sm text-muted-foreground">{item.position || "Web Developer"}</h6>
		</div>
	)
}

