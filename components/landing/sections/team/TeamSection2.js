import SectionTitle from "@/components/landing/elements/SectionTitle/SectionTitle1"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Linkedin, Twitter } from "lucide-react"

const teamMembers = [
	{ name: "Geraldine Tusoy", role: "CEO, Co Founders", image: "/images/avatar/8.png" },
	{ name: "Clara Kolawole", role: "CEO-Founder", image: "/images/avatar/9.png" },
	{ name: "Chris Fulton", role: "Project-Manager", image: "/images/avatar/10.png" },
	{ name: "Dany Connolly", role: "Direct-Founder", image: "/images/avatar/11.png" },
	{ name: "Al-amin Bishash", role: "Director", image: "/images/avatar/12.png" },
	{ name: "Sanuya Santa", role: "Marketing", image: "/images/avatar/13.png" },
	{ name: "Steven Job", role: "Designer", image: "/images/avatar/14.png" },
	{ name: "Romario", role: "Designer", image: "/images/avatar/8.png" },
]

export default function TeamSection2() {
	return (
		<section className="py-16 sm:py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<SectionTitle
					style={2}
					title="Creative Team Members"
					subTitle="Meet the talented individuals behind our success"
				/>

				<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{teamMembers.map((member, index) => (
						<Card
							key={index}
							className="overflow-hidden transition-all duration-300 hover:shadow-lg group bg-card border-0"
						>
							<CardContent className="p-0">
								<div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-primary/30">
									<Avatar className="w-full h-auto aspect-square rounded-none">
										<AvatarImage src={member.image} alt={member.name} className="object-cover object-top" />
									</Avatar>
									<div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</div>
								<div className="p-6 text-center">
									<h3 className="text-lg font-semibold mb-1">{member.name}</h3>
									<p className="text-sm text-muted-foreground mb-4">{member.role}</p>
									<div className="flex justify-center space-x-2">
										<Button variant="ghost" size="icon" className="hover:text-blue-500">
											<Facebook className="h-4 w-4" />
											<span className="sr-only">Facebook</span>
										</Button>
										<Button variant="ghost" size="icon" className="hover:text-sky-500">
											<Twitter className="h-4 w-4" />
											<span className="sr-only">Twitter</span>
										</Button>
										<Button variant="ghost" size="icon" className="hover:text-blue-700">
											<Linkedin className="h-4 w-4" />
											<span className="sr-only">LinkedIn</span>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}

