'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const envVariables = [
	{
		title: "DATABASE_URL and DIRECT_URL",
		description: (
			<>
				PostgreSQL connection strings used by Prisma and direct connections. Format:
				<code className="block my-2 bg-muted p-2 rounded">
					postgresql://user:password@host:port/database?schema=public
				</code>
				Create user & database, grant privileges. Test connection via <code>psql</code>.
				Use strong passwords and never expose credentials publicly.
			</>
		),
	},
	{
		title: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
		description: (
			<>
				Your Cloudinary account identifier for media uploads.
				Public and safe for client use.
				Sign up at{" "}
				<a href="https://cloudinary.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
					cloudinary.com
				</a>
				. Configure security settings on your Cloudinary dashboard.
			</>
		),
	},
	{
		title: "NEXTAUTH_SECRET",
		description: (
			<>
				Secret key to encrypt sessions and JWTs in NextAuth.js.
				Generate with <code>openssl rand -hex 32</code>.
				Must be at least 32 characters, keep it secret and rotate if compromised.
			</>
		),
	},
	{
		title: "GITHUB_ID and GITHUB_SECRET",
		description: (
			<>
				OAuth credentials for GitHub login.
				Create a GitHub OAuth app at{" "}
				<a href="https://github.com/settings/apps" target="_blank" rel="noopener noreferrer" className="text-primary underline">
					github.com/settings/apps
				</a>
				. Use proper callback URLs and keep secrets confidential.
			</>
		),
	},
	{
		title: "GOOGLE_ID and GOOGLE_SECRET",
		description: (
			<>
				OAuth credentials for Google login.
				Configure in Google Cloud Console at{" "}
				<a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary underline">
					console.cloud.google.com/apis/credentials
				</a>
				. Setup redirect URIs, enable required APIs, and keep secrets safe.
			</>
		),
	},
	{
		title: "RESEND_API_KEY",
		description: (
			<>
				API key for sending emails via Resend service.
				Obtain it from{" "}
				<a href="https://resend.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
					resend.com
				</a>
				. Verify domains for better deliverability.
			</>
		),
	},
	{
		title: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET",
		description: (
			<>
				Keys for Stripe payment integration.
				Get keys from Stripe dashboard{" "}
				<a href="https://stripe.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
					stripe.com
				</a>
				. Use test keys for development, live keys in production.
				Configure webhooks for payment event handling.
				Never expose secret keys on client side.
			</>
		),
	},
]

export default function EnvironmentVariables({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				{/* <h2 className="text-2xl font-semibold text-foreground">{title || "Environment Variables"}</h2> */}

				<p className="text-muted-foreground leading-relaxed">
					Environment variables are crucial for configuring the application securely. They store sensitive information like API keys and database credentials. Create a <code>.env</code> file in the project root (never commit it to Git—it's ignored via <code>.gitignore</code>).
					Below is a template and explanations.
				</p>

				<Card className="border">
					<CardHeader>
						<h3 className="text-lg font-semibold text-foreground">Template for <code>.env</code> File</h3>
					</CardHeader>
					<CardContent>
						<pre className="bg-muted p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap">
							{`# PostgreSQL Database Connection
DATABASE_URL=postgresql://user:password@localhost:5432/recruitly?schema=public
DIRECT_URL=postgresql://user:password@localhost:5432/recruitly?schema=public

# Cloudinary for Media Uploads
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

# NextAuth.js for Authentication
NEXTAUTH_SECRET=your_nextauth_secret

# OAuth Providers (GitHub)
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# OAuth Providers (Google)
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# Resend for Email Sending
RESEND_API_KEY=your_resend_api_key

# Stripe for Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret`}
						</pre>
					</CardContent>
				</Card>

				{envVariables.map(({ title, description }, idx) => (
					<Card key={idx} className="border">
						<CardHeader>
							<h3 className="text-lg font-semibold text-foreground">{title}</h3>
						</CardHeader>
						<CardContent className="text-muted-foreground text-sm">{description}</CardContent>
					</Card>
				))}

				<Separator className="my-6" />
			</div>
		</DocsContent>
	)
}
