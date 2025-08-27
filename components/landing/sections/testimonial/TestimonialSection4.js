export default function TestimonialSection4() {
	return (
		<section className="px-4 sm:px-6" id="testimonials">
			<div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
				<figure className="max-w-screen-md mx-auto">
					<svg
						className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
						viewBox="0 0 24 27"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
							fill="currentColor"
						/>
					</svg>
					<blockquote>
						<p className="text-2xl font-medium text-gray-900 dark:text-white">
							"Here you can add a good testimonial or a quote from someone that used your app or
							your service. There a also a testimonial grid component you can use to showcase
							multiple testimonials."
						</p>
					</blockquote>
					<figcaption className="flex items-center justify-center mt-6 space-x-3">
						<a href="#" target="_blank">
							<img
								className="w-12 h-12 rounded-full"
								src="/images/avatar/1.png"
								alt="profile picture"
							/>
						</a>
						<div className="flex flex-col">
							<a
								className="font-medium text-left text-gray-900 dark:text-white"
								href="#"
								target="_blank"
							>
								Jhon Doe
							</a>
							<div className="text-sm font-light">
								<a className="text-blue-600 dark:text-blue-300 underline" href="#" target="_blank">
									Happy of my App
								</a>
							</div>
						</div>
					</figcaption>
				</figure>
			</div>
		</section>
	)
}
