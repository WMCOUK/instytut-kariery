"use client"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { exportCollection } from "@/utils/mongodb"
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function ExportByDate({ isLoading, setIsLoading }) {
	const [collectionName, setCollectionName] = useState("")
	const [dataDate, setDataDate] = useState("")

	const handleExport = async (event) => {
		event.preventDefault()

		if (!collectionName) {
			toast.error("Please enter a collection name")
			return
		}

		if (!dataDate) {
			toast.error("Please select a date")
			return
		}

		try {
			setIsLoading(true)
			toast.info(`Exporting collection ${collectionName} for date ${new Date(dataDate).toLocaleDateString()}...`)

			const result = await exportCollection(collectionName, { dataDate })

			if (result.success) {
				if (result.data && result.data.length > 0) {
					// Create a blob from the data
					const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" })
					const url = URL.createObjectURL(blob)

					// Format the date for the filename
					const formattedDate = new Date(dataDate).toISOString().split("T")[0]

					// Create a download link and trigger it
					const link = document.createElement("a")
					link.href = url
					link.download = result.path.split("/").pop() || `${collectionName}_${formattedDate}.json`
					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
					URL.revokeObjectURL(url)

					toast.success(`Successfully exported ${collectionName} for ${formattedDate}`)
				} else {
					toast.error("No data found for the specified date.")
				}
			} else {
				toast.error(result.message)
			}
		} catch (error) {
			toast.error(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`)
		} finally {
			setIsLoading(false)
			setCollectionName("")
			setDataDate("")
		}
	}

	const handleDateChange = (date) => {
		setDataDate(date ? date.toISOString() : "")
	}

	return (
		<form onSubmit={handleExport}>
			<div className="space-y-2">
				<Label htmlFor="collectionNameDate">Collection Name</Label>
				<Input
					id="collectionNameDate"
					type="text"
					placeholder="Enter collection name"
					value={collectionName}
					onChange={(e) => setCollectionName(e.target.value)}
					required
				/>
			</div>
			<div className="space-y-2">
				<Label>Data Creation Date</Label>
				<DatePicker value={dataDate} onChange={handleDateChange} placeholder="Select Date" />
			</div>
			<Button type="submit" disabled={!collectionName || !dataDate || isLoading} className="w-full mt-2">
				{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
				{isLoading ? "Exporting..." : "Export Single Date Collection"}
			</Button>
		</form>
	)
}

