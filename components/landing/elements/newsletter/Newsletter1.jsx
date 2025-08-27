"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

export default function Newsletter1() {
	const [email, setEmail] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!email) return toast.error("Please enter your email.")

		setIsSubmitting(true)

		try {
			const response = await fetch("/api/v1/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			})

			if (response.status === 409) {
				toast.info("You are already subscribed.")
				return
			}

			if (!response.ok) throw new Error("Subscription failed")

			setEmail("")
			toast.success("Subscribed successfully!")
		} catch (error) {
			toast.error(error.message || "Something went wrong")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto"
		>
			<Input
				type="email"
				placeholder="Enter your email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full bg-background text-foreground"
				required
			/>
			<Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
				{isSubmitting ? "Subscribing..." : "Subscribe"}
			</Button>
		</form>
	)
}
