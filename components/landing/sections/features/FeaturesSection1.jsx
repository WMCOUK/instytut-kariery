
export default function FeaturesSection1() {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32 bg-[#090422]" id="features">
				<div className="container space-y-12 px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-black">
								Features
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								Faster iteration. More innovation.
							</h2>
							<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								The Next.js Kit for rapid progress. Let you focus on shipping your app features instead of
								wasting time in tedious boilerplate code.
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
						<div className="grid gap-1">
							<h3 className="text-lg font-bold">Authentication</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Authentication with email & password, Magic Link, OAuth with Facebook, Google, Twitter
								and GitHub.
							</p>
						</div>
						<div className="grid gap-1">
							<h3 className="text-lg font-bold">Authorization</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Role based authorization. Protect your routes with ease and control which users can
								access which resources.{" "}
							</p>
						</div>
						<div className="grid gap-1">
							<h3 className="text-lg font-bold">Admin Panel</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Admin panel to manage users, roles, permissions, announcement banners, and more.
							</p>
						</div>
						<div className="grid gap-1">
							<h3 className="text-lg font-bold">Payment & Subscriptions</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Stripe integration. User can upgrade, cancel, update subscriptions and view invoice
								from the billing page.{" "}
							</p>
						</div>
						<div className="grid gap-1">
							<h3 className="text-lg font-bold">Email</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Email is already setup for you. Just add your Email provider credentials SMTP or API
								keys, and you are good to go.
							</p>
						</div>
						<div className="grid gap-1">
							<h3 className="text-lg font-bold">Internationalization</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Support English, French and Spanish out of the box. Easily add more if needed. Helping
								you to reach a wider audience.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
