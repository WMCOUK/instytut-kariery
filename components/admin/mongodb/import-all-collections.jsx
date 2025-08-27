"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { importCollection } from "@/utils/mongodb"
import { Loader2, Upload } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function ImportAllCollections({isLoading, setIsLoading}) {
	const [files, setFiles] = useState([])
	// const [isLoading, setIsLoading] = useState(false)
	const [importProgress, setImportProgress] = useState(0)
	const [currentCollection, setCurrentCollection] = useState("")
	const [importedCollections, setImportedCollections] = useState([])
	const [failedCollections, setFailedCollections] = useState([])
	const [dbPrefix, setDbPrefix] = useState("")

	// Function to add delay between imports
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files || [])
		setFiles(selectedFiles)
	}

	const getCollectionNameFromFile = (file) => {
		// Extract collection name from filename (remove extension)
		const fileName = file.name.split(".")[0]

		// If there's a database prefix, add it to the collection name
		return dbPrefix ? `${dbPrefix}.${fileName}` : fileName
	}

	const importSingleCollection = async (file, collectionName) => {
		try {
			setCurrentCollection(collectionName)

			// Create FormData for the API call
			const formData = new FormData()
			formData.append("file", file)
			formData.append("collectionName", collectionName)

			const result = await importCollection(formData)

			if (result.success) {
				setImportedCollections((prev) => [...prev, collectionName])
				return true
			} else {
				setFailedCollections((prev) => [...prev, collectionName])
				console.error(`Failed to import ${collectionName}: ${result.message}`)
				return false
			}
		} catch (error) {
			console.error(`Error importing ${collectionName}:`, error)
			setFailedCollections((prev) => [...prev, collectionName])
			return false
		}
	}

	const handleImportAll = async (event) => {
		event.preventDefault()

		if (files.length === 0) {
			toast.error("Please select files to import")
			return
		}

		try {
			// Reset states
			setIsLoading(true)
			setImportProgress(0)
			setCurrentCollection("")
			setImportedCollections([])
			setFailedCollections([])

			toast.info(`Starting import of ${files.length} collections...`)

			// Import collections with a delay between each
			let successCount = 0
			for (let i = 0; i < files.length; i++) {
				const file = files[i]
				const collectionName = getCollectionNameFromFile(file)

				// Update progress
				setImportProgress(Math.round((i / files.length) * 100))

				// Import the collection
				const success = await importSingleCollection(file, collectionName)
				if (success) {
					successCount++
					toast.success(`Imported ${collectionName}`)
				} else {
					toast.error(`Failed to import ${collectionName}`)
				}

				// Add a delay between imports
				if (i < files.length - 1) {
					await delay(500) // 0.5 second delay between imports
				}
			}

			// Final progress update
			setImportProgress(100)
			setCurrentCollection("")

			if (successCount === files.length) {
				toast.success(`All ${files.length} collections imported successfully`)
			} else {
				toast.warning(`Imported ${successCount} of ${files.length} collections. Some imports failed.`)
			}
		} catch (error) {
			toast.error(`Import failed: ${error instanceof Error ? error.message : "Unknown error"}`)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Import Multiple Collections</CardTitle>
				<CardDescription>Import multiple JSON files as MongoDB collections</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<form onSubmit={handleImportAll}>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="dbPrefix">Database Prefix (Optional)</Label>
							<Input
								id="dbPrefix"
								type="text"
								placeholder="e.g., mydb (will create mydb.collection)"
								value={dbPrefix}
								onChange={(e) => setDbPrefix(e.target.value)}
							/>
							<p className="text-sm text-muted-foreground">
								If specified, collections will be imported as [prefix].[filename]
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="files">Select JSON Files</Label>
							<Input id="files" type="file" accept=".json" multiple onChange={handleFileChange} required />
							<p className="text-sm text-muted-foreground">Collection names will be derived from filenames</p>
						</div>

						{files.length > 0 && (
							<div className="p-3 border rounded-md bg-muted/50">
								<p className="font-medium mb-2">{files.length} files selected:</p>
								<ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
									{Array.from(files).map((file, index) => (
										<li key={index} className="flex justify-between">
											<span>{file.name}</span>
											<span className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
										</li>
									))}
								</ul>
							</div>
						)}

						<Button type="submit" disabled={files.length === 0 || isLoading} className="w-full">
							{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
							{isLoading ? "Importing..." : "Import All Collections"}
						</Button>
					</div>
				</form>

				{isLoading && importProgress > 0 && (
					<div className="space-y-2 mt-4">
						<div className="flex justify-between text-sm">
							<span>Importing collections...</span>
							<span>{importProgress}%</span>
						</div>
						<Progress value={importProgress} className="h-2" />
						{currentCollection && <p className="text-sm text-muted-foreground">Current: {currentCollection}</p>}
					</div>
				)}

				{(importedCollections.length > 0 || failedCollections.length > 0) && (
					<div className="space-y-3 mt-4">
						{importedCollections.length > 0 && (
							<div>
								<h4 className="text-sm font-medium text-green-600 mb-1">
									Successfully Imported ({importedCollections.length}):
								</h4>
								<div className="text-sm max-h-32 overflow-y-auto p-2 bg-green-50 rounded-md">
									{importedCollections.map((name, index) => (
										<div key={index} className="py-1 border-b border-green-100 last:border-0">
											{name}
										</div>
									))}
								</div>
							</div>
						)}

						{failedCollections.length > 0 && (
							<div>
								<h4 className="text-sm font-medium text-red-600 mb-1">Failed Imports ({failedCollections.length}):</h4>
								<div className="text-sm max-h-32 overflow-y-auto p-2 bg-red-50 rounded-md">
									{failedCollections.map((name, index) => (
										<div key={index} className="py-1 border-b border-red-100 last:border-0">
											{name}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	)
}

