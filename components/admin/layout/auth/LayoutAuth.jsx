import { ThemeSwitcherBtn } from "@/components/admin/elements/ThemeSwitcherBtn"
import Logo from "@/components/logo"
import Image from "next/image"
import Link from "next/link"

export function LayoutAuth({ children, mainImg }) {
	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="hidden bg-muted lg:block h-[100vh] relative">
				<Image
					src={`/images/${mainImg ? mainImg : "placeholder.svg"}`}
					alt="Image"
					fill
					sizes="100vw"
					style={{
						objectFit: 'cover',
					}}
					className="h-full w-full object-cover brightness-[0.3] dark:brightness-[0.2] dark:grayscale"
				/>
				<div className="p-10 h-full flex-col lg:flex">
					<Link href="/" className="relative z-20 flex items-center text-lg font-medium">
						<Logo size='lg'transparentHeader  />
					</Link>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg text-primary-foreground/80">"This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before."</p>
							<footer className="text-sm text-primary-foreground/60">Sofia Davis</footer>
						</blockquote>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center py-12 bg-background">
				<div className="absolute top-5 right-5">
					<div>
						<ThemeSwitcherBtn />
					</div>
				</div>
				<div className="mx-auto grid w-[350px] gap-6">
					{children}
				</div>
			</div>
		</div>
	)
}

