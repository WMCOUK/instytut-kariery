import { Badge } from "@/components/ui/badge"

export default function DemoTitle({ badge, title, description }) {
	return (
		<div className="text-center mb-16">
			<Badge variant="outline" className="mb-2">
				{badge}
			</Badge>
			<h2 className="text-4xl font-bold mb-4">{title}</h2>
			<p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
		</div>
	)
}

