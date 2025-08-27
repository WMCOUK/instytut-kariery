import { Star } from 'lucide-react'
import Image from 'next/image'

export default function Testimonial1({ item }) {
	return (
		<div className="px-5 pt-5 pb-8 rounded-2xl text-center max-w-3xl mx-auto mt-8 bg-transparent shadow-sm">
			<Image
				width={90}
				height={90}
				src={`/images/avatar/${item.img}`}
				alt={item.title}
				className="rounded-full mx-auto"
			/>
			<p className="text-card-foreground lg:px-20 mt-5 leading-relaxed text-lg sm:text-xl">
				&ldquo;Each day, I&apos;m inspired by my colleagues to drive innovation that accomplishes this. Jobster fosters an environment of trust and support where I can drive customer success.&rdquo;
			</p>
			<h4 className="mb-1 mt-8 text-xl font-semibold">
				{item.title}
			</h4>
			<h6 className="text-muted-foreground text-sm">
				CEO, Prexius
			</h6>
			<div className="flex justify-center mt-3">
				{[...Array(5)].map((_, index) => (
					<Star
						key={index}
						className="w-5 h-5 mr-1 text-primary fill-primary"
					/>
				))}
			</div>
		</div>
	)
}

