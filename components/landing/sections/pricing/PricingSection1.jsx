import { CheckCircledIcon, ChevronRightIcon } from "@radix-ui/react-icons"

export default function PricingSection1() {
	return (
		<section className="w-full bg-[#090422]">
			<div className="max-w-6xl mx-auto pt-10 pb-36 px-8">
				<div className="max-w-md mx-auto mb-14 text-center">
					<h1 className="text-4xl font-semibold mb-6 lg:text-5xl">
						<span className="text-indigo-600">Simple</span> Pricing
					</h1>
					<p className="text-xl text-gray-500 font-medium">
						Simple no-nonsense pricing. Choose a plan that works for you.
					</p>
				</div>

				<div className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
					<div className="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl md:rounded-b-none sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none">
						<div className="mb-7 pb-7 flex items-center border-b border-gray-300">
							<div className="ml-5 text-black">
								<span className="block text-2xl font-semibold">Basic</span>
								<span>
									<span className="font-medium text-gray-500 text-xl align-top">$&thinsp;</span>
									<span className="text-3xl font-bold">10 </span>
								</span>
								<span className="text-gray-500 font-medium">/ month</span>
							</div>
						</div>
						<ul className="mb-7 font-medium text-gray-500">
							<li className="flex items-center text-lg mb-2">
								<CheckCircledIcon className="w-4 h-4 text-green-500" />
								<span className="ml-3">
									<span className="text-black">Basic Feature 1</span>
								</span>
							</li>
							<li className="flex items-center text-lg mb-2">
								<CheckCircledIcon className="w-4 h-4 text-green-500" />
								<span className="ml-3">
									<span className="text-black">Awsome feature 2</span>
								</span>
							</li>
							<li className="flex items-center text-lg">
								<CheckCircledIcon className="w-4 h-4 text-green-500" />
								<span className="ml-3">
									<span className="text-black">Fancy feature 3</span>
								</span>
							</li>
						</ul>
						<a
							href="/billing"
							className="flex justify-center items-center bg-indigo-600 rounded-xl p-4 text-center text-white text-xl"
						>
							Get Started
							<ChevronRightIcon className="w-6 h-6 ml-2 text-white" />
						</a>
					</div>

					<div className="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl md:rounded-b-none bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
						<div className="mb-8 pb-8 flex items-center border-b border-gray-600">
							<div className="ml-5">
								<span className="block text-3xl font-semibold text-white">Standard</span>
								<span>
									<span className="font-medium text-xl align-top">$&thinsp;</span>
									<span className="text-3xl font-bold text-white">24 </span>
								</span>
								<span className="font-medium">/ month</span>
							</div>
						</div>
						<ul className="mb-10 font-medium text-xl">
							<li className="flex items-center mb-6">
								<CheckCircledIcon className="w-6 h-6 text-green-500" />
								<span className="ml-3">
									All features in <span className="text-white">Basic</span>
								</span>
							</li>
							<li className="flex items-center mb-6">
								<CheckCircledIcon className="w-6 h-6 text-green-500" />
								<span className="ml-3">
									<span className="text-white">Additional feature 1</span>
								</span>
							</li>
							<li className="flex items-center">
								<CheckCircledIcon className="w-6 h-6 text-green-500" />
								<span className="ml-3">
									<span className="text-white">Additional feature 2</span>
								</span>
							</li>
						</ul>
						<a
							href="/billing"
							className="flex justify-center items-center bg-indigo-600 rounded-xl p-4 text-center text-white text-xl"
						>
							Get Started
							<ChevronRightIcon className="w-6 h-6 ml-2 text-white" />
						</a>
					</div>

					<div className="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl md:rounded-b-none sm:w-96 lg:w-full lg:order-3 lg:rounded-l-none">
						<div className="mb-7 pb-7 flex items-center border-b border-gray-300">
							<div className="ml-5 text-black">
								<span className="block text-2xl font-semibold">Advanced</span>
								<span>
									<span className="font-medium text-gray-500 text-xl align-top">$&thinsp;</span>
									<span className="text-3xl font-bold">35 </span>
								</span>
								<span className="text-gray-500 font-medium">/ month</span>
							</div>
						</div>
						<ul className="mb-7 font-medium text-gray-500">
							<li className="flex items-center text-lg mb-2">
								<CheckCircledIcon className="w-4 h-4 text-green-500" />
								<span className="ml-3">
									All features in <span className="text-black">Standard</span>
								</span>
							</li>
							<li className="flex items-center text-lg mb-2">
								<CheckCircledIcon className="w-4 h-4 text-green-500" />
								<span className="ml-3">
									<span className="text-black">Additional feature 1</span>
								</span>
							</li>
							<li className="flex items-center text-lg">
								<CheckCircledIcon className="w-4 h-4 text-green-500" />
								<span className="ml-3">
									<span className="text-black">Additional feature 2</span>
								</span>
							</li>
						</ul>
						<a
							href="/billing"
							className="flex justify-center items-center bg-indigo-600 rounded-xl p-4 text-center text-white text-xl"
						>
							Get Started
							<ChevronRightIcon className="w-6 h-6 ml-2 text-white" />
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
