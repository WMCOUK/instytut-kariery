"use client"

import Image from "next/image"
import Marquee from "react-fast-marquee"
import DemoTitle from "./DemoTitle"

const images = [
	{
		src: "/images/demo/landing/1.png",
		alt: `Recruitment Feature`,
	},
	{
		src: "/images/demo/landing/2.png",
		alt: `Recruitment Feature`,
	},
	{
		src: "/images/demo/landing/3.png",
		alt: `Recruitment Feature`,
	},
	{
		src: "/images/demo/landing/1.png",
		alt: `Recruitment Feature`,
	},
	{
		src: "/images/demo/landing/2.png",
		alt: `Recruitment Feature`,
	},
	{
		src: "/images/demo/landing/3.png",
		alt: `Recruitment Feature`,
	},
	{
		src: "/images/demo/landing/1.png",
		alt: `Recruitment Feature`,
	},
	{
		src: "/images/demo/landing/2.png",
		alt: `Recruitment Feature`,
	},
	{
		src: "/images/demo/landing/3.png",
		alt: `Recruitment Feature`,
	},

]

export default function FeaturesMarquee() {
	return (
		<section id="features" className="py-16 bg-gradient-to-b from-background to-muted/30">
			<DemoTitle
				badge="Feature Overview"
				title="Explore Our Platform"
				description="Take a visual tour of our comprehensive Recruitment features"
			/>
			<div className="flex flex-col gap-8 overflow-hidden">
				{/* Left to Right Marquee */}
				<Marquee className="relative overflow-hidden" speed={40} gradientWidth={100} gradientColor={[255, 255, 255]}>
					{images.map((img, i) => (
						<div key={i} className="relative h-[270px] w-[480px] flex-shrink-0 overflow-hidden mx-3">
							<Image
								src={img.src || "/placeholder.svg"}
								alt={img.alt}
								fill
								className="object-cover rounded-lg shadow-lg transition-transform hover:scale-105"
								sizes="480px"
							/>
						</div>
					))}
				</Marquee>

				{/* Right to Left Marquee */}
				<Marquee
					direction="right"
					className="relative overflow-hidden"
					speed={40}
					gradientWidth={100}
					gradientColor={[255, 255, 255]}
				>
					{images.map((img, i) => (
						<div key={i} className="relative h-[270px] w-[480px] flex-shrink-0 overflow-hidden mx-3">
							<Image
								src={img.src || "/placeholder.svg"}
								alt={img.alt}
								fill
								className="object-cover rounded-lg shadow-lg transition-transform hover:scale-105"
								sizes="480px"
							/>
						</div>
					))}
				</Marquee>
			</div>
		</section>
	)
}

