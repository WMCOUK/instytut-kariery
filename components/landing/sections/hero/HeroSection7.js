import { useTranslations } from "next-intl"
import Link from "next/link"

export default function HeroSection7() {
	const t = useTranslations()
	return (
		<>
			<section className="relative bg-[#090422]">
				<section className="flex max-w-7xl mx-auto h-auto w-full flex-col gap-4 p-2 md:p-12 md:flex-row">
					<div className="text-center flex h-full flex-1 flex-col rounded-2xl bg-[#1235EC]">
						<div className=" flex-1 p-6 md:p-12 text-white">
							<h1 className="mb-4 flex flex-col text-5xl md:text-6xl font-bold">
								<span className="opacity-50">{t("landing.hero.title-1")}</span>
								<span className="opacity-70">{t("landing.hero.title-2")}</span>
								<span>{t("landing.hero.title-3")}</span>
							</h1>
							<p className="mb-6">{t("landing.hero.description")}</p>

							<div className="flex justify-center flex-col md:flex-row gap-4">
								<Link
									href="/#pricing"
									className="rounded-full text-center bg-white p-2 px-6 text-black hover:bg-indigo-100"
								>
									{t("landing.hero.cta-1")}
								</Link>
								<a
									href="https://docs.full-stack-kit.dev"
									target="_blank"
									className="rounded-full text-center bg-white/20 p-2 px-6 text-white hover:bg-white/30"
								>
									{t("landing.hero.cta-2")}
								</a>
							</div>
						</div>
					</div>

					{/* <div
					className="hidden w-[35%] bg-gray-300 md:block rounded-xl overflow-hidden"
					style={{
						backgroundImage: `url('${images[bgImageIndex]}')`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/> */}
				</section>
				<div className="flex w-full flex-col justify-center gap-12 md:gap-24 bg-gradient-to-b from-gray-100 to-white p-12 shadow-md md:flex-row">
					<div className="flex flex-col items-center gap-2">
						<div className="text-slate-900">Downloads</div>
						<div className="text-4xl font-bold text-[#1235EC]">140+</div>
						<div className="text-sm text-[#1235EC]">140+ total downloads</div>
					</div>
					<div className="flex flex-col items-center gap-2">
						<div className="text-slate-900">Projects</div>
						<div className="text-4xl font-bold text-[#1235EC]">20+</div>
						<div className="text-sm text-[#1235EC]">20+ projects built</div>
					</div>
					<div className="flex flex-col items-center gap-2">
						<div className="text-slate-900">Time saved</div>
						<div className="text-4xl font-bold text-[#1235EC]">14K+</div>
						<div className="text-sm text-[#1235EC]">14K+ hours saved</div>
					</div>
				</div>
			</section>
		</>
	)
}
