import prisma from "@/utils/prismadb"
import { Briefcase, MapPin, Users, UserSquare2Icon } from "lucide-react"

async function getCounts() {
	try {
		const [jobCount, recruiterCount, locationCount, userCount] = await Promise.all([
			prisma.job.count(),
			prisma.recruiter.count(),
			prisma.jobLocation.count(),
			prisma.user.count(),
		])
		return { jobCount, recruiterCount, locationCount, userCount }
	} catch {
		return { jobCount: 0, recruiterCount: 0, locationCount: 0, userCount: 0 }
	}
}

export default async function CounterSection1() {
	const { jobCount, recruiterCount, locationCount, userCount } = await getCounts()

	const counters = [
		{
			icon: <Briefcase className="h-8 w-8" />,
			value: jobCount,
			label: "Posted Jobs",
			color: "from-blue-500/20 to-blue-500/5",
			hoverColor: "group-hover:from-blue-600/20 group-hover:to-blue-600/10",
		},
		{
			icon: <UserSquare2Icon className="h-8 w-8" />,
			value: recruiterCount,
			label: "Happy Recruiters",
			color: "from-green-500/20 to-green-500/5",
			hoverColor: "group-hover:from-green-600/20 group-hover:to-green-600/10",
		},
		{
			icon: <MapPin className="h-8 w-8" />,
			value: locationCount,
			label: "Total Cities",
			color: "from-amber-500/20 to-amber-500/5",
			hoverColor: "group-hover:from-amber-600/20 group-hover:to-amber-600/10",
		},
		{
			icon: <Users className="h-8 w-8" />,
			value: userCount,
			label: "Happy Users",
			color: "from-purple-500/20 to-purple-500/5",
			hoverColor: "group-hover:from-purple-600/20 group-hover:to-purple-600/10",
		},
	]

	return (
		<section className="py-16 md:py-24 relative overflow-hidden bg-background">
			<div className="container relative z-10">
				<div className="text-center max-w-2xl mx-auto mb-12">
					<h2 className="text-3xl font-bold tracking-tight mb-3">Our Impact in Numbers</h2>
					<p className="text-muted-foreground">
						We're proud of the difference we've made in connecting talent with opportunity
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{counters.map((counter, index) => (
						<div className="group" key={index}>
							<div
								className={`relative h-full rounded-xl p-6 border border-border/30 bg-gradient-to-br ${counter.color} transition-all duration-500 ${counter.hoverColor} hover:shadow-md hover:-translate-y-1 overflow-hidden backdrop-blur-sm`}
							>
								<div className="absolute top-0 right-0 w-24 h-24 bg-white/10 dark:bg-white/5 rounded-bl-full"></div>
								<div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/5 dark:bg-white/5 rounded-full"></div>

								<div className="flex flex-col h-full">
									<div className="p-3 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm w-fit mb-4">
										{counter.icon}
									</div>
									<div className="mt-auto">
										<div className="flex items-baseline">
											<span className="text-3xl md:text-4xl font-bold tracking-tight">
												{counter.value.toLocaleString()}
											</span>
											<span className="text-xl font-bold ml-1">+</span>
										</div>
										<p className="text-sm font-medium mt-1 text-muted-foreground">{counter.label}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
