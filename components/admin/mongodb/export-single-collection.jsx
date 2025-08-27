"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { exportCollection } from "@/utils/mongodb"
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function ExportSingleCollection() {
	const [collectionName, setCollectionName] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const handleExport = async (event) => {
		event.preventDefault()

		if (!collectionName) {
			toast.error("Please enter a collection name")
			return
		}

		try {
			setIsLoading(true)
			toast.info(`Exporting collection ${collectionName}...`)

			const result = await exportCollection(collectionName)

			if (result.success) {
				if (result.data && result.data.length > 0) {
					// Create a blob from the data
					const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" })
					const url = URL.createObjectURL(blob)

					// Create a download link and trigger it
					const link = document.createElement("a")
					link.href = url
					link.download = result.path.split("/").pop() || `${collectionName}.json`
					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
					URL.revokeObjectURL(url)

					toast.success(`Successfully exported ${collectionName}`)
				} else {
					toast.error("No data found in the collection.")
				}
			} else {
				toast.error(result.message)
			}
		} catch (error) {
			toast.error(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`)
		} finally {
			setIsLoading(false)
			setCollectionName("")
		}
	}

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Export Single Collection</CardTitle>
				<CardDescription>Download a specific MongoDB collection</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleExport}>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="collectionName">Collection Name</Label>
							<Input
								id="collectionName"
								type="text"
								placeholder="Enter collection name"
								value={collectionName}
								onChange={(e) => setCollectionName(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" disabled={!collectionName || isLoading} className="w-full">
							{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
							{isLoading ? "Exporting..." : "Export Collection"}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}

