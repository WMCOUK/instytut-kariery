"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { exportTable, getAllTables } from "@/utils/postgresql" // <- updated imports
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function ExportAllTables() {
  const [dbName, setDbName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [tables, setTables] = useState([])
  const [showTables, setShowTables] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [currentTable, setCurrentTable] = useState("")
  const [downloadedTables, setDownloadedTables] = useState([])
  const [failedTables, setFailedTables] = useState([])

  // Download a single table
  const downloadTable = async (tableName) => {
    try {
      setCurrentTable(tableName)
      const result = await exportTable(tableName)

      if (result.success && result.data && result.data.length > 0) {
        const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = result.path?.split("/").pop() || `${tableName}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        setDownloadedTables(prev => [...prev, tableName])
        return true
      } else {
        setFailedTables(prev => [...prev, tableName])
        console.error(`No data found in table ${tableName} or export failed`)
        return false
      }
    } catch (error) {
      console.error(`Error downloading ${tableName}:`, error)
      setFailedTables(prev => [...prev, tableName])
      return false
    }
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const handleDownloadAll = async (event) => {
    event.preventDefault()
    if (!dbName) {
      toast.error("Please enter a database name")
      return
    }

    try {
      setIsLoading(true)
      setDownloadProgress(0)
      setCurrentTable("")
      setDownloadedTables([])
      setFailedTables([])

      toast.info("Fetching tables from database...")

      const tablesResult = await getAllTables(dbName)
      if (!tablesResult.success) {
        throw new Error(tablesResult.message)
      }

      const allTables = tablesResult.tables
      setTables(allTables)
      setShowTables(true)

      toast.info(`Found ${allTables.length} tables. Starting download...`)

      let successCount = 0
      for (let i = 0; i < allTables.length; i++) {
        const table = allTables[i]

        setDownloadProgress(Math.round((i / allTables.length) * 100))

        const success = await downloadTable(table)
        if (success) successCount++

        if (i < allTables.length - 1) {
          await delay(1000) // delay 1 sec between downloads
        }
      }

      setDownloadProgress(100)
      setCurrentTable("")

      if (successCount === allTables.length) {
        toast.success(`All ${allTables.length} tables downloaded successfully`)
      } else {
        toast.warning(`Downloaded ${successCount} of ${allTables.length} tables. Some downloads failed.`)
      }
    } catch (error) {
      toast.error(`Download failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSingleTableDownload = async (tableName) => {
    if (isLoading) return
    setIsLoading(true)
    toast.info(`Exporting table ${tableName}...`)

    try {
      const success = await downloadTable(tableName)
      if (success) {
        toast.success(`Successfully exported ${tableName}`)
      } else {
        toast.error(`Failed to export ${tableName}`)
      }
    } catch (error) {
      toast.error(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>PostgreSQL Table Download</CardTitle>
        <CardDescription>Download all tables from a PostgreSQL database</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleDownloadAll}>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="dbName">Database Name</Label>
              <Input
                id="dbName"
                type="text"
                placeholder="Enter database name"
                value={dbName}
                onChange={(e) => setDbName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <Label>&nbsp;</Label>
              <Button type="submit" disabled={!dbName || isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                {isLoading ? "Downloading..." : "Download All Tables"}
              </Button>
            </div>
          </div>
        </form>

        {isLoading && downloadProgress > 0 && (
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm">
              <span>Downloading tables...</span>
              <span>{downloadProgress}%</span>
            </div>
            <Progress value={downloadProgress} className="h-2" />
            {currentTable && <p className="text-sm text-muted-foreground">Current: {currentTable}</p>}
          </div>
        )}

        {showTables && tables.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Tables in {dbName}</h3>
            <div className="border rounded-md divide-y">
              {tables.map((table) => (
                <div key={table} className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>{table}</span>
                    {downloadedTables.includes(table) && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Downloaded</span>
                    )}
                    {failedTables.includes(table) && (
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">Failed</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSingleTableDownload(table)}
                    disabled={isLoading}
                  >
                    {isLoading && currentTable === table ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
