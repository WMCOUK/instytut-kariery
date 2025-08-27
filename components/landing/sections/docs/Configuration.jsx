import DocsContent from "@/components/landing/layout/docs/content"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Cloud, CreditCard, Database, HelpCircle, Key, Lock, TestTube } from 'lucide-react'

export default function Configuration({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-6">
				<Alert>
					<AlertTriangle className="h-4 w-4" />
					<AlertTitle>Important</AlertTitle>
					<AlertDescription>
						Proper configuration is crucial to ensure the smooth operation of the application. Follow the instructions below to configure your environment for both development and production.
					</AlertDescription>
				</Alert>

				<Card className="bg-primary/10 border-0">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Key className="h-5 w-5" />
							Environment Variables
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="mb-4">
							Create a <code className="bg-primary/20 px-1 py-0.5 rounded">.env</code> file in the root of your project with the following variables:
						</p>
						<pre className="bg-primary/20 p-4 rounded-md text-sm overflow-x-auto">
							{`DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase?schema=public"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXTAUTH_SECRET="your-nextauth-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
RESEND_API_KEY="your-resend-api-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"`}
						</pre>
						<p className="mt-4 text-sm text-muted-foreground">
							Replace the placeholder values with your actual configuration. Ensure that your <code className="bg-primary/20 px-1 py-0.5 rounded">.env</code> file is added to your <code className="bg-primary/20 px-1 py-0.5 rounded">.gitignore</code> file.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-primary/10 border-0">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Database className="h-5 w-5" />
							Database Configuration
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="mb-4">
							The application uses Prisma as the ORM. Ensure your <code className="bg-primary/20 px-1 py-0.5 rounded">DATABASE_URL</code> is configured correctly.
						</p>
						<Alert variant="default">
							<AlertTitle>Run this command to set up your database:</AlertTitle>
							<AlertDescription>
								<code className="bg-primary/20 px-2 py-1 rounded">npx prisma migrate dev</code>
							</AlertDescription>
						</Alert>
					</CardContent>
				</Card>

				<Card className="bg-primary/10 border-0">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Lock className="h-5 w-5" />
							Authentication Configuration
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="mb-4">Configure the following variables for NextAuth:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li><Badge variant="outline">NEXTAUTH_SECRET</Badge> - A secret key for encrypting session tokens</li>
							<li><Badge variant="outline">GITHUB_ID</Badge> and <Badge variant="outline">GITHUB_SECRET</Badge> - For GitHub OAuth</li>
							<li><Badge variant="outline">GOOGLE_ID</Badge> and <Badge variant="outline">GOOGLE_SECRET</Badge> - For Google OAuth</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="bg-primary/10 border-0">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Cloud className="h-5 w-5" />
							Cloudinary Configuration
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div>
							Set <Badge variant="outline">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</Badge> with your Cloudinary account name.
						</div>
					</CardContent>
				</Card>

				<Card className="bg-primary/10 border-0">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<CreditCard className="h-5 w-5" />
							Stripe Configuration
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="list-disc pl-6 space-y-2">
							<li><Badge variant="outline">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</Badge> - Your Stripe publishable key</li>
							<li><Badge variant="outline">STRIPE_SECRET_KEY</Badge> - Your Stripe secret key</li>
							<li><Badge variant="outline">STRIPE_WEBHOOK_SECRET</Badge> - The webhook secret for Stripe events</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="bg-primary/10 border-0">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TestTube className="h-5 w-5" />
							Testing Configuration
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							Create a separate <code className="bg-primary/20 px-1 py-0.5 rounded">.env.test</code> file for your test environment.
						</p>
					</CardContent>
				</Card>

				<Card className="bg-primary/10 border-0">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<HelpCircle className="h-5 w-5" />
							Troubleshooting
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="list-disc pl-6 space-y-2">
							<li>Ensure correct Node.js and npm versions are installed</li>
							<li>Verify all environment variables are set properly</li>
							<li>Check database connection and schema migration</li>
							<li>Run <code className="bg-primary/20 px-2 py-1 rounded">npm install</code> to ensure all dependencies are installed</li>
						</ul>
					</CardContent>
				</Card>

				<p className="text-sm text-muted-foreground">
					For additional support, refer to the official documentation or reach out to the support team.
				</p>
			</div>
		</DocsContent>
	)
}

