'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react'
import { FlagIcon } from 'react-flag-kit'
import { Button } from '@/components/ui/button'

const flags = {
	pl: "PL",
	en: "GB",
}

const labels = {
	pl: "Polski",
	en: "English",
}

export default function LanguageDropdown() {
	const [selectedLanguage, setSelectedLanguage] = useState('pl')

	useEffect(() => {
		const languageCookie = document.cookie.split('; ').find(row => row.startsWith('language='))
		if (languageCookie) {
			const value = languageCookie.split('=')[1]
			if (value in flags) {
				setSelectedLanguage(value)
			}
		}
	}, [])

	const handleChange = async (value) => {
		setSelectedLanguage(value)

		await fetch('/api/v1/language', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ value }),
		})

		window.location.reload()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full h-9 w-9 hover:bg-transparent hover:text-primary"
					aria-label={labels[selectedLanguage]}
				>
					<FlagIcon
						className="rounded-full h-5 w-5"
						code={flags[selectedLanguage]}
						size={24}
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="rounded-md shadow-lg p-2 min-w-[8rem]"
				align="end"
			>
				{Object.entries(flags).map(([lang, code]) => (
					<DropdownMenuItem
						key={lang}
						className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md"
						onSelect={() => handleChange(lang)}
					>
						<FlagIcon code={code} size={20} />
						<span className="ml-2">{labels[lang]}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
