'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { brandName } from "@/utils"
import { Copy } from 'lucide-react'
import { useState } from "react"

export default function Installation({ title, path }) {
	const [copied, setCopied] = useState(null)

	const handleCopy = (text, index) => {
		navigator.clipboard.writeText(text)
		setCopied(index)
		setTimeout(() => setCopied(null), 5000)
	}

	const commands = [
		{ text: "git clone https://github.com/prexius/jobtree.git", label: "Clone the Repository" },
		{
			text: `cd ${brandName}`, label: "Navigate to the Project Directory"
		},
		{ text: "npm install", label: "Install Dependencies" },
		{ text: "npx prisma migrate dev", label: "Run Database Migrations" },
		{ text: "npm run dev", label: "Start the Development Server" }
	]

	const codeBlocks = [
		`DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase?schema=public"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXTAUTH_SECRET="your-nextauth-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
RESEND_API_KEY="your-resend-api-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"`,
		`npx prisma migrate dev`,
		`npm run dev`,
		`npm run build`,
		`npm start`
	]

	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-6">
				<p className="text-base">
					Welcome to the {brandName} installation guide. Follow the steps below to set up and run the project on your local environment.
				</p>

				<Card className="bg-primary/10 border-0">
					<CardContent className="pt-6">
						<h3 className="font-semibold text-lg mb-4">System Requirements</h3>
						<ul className="list-disc pl-6 space-y-2">
							<li>Node.js (v16 or later)</li>
							<li>npm (v8 or later) or yarn</li>
							<li>Git</li>
							<li>A database (e.g., PostgreSQL, MongoDB) configured in your environment</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="bg-primary/10 border-0">
					<CardContent className="pt-6">
						<h3 className="font-semibold text-lg mb-4">Installation Steps</h3>
						<ol className="list-decimal pl-6 space-y-4">
							{commands.map((command, index) => (
								<li key={index}>
									<span className="font-medium">{command.label}:</span>
									<div className="bg-primary/20 p-3 rounded-md mt-2 flex justify-between items-center">
										<code className="text-sm">{command.text}</code>
										<Button
											variant="outline"
											size="icon"
											onClick={() => handleCopy(command.text, index)}
										>
											{copied === index ? "Copied!" : <Copy />}
										</Button>
									</div>
								</li>
							))}
						</ol>
					</CardContent>
				</Card>

				<Card className="bg-primary/10 border-0">
					<CardContent className="pt-6">
						<h3 className="font-semibold text-lg mb-4">Configuring Your Environment</h3>
						<p>Before running the app, ensure your environment variables are set in the <code>.env</code> file.</p>
						<pre className="bg-primary/20 p-3 rounded-md mt-2 whitespace-pre-wrap break-all">
							{codeBlocks[0]}
						</pre>
					</CardContent>
				</Card>

				<Card className="bg-primary/10 border-0">
					<CardContent className="pt-6">
						<h3 className="font-semibold text-lg mb-4">Running the Project</h3>
						<pre className="bg-primary/20 p-3 rounded-md mt-2 whitespace-pre-wrap break-all">
							{codeBlocks[1]}
						</pre>
						<pre className="bg-primary/20 p-3 rounded-md mt-2 whitespace-pre-wrap break-all">
							{codeBlocks[2]}
						</pre>
					</CardContent>
				</Card>

				<Alert className="mt-4" variant="destructive">
					<AlertTitle className="font-semibold">Error</AlertTitle>
					<AlertDescription>Ensure your Node.js version is compatible with the project requirements.</AlertDescription>
				</Alert>
			</div>
		</DocsContent>
	)
}
