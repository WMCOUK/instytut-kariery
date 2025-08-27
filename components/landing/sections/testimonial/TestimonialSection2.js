'use client'

import TestimonalSlider2 from '@/components/landing/slider/TestimonalSlider2'
import Image from 'next/image'

export default function TestimonialSection2() {
	return (
		<div className="py-12 md:py-24 lg:py-32 relative z-10 bg-card">
			<div
				className="absolute inset-0 z-0 bg-[url('/images/pattern/bg3.webp')] bg-cover bg-center opacity-50"
				aria-hidden="true"
			/>
			<div className="container relative z-10">
				<div className="text-center">
					<h2 className="justify-center text-3xl md:text-4xl 2xl:text-5xl font-semibold text-foreground">
						Why Our Clients Admire Us
					</h2>
					<p className="font-light text-muted-foreground mt-2">
						Testimonials that Showcase our Exceptional Service and Dedication
					</p>
				</div>

				<div className="mt-10">
					<TestimonalSlider2 />
				</div>
			</div>
			<div className="hidden lg:block">
				<Image
					width={70}
					height={70}
					src="/images/avatar/8.png"
					className="rounded-full absolute left-[25%] top-[15%] bg-primary/20 p-3 border border-border"
					alt="Avatar 8"
				/>
				<Image
					width={70}
					height={70}
					src="/images/avatar/9.png"
					className="rounded-full absolute left-[10%] top-[40%] bg-primary/30 p-3 border border-border"
					alt="Avatar 9"
				/>
				<Image
					width={70}
					height={70}
					src="/images/avatar/10.png"
					className="rounded-full absolute left-[17%] bottom-[15%] bg-primary/30 p-3 border border-border"
					alt="Avatar 10"
				/>
				<Image
					width={70}
					height={70}
					src="/images/avatar/11.png"
					className="rounded-full absolute right-[20%] top-[15%] bg-primary/30 p-3 border border-border"
					alt="Avatar 11"
				/>
				<Image
					width={70}
					height={70}
					src="/images/avatar/12.png"
					className="rounded-full absolute right-[5%] bottom-[50%] bg-primary/30 p-3 border border-border"
					alt="Avatar 12"
				/>
				<Image
					width={70}
					height={70}
					src="/images/avatar/13.png"
					className="rounded-full absolute right-[10%] bottom-[15%] bg-primary/30 p-3 border border-border"
					alt="Avatar 13"
				/>
			</div>
		</div>
	)
}

