'use client'

import DocsContent from '@/components/landing/layout/docs/content'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { brandName } from '@/utils'
import { Building2, Globe, Shield, Users } from 'lucide-react'

const userTypes = [
	{
		icon: Users,
		title: 'Candidates',
		description:
			'Build comprehensive profiles, upload CVs, discover opportunities, and manage subscriptions seamlessly.',
		color: 'text-blue-600',
	},
	{
		icon: Building2,
		title: 'Recruiters',
		description:
			'Post job openings, streamline application management, and handle billing with integrated tools.',
		color: 'text-green-600',
	},
	{
		icon: Shield,
		title: 'Administrators',
		description:
			'Oversee user accounts, moderate content, and configure system-wide settings and attributes.',
		color: 'text-purple-600',
	},
	{
		icon: Globe,
		title: 'Public Users',
		description:
			'Explore job listings, browse candidate profiles, and discover recruiters without registration.',
		color: 'text-orange-600',
	},
]

export default function PurposeAndScope({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				{/* Header */}
				<Card>
					<CardHeader className="text-center space-y-2 pb-4">
						<h2 className="text-2xl font-semibold text-foreground">Full-Stack Recruitment Platform</h2>
						<p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
							{brandName} connects talent with opportunity through a comprehensive, scalable platform designed
							for modern recruitment workflows.
						</p>
					</CardHeader>
				</Card>

				{/* User Types Grid */}
				<div className="grid gap-6 md:grid-cols-2">
					{userTypes.map(({ icon: Icon, title, description, color }, i) => (
						<Card key={i} className="border">
							<CardContent className="flex items-start gap-4 p-5">
								<Icon className={`${color} h-6 w-6 flex-shrink-0`} />
								<div>
									<h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Features Section */}
				<Card className="border-l-4 border-l-primary">
					<CardContent className="p-6">
						<h3 className="text-xl font-semibold text-foreground mb-4">Platform Capabilities</h3>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li>
								<strong className="text-foreground">Multi-Role Support:</strong> Tailored experiences for candidates,
								recruiters, admins, and public users.
							</li>
							<li>
								<strong className="text-foreground">Global Ready:</strong> Built-in internationalization for worldwide
								deployment.
							</li>
							<li>
								<strong className="text-foreground">Scalable Architecture:</strong> Designed to grow from startup to
								enterprise scale.
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</DocsContent>
	)
}
