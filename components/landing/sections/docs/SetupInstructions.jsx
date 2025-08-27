'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function SetupInstructions({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				{/* Prerequisites */}
				<Card className="border">
					<CardHeader>
						<h3 className="text-lg font-semibold text-foreground">Prerequisites</h3>
					</CardHeader>
					<CardContent>
						<ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
							<li>
								<strong>Node.js</strong>: Version 18 or higher. Download from{" "}
								<a
									href="https://nodejs.org/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									nodejs.org
								</a>.
							</li>
							<li>
								<strong>PostgreSQL</strong>: Version 12 or higher. Install from{" "}
								<a
									href="https://www.postgresql.org/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									postgresql.org
								</a>{" "}
								or use a managed service like Supabase, Heroku Postgres, or AWS RDS.
							</li>
							<li>
								<strong>Stripe Account</strong>: Sign up at{" "}
								<a
									href="https://stripe.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									stripe.com
								</a>{" "}
								for payment processing.
							</li>
							<li>
								<strong>Cloudinary Account</strong>: Sign up at{" "}
								<a
									href="https://cloudinary.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									cloudinary.com
								</a>{" "}
								for media uploads.
							</li>
							<li>
								<strong>Git</strong>: For version control. Install from{" "}
								<a
									href="https://git-scm.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									git-scm.com
								</a>.
							</li>
						</ul>
					</CardContent>
				</Card>

				{/* Installation Steps */}
				<Card className="border">
					<CardHeader>
						<h3 className="text-lg font-semibold text-foreground">Installation Steps</h3>
					</CardHeader>
					<CardContent className="space-y-6 text-muted-foreground text-sm">
						<ol className="list-decimal list-inside space-y-4">
							<li>
								<strong>Clone the Repository</strong>:
								<pre className="bg-muted p-3 rounded mt-2 text-sm overflow-x-auto whitespace-pre-wrap">
									git clone https://github.com/your-repo/recruitly.git
									<br />
									cd recruitly
								</pre>
							</li>
							<li>
								<strong>Install Dependencies</strong>:
								<pre className="bg-muted p-3 rounded mt-2 text-sm overflow-x-auto whitespace-pre-wrap">
									npm install
								</pre>
								Installs all packages listed in <code>package.json</code>.
							</li>
							<li>
								<strong>Configure PostgreSQL</strong>:
								<p className="mt-2 mb-1">
									Create a new PostgreSQL database named <code>recruitly</code> using tools like pgAdmin or CLI:
								</p>
								<pre className="bg-muted p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
									psql -U postgres
									<br />
									CREATE DATABASE recruitly;
								</pre>
								Update the <code>DATABASE_URL</code> in <code>.env</code> accordingly. Run Prisma migrations:
								<pre className="bg-muted p-3 rounded mt-2 text-sm overflow-x-auto whitespace-pre-wrap">
									npx prisma migrate dev --name init
								</pre>
								Optionally seed the database:
								<pre className="bg-muted p-3 rounded mt-2 text-sm overflow-x-auto whitespace-pre-wrap">
									npx prisma db seed
								</pre>
							</li>
							<li>
								<strong>Set Up Environment Variables</strong>:
								<p className="mt-2">
									Create a <code>.env</code> file in the root directory with necessary variables. Refer to the{" "}
									<a href="#environment-variables" className="text-primary underline">
										Environment Variables
									</a>{" "}
									section.
								</p>
							</li>
							<li>
								<strong>Generate Prisma Client</strong>:
								<pre className="bg-muted p-3 rounded mt-2 text-sm overflow-x-auto whitespace-pre-wrap">
									npm run postinstall
								</pre>
							</li>
							<li>
								<strong>Run the Development Server</strong>:
								<pre className="bg-muted p-3 rounded mt-2 text-sm overflow-x-auto whitespace-pre-wrap">
									npm run dev
								</pre>
								Open <code>http://localhost:3000</code> in your browser.
							</li>
							<li>
								<strong>Set Up Stripe Webhooks</strong> (for payment features):
								<p className="mt-2 mb-1">
									Install the Stripe CLI (macOS example):
								</p>
								<pre className="bg-muted p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
									brew install stripe/stripe-cli/stripe
								</pre>
								Then run:
								<pre className="bg-muted p-3 rounded mt-2 text-sm overflow-x-auto whitespace-pre-wrap">
									npm run webhooks
								</pre>
								This forwards Stripe events to <code>http://localhost:3000/api/v1/webhooks</code>.
							</li>
							<li>
								<strong>Build for Production</strong>:
								<pre className="bg-muted p-3 rounded mt-2 text-sm overflow-x-auto whitespace-pre-wrap">
									npm run build
									<br />
									npm run start
								</pre>
								Deploy to platforms like Vercel, Netlify, or your own server.
							</li>
							<li>
								<strong>Troubleshooting Setup</strong>:
								<ul className="list-disc list-inside mt-2 space-y-1">
									<li>Check PostgreSQL connection and privileges if migrations fail.</li>
									<li>Verify OAuth credentials for authentication issues.</li>
									<li>Test email sending via the Resend dashboard.</li>
								</ul>
							</li>
						</ol>
					</CardContent>
				</Card>

				<Separator className="my-6" />
			</div>
		</DocsContent>
	)
}
