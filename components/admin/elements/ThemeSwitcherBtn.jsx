'use client'

import { Button } from "@/components/ui/button"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeSwitcherBtn() {
	const { theme, setTheme, systemTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Ensure the component is mounted before rendering to prevent hydration errors
	useEffect(() => {
		setMounted(true)
	}, [])

	// Fallback to system theme if no theme is set
	const currentTheme = theme === "system" ? systemTheme : theme

	if (!mounted) {
		return null
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full h-9 w-9 hover:bg-transparent hover:text-primary"
			onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
		>
			{currentTheme === 'dark' ? (
				<Moon className="h-[1.2rem] w-[1.2rem]" />
			) : (
				<Sun className="h-[1.2rem] w-[1.2rem]" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
