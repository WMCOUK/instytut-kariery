import { BookOpen, Handshake, Info, Rocket, Settings, Wrench } from "lucide-react"

export const tableOfContents = [
	{
		title: 'Overview & Getting Started',
		icon: BookOpen,
		items: [
			{ title: 'Introduction', href: '#introduction' },
			{ title: 'Purpose and Scope', href: '#purpose-and-scope' },
			{ title: 'Key Features', href: '#key-features' },
			{ title: 'Technology Stack', href: '#technology-stack' },
			{ title: 'Project Structure', href: '#project-structure' },
		],
	},
	{
		title: 'Setup & Configuration',
		icon: Settings,
		items: [
			{ title: 'Setup Instructions', href: '#setup-instructions' },
			{ title: 'Environment Variables', href: '#environment-variables' },
			{ title: 'Database Schema', href: '#database-schema' },
			{ title: 'API Endpoints', href: '#api-endpoints' },
			// { title: 'Configuration', href: '#configuration' },
			// { title: 'Installation', href: '#installation' },
		],
	},
	{
		title: 'Core Features',
		icon: Rocket,
		items: [
			{ title: 'Authentication', href: '#authentication' },
			{ title: 'Internationalization (i18n)', href: '#internationalization' },
			{ title: 'Payment Integration', href: '#payment-integration' },
			// { title: 'Database', href: '#database' },
			// { title: 'Payments', href: '#payments' },
			{ title: 'Key Components', href: '#key-components' },
			{ title: 'Backup and Restore', href: '#backup-and-restore' },
		],
	},
	{
		title: 'Development & Testing',
		icon: Wrench,
		items: [
			{ title: 'Testing and Debugging', href: '#testing-and-debugging' },
		],
	},
	// {
	// 	title: 'Contributing',
	// 	icon: Handshake,
	// 	items: [
	// 		{ title: 'Contributing Guidelines', href: '#contributing-guidelines' },
	// 	],
	// },
	{
		title: 'Support & Credits',
		icon: Info,
		items: [
			// { title: 'Support and Resources', href: '#support-and-resources' },
			{ title: 'Support', href: '#support' },
			{ title: 'Credits', href: '#credits' },
		],
	},
]
