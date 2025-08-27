"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { importTableDirect } from "./import-table-direct"

// you must place this inside the same file


export function ImportTable() {
	const [tableName, setTableName] = useState("")
	const [importFile, setImportFile] = useState(null)
	const [isPending, startTransition] = useTransition()

	const handleImport = (e) => {
		e.preventDefault()

		if (!tableName) return toast.error("Please enter a table name")
		if (!importFile) return toast.error("Please select a file")

		const formData = new FormData()
		formData.append("tableName", tableName)
		formData.append("file", importFile)

		startTransition(async () => {
			toast.info("Importing table...")

			try {
				const result = await importTableDirect(formData)
				if (result.success) {
					toast.success(result.message)
				} else {
					toast.error(result.message)
				}
			} catch (err) {
				toast.error("Import failed")
			} finally {
				setTableName("")
				setImportFile(null)
			}
		})
	}

	return (
		<form onSubmit={handleImport} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="tableName">Table Name</Label>
				<Input
					id="tableName"
					type="text"
					placeholder="Enter table name"
					value={tableName}
					onChange={(e) => setTableName(e.target.value)}
					required
				/>
			</div>

			<Input type="file" accept=".json" onChange={(e) => setImportFile(e.target.files?.[0])} required />

			<Button type="submit" disabled={!tableName || !importFile || isPending} className="w-full">
				{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
				{isPending ? "Importing..." : "Import Table"}
			</Button>
		</form>
	)
}
