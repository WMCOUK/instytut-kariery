import DocsContent from '@/components/landing/layout/docs/content'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Mail, MessageCircle, Phone } from 'lucide-react'

export default function Support({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Need Help?</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Choose your preferred method of contact. We're here to assist you 24/7.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<SupportCard
						icon={<Phone className="h-8 w-8 text-green-500" />}
						title="WhatsApp"
						description="+8801843666660"
						content="Available 24/7. Recommended for quick responses."
						action={{
							href: "https://wa.me/8801843666660",
							text: "Send Message",
							icon: <MessageCircle className="h-4 w-4 mr-2" />
						}}
					/>

					<SupportCard
						icon={<MessageCircle className="h-8 w-8 text-blue-500" />}
						title="Skype"
						description="sporsho9"
						content="Available 24/7. Also recommended for quick responses."
						action={{
							href: "skype:sporsho9?chat",
							text: "Add on Skype",
							icon: <MessageCircle className="h-4 w-4 mr-2" />
						}}
					/>

					<SupportCard
						icon={<Mail className="h-8 w-8 text-gray-500" />}
						title="Email"
						description="imsaifun@gmail.com"
						content="Quick notifications and prompt replies."
						action={{
							href: "mailto:imsaifun@gmail.com",
							text: "Send Email",
							icon: <Mail className="h-4 w-4 mr-2" />
						}}
					/>

					<SupportCard
						icon={<FileText className="h-8 w-8 text-orange-500" />}
						title="Pre-Sale Questions"
						description="Need more design or customization?"
						content="Don't worry about quality. We've got you covered."
						action={{
							href: "#hire-now",
							text: "Hire Now",
							icon: <FileText className="h-4 w-4 mr-2" />
						}}
					/>
				</div>
			</div>
		</DocsContent>
	)
}



function SupportCard({ icon, title, description, content, action }) {
	return (
		<Card className="flex flex-col h-full bg-card border-0 transition-all duration-300 hover:shadow-lg">
			<CardHeader className="pb-4">
				<div className="flex items-center space-x-4">
					<div className="p-2 rounded-full bg-primary/10">
						{icon}
					</div>
					<div>
						<CardTitle className="text-xl mb-1">{title}</CardTitle>
						<CardDescription className="text-sm">{description}</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="text-sm text-muted-foreground">{content}</p>
			</CardContent>
			<CardFooter>
				<Button asChild className="w-full group">
					<a
						href={action.href}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center"
					>
						{action.icon}
						<span className="group-hover:underline">{action.text}</span>
					</a>
				</Button>
			</CardFooter>
		</Card>
	)
}

