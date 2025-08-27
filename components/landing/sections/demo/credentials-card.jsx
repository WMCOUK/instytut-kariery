"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { baseUrl } from "@/utils/baseUrl"
import { Check, Copy, ExternalLink, Globe, Key, Mail } from "lucide-react"
import { useState } from "react"

export default function CredentialsCard() {
	const [hoveredCard, setHoveredCard] = useState(null)
	const [copiedEmail, setCopiedEmail] = useState(null)
	const [copiedPassword, setCopiedPassword] = useState(null)

	const credentials = [
		{
			role: "Admin",
			email: "admin@test.com",
			password: "123456",
			url: `${baseUrl}/admin/overview`,
		},
		{
			role: "Recruiter",
			email: "recruiter@test.com",
			password: "123456",
			url: `${baseUrl}/recruiter/overview`,
		},
		{
			role: "Candidate",
			email: "candidate@test.com",
			password: "123456",
			url: `${baseUrl}/candidate/overview`,
		},
	]

	const copyToClipboard = (text, type, index) => {
		navigator.clipboard.writeText(text).then(() => {
			if (type === "email") {
				setCopiedEmail(index)
				setTimeout(() => setCopiedEmail(null), 2000)
			} else {
				setCopiedPassword(index)
				setTimeout(() => setCopiedPassword(null), 2000)
			}
		})
	}

	return (
		<TooltipProvider>
			<div className="container mx-auto px-4 py-12">
				<h4 className="text-2xl font-bold text-center mb-8">Live Demo Access Credentials</h4>

				<div className="grid md:grid-cols-3 gap-6">
					{credentials.map((cred, index) => (
						<Card
							key={index}
							className={`border-2 transition-all duration-300 ${hoveredCard === index ? "border-primary shadow-lg" : "border-border"
								}`}
							onMouseEnter={() => setHoveredCard(index)}
							onMouseLeave={() => setHoveredCard(null)}
						>
							<CardHeader className="pb-2">
								<CardTitle className="text-xl font-bold">{cred.role}</CardTitle>
								<CardDescription>Access credentials for {cred.role.toLowerCase()} users</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center gap-2">
										<Mail className="h-4 w-4 text-primary" />
										<span className="font-medium">Email:</span>
										<div className="flex items-center justify-between flex-1">
											<div className="text-primary hover:underline flex items-center gap-1">
												{cred.email}
												<ExternalLink className="h-3 w-3" />
											</div>
											<Tooltip>
												<TooltipTrigger asChild>
													<button
														onClick={() => copyToClipboard(cred.email, "email", index)}
														className="p-1 rounded-md hover:bg-muted transition-colors"
														aria-label="Copy email"
													>
														{copiedEmail === index ? (
															<Check className="h-4 w-4 text-green-500" />
														) : (
															<Copy className="h-4 w-4 text-muted-foreground" />
														)}
													</button>
												</TooltipTrigger>
												<TooltipContent>{copiedEmail === index ? "Copied!" : "Copy email"}</TooltipContent>
											</Tooltip>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Key className="h-4 w-4 text-primary" />
										<span className="font-medium">Password:</span>
										<div className="flex items-center justify-between flex-1">
											<span className="font-mono bg-muted px-2 py-1 rounded text-sm">{cred.password}</span>
											<Tooltip>
												<TooltipTrigger asChild>
													<button
														onClick={() => copyToClipboard(cred.password, "password", index)}
														className="p-1 rounded-md hover:bg-muted transition-colors"
														aria-label="Copy password"
													>
														{copiedPassword === index ? (
															<Check className="h-4 w-4 text-green-500" />
														) : (
															<Copy className="h-4 w-4 text-muted-foreground" />
														)}
													</button>
												</TooltipTrigger>
												<TooltipContent>{copiedPassword === index ? "Copied!" : "Copy password"}</TooltipContent>
											</Tooltip>
										</div>
									</div>
									<div className="pt-2">
										<Button
											variant="outline"
											className="w-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
											asChild
										>
											<a href={cred.url} target="_blank" rel="noopener noreferrer">
												<Globe className="h-4 w-4" />
												Access {cred.role} Portal
											</a>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
				<div className="mt-6 text-center text-sm text-muted-foreground">
					<p>Note: Click the copy icons to copy credentials to clipboard</p>
				</div>
			</div>
		</TooltipProvider>
	)
}

