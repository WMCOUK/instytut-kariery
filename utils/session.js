"use client"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"

export default function Provider({ children }) {
	const [mounted, setMounted] = useState(false)

	// Ensure that the component is only mounted on the client
	useEffect(() => setMounted(true), [])

	if (!mounted) {
		// Prevent rendering mismatched HTML during hydration
		return null
	}

	return (
		<SessionProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</SessionProvider>
	)
}
