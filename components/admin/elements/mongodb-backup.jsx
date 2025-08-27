"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { exportCollection, getAllCollections } from "@/utils/mongodb"

export function DownloadAllCollections() {
  const [dbName, setDbName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [collections, setCollections] = useState([])
  const [showCollections, setShowCollections] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [currentCollection, setCurrentCollection] = useState("")
  const [downloadedCollections, setDownloadedCollections] = useState([])
  const [failedCollections, setFailedCollections] = useState([])

  // Helper function to download a single collection
  const downloadCollection = async (collectionName) => {
    try {
      setCurrentCollection(collectionName)
      const result = await exportCollection(collectionName)

      if (result.success && result.data && result.data.length > 0) {
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

        // Add to downloaded collections
        setDownloadedCollections((prev) => [...prev, collectionName])
        return true
      } else {
        // Add to failed collections
        setFailedCollections((prev) => [...prev, collectionName])
        console.error(`No data found in ${collectionName} or export failed`)
        return false
      }
    } catch (error) {
      console.error(`Error downloading ${collectionName}:`, error)
      setFailedCollections((prev) => [...prev, collectionName])
      return false
    }
  }

  // Function to add delay between downloads
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleDownloadAll = async (event) => {
    event.preventDefault()

    if (!dbName) {
      toast.error("Please enter a database name")
      return
    }

    try {
      // Reset states
      setIsLoading(true)
      setDownloadProgress(0)
      setCurrentCollection("")
      setDownloadedCollections([])
      setFailedCollections([])

      toast.info("Fetching collections from database...")

      const collectionsResult = await getAllCollections(dbName)

      if (!collectionsResult.success) {
        throw new Error(collectionsResult.message)
      }

      const allCollections = collectionsResult.collections
      setCollections(allCollections)
      setShowCollections(true)

      toast.info(`Found ${allCollections.length} collections. Starting download...`)

      // Download collections with a delay between each
      let successCount = 0
      for (let i = 0; i < allCollections.length; i++) {
        const collection = allCollections[i]

        // Update progress
        setDownloadProgress(Math.round((i / allCollections.length) * 100))

        // Download the collection
        const success = await downloadCollection(collection)
        if (success) successCount++

        // Add a delay between downloads to avoid browser limitations
        if (i < allCollections.length - 1) {
          await delay(1000) // 1 second delay between downloads
        }
      }

      // Final progress update
      setDownloadProgress(100)
      setCurrentCollection("")

      if (successCount === allCollections.length) {
        toast.success(`All ${allCollections.length} collections downloaded successfully`)
      } else {
        toast.warning(`Downloaded ${successCount} of ${allCollections.length} collections. Some collections failed.`)
      }
    } catch (error) {
      toast.error(`Download failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSingleCollectionDownload = async (collectionName) => {
    if (isLoading) return

    setIsLoading(true)
    toast.info(`Exporting collection ${collectionName}...`)

    try {
      const success = await downloadCollection(collectionName)
      if (success) {
        toast.success(`Successfully exported ${collectionName}`)
      } else {
        toast.error(`Failed to export ${collectionName}`)
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
        <CardTitle>MongoDB Collection Download</CardTitle>
        <CardDescription>Download all collections from a MongoDB database</CardDescription>
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
                {isLoading ? "Downloading..." : "Download All Collections"}
              </Button>
            </div>
          </div>
        </form>

        {isLoading && downloadProgress > 0 && (
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm">
              <span>Downloading collections...</span>
              <span>{downloadProgress}%</span>
            </div>
            <Progress value={downloadProgress} className="h-2" />
            {currentCollection && <p className="text-sm text-muted-foreground">Current: {currentCollection}</p>}
          </div>
        )}

        {showCollections && collections.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Collections in {dbName}</h3>
            <div className="border rounded-md divide-y">
              {collections.map((collection) => (
                <div key={collection} className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>{collection}</span>
                    {downloadedCollections.includes(collection) && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Downloaded</span>
                    )}
                    {failedCollections.includes(collection) && (
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">Failed</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSingleCollectionDownload(collection)}
                    disabled={isLoading}
                  >
                    {isLoading && currentCollection === collection ? (
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

