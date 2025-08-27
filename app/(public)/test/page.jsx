'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function Test() {
	const [prompt, setPrompt] = useState("")
	const [wordCount, setWordCount] = useState("100")
	const [output, setOutput] = useState("")
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		if (!prompt) return
		setLoading(true)
		setOutput("")

		const fullPrompt = `Write a ${wordCount}-word response for the following: ${prompt}`

		try {
			const res = await fetch("/api/v1/ai", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: fullPrompt }),
			})

			const data = await res.json()
			setOutput(data.text || "No response")
		} catch (err) {
			setOutput("Error generating text")
			console.error(err)
		}

		setLoading(false)
	}

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md space-y-4">
			<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
				AI Text Generator
			</h1>

			<Input
				placeholder="Enter your prompt here..."
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				className="w-full"
			/>

			<Select onValueChange={setWordCount} value={wordCount}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select word count" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="50">50 words</SelectItem>
					<SelectItem value="100">100 words</SelectItem>
					<SelectItem value="150">150 words</SelectItem>
					<SelectItem value="200">200 words</SelectItem>
				</SelectContent>
			</Select>

			<Button onClick={handleClick} disabled={loading || !prompt}>
				{loading ? "Generating..." : "Generate"}
			</Button>

			{output && (
				<div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
					{output}
				</div>
			)}
		</div>
	)
}
