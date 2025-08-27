'use client'

import DocsContent from "@/components/landing/layout/docs/content"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const i18nInfo = [
	{
		title: "Internationalization Overview",
		items: [
			"Recruitly uses **next-intl** for multi-language support.",
			"Translation files are located in `i18n/` folder:",
			"- `en.json`: English",
			"- `fr.json`: French",
			"- `es.json`: Spanish",
			"- `de.json`: German",
		],
	},
	{
		title: "Adding a New Language",
		items: [
			"Create a new file in `i18n/` (e.g., `it.json`).",
			"Add translations for all UI strings.",
			"Update `i18n.js` to include the new locale:",
			"```javascript\nmodule.exports = {\n  locales: ['en', 'fr', 'es', 'de', 'it'],\n  defaultLocale: 'en',\n  pages: {\n    '*': ['common'],\n  },\n};\n```",
		],
	},
]

export default function Internationalization({ title, path }) {
	return (
		<DocsContent title={title} path={path}>
			<div className="space-y-8">
				{/* <h2 className="text-2xl font-semibold text-foreground">{title || "Internationalization"}</h2> */}

				{i18nInfo.map(({ title, items }, idx) => (
					<Card key={idx} className="border">
						<CardHeader>
							<h3 className="text-lg font-semibold text-foreground">{title}</h3>
						</CardHeader>
						<CardContent>
							<ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm whitespace-pre-wrap">
								{items.map((item, i) => (
									<li
										key={i}
										dangerouslySetInnerHTML={{
											__html: item
												.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
												.replace(/`([^`]+)`/g, '<code class="bg-muted px-1 rounded">$1</code>')
												.replace(/\n/g, '<br/>'),
										}}
									/>
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
