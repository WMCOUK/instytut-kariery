'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const authFeatures = [
	{
		title: "Authentication Features",
		items: [
			"**NextAuth.js** for authentication",
			"**Credentials Provider**: Email and password login.",
			"**OAuth Providers**: GitHub and Google.",
			"**Email Verification**: Via Resend API.",
			"**Password Reset**: Secure password reset flow.",
		],
	},
	{
		title: "Key Files",
		items: [
			"`app/api/auth/[...nextauth]/route.js`: Authentication routes.",
			"`components/admin/elements/VerifyEmail.jsx`: Email verification UI.",
			"`components/admin/form/SigninForm.jsx`, `SignupForm.jsx`: Authentication forms.",
		],
	},
]

export default function AuthenticationInfo({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				{/* <h2 className="text-2xl font-semibold text-foreground">{title || "Authentication"}</h2> */}

				{authFeatures.map(({ title, items }, idx) => (
					<Card key={idx} className="border">
						<CardHeader>
							<h3 className="text-lg font-semibold text-foreground">{title}</h3>
						</CardHeader>
						<CardContent>
							<ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
								{items.map((item, i) => (
									<li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
								))}
							</ul>
						</CardContent>
					</Card>
				))}

				<Separator className="my-6" />
			</div>
		</DocsContent>
	)
}
