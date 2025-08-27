"use client"

import { Input } from "@/components/ui/input"

// import { Input } from "@/components/ui/input"

export default function CtaSection1() {
	return (
		<section>
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div
					className="relative bg-gradient-to-tr from-blue-600 to-purple-500 rounded-lg py-10 px-8 md:py-16 md:px-12 overflow-hidden"
					data-aos="zoom-out"
				>
					<div className="flex flex-col justify-between">
						<div className="mb-6 lg:mb-0 text-left">
							<h3 className="text-4xl font-bold font-uncut-sans mb-2">A Call To Action Section</h3>
							<p className="text-indigo-100">
								You can use this section to call the user to action. Like buying a license, joining
								a newsletter, or anything else.
							</p>
						</div>
						<div className="flex w-full flex-col md:flex-row gap-4 mt-3">
							<Input
								className="bg-gray-200 text-black w-full max-w-xl"
								placeholder="Enter your email"
							/>
							<button
								className="btn-sm w-fit rounded-full text-white bg-gradient-to-t from-purple-600 to-purple-400 hover:to-purple-500 group shadow-lg px-5"
								onClick={() => {
									alert("Thanks for subscribing!")
								}}
							>
								Subscribe
								<span className="tracking-normal text-indigo-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
									&rarr;
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
