'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestingAndDebugging({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<Card className="bg-card border-primary/10">
				<CardHeader>
					<CardTitle>Testing and Debugging</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6 prose max-w-none">
					<ul className="list-disc list-inside space-y-2">
						<li><strong>Linting</strong>: Run <code>npm run lint</code> to check code quality with ESLint.</li>
						<li><strong>Development Server</strong>: Use <code>npm run dev</code> for hot-reloading during development.</li>
						<li>
							<strong>Debugging</strong>:
							<ul className="list-disc list-inside ml-5 space-y-2">
								<li>
									Enable Prisma query logging in <code>schema.prisma</code>:
									<pre className="bg-primary/10 p-4 rounded-md font-mono text-sm mt-2">
										<code>{`client {
  provider = "prisma-client-js"
  log      = ["query", "info", "warn", "error"]
}`}</code>
									</pre>
								</li>
								<li>Use browser developer tools for frontend debugging.</li>
								<li>Monitor Stripe webhook logs with <code>npm run webhooks</code>.</li>
							</ul>
						</li>
					</ul>
				</CardContent>
			</Card>
		</DocsContent>
	)
}
