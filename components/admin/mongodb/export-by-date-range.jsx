"use client"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { exportCollection } from "@/utils/mongodb"
import { downloadJsonBlob } from "@/utils/download"

export function ExportByDateRange({ isLoading, setIsLoading }) {
  const [collectionName, setCollectionName] = useState("")
  const [filterStartDate, setFilterStartDate] = useState("")
  const [filterEndDate, setFilterEndDate] = useState("")

  const handleExport = async (event) => {
    event.preventDefault()

    if (!collectionName) {
      toast.error("Please enter a collection name")
      return
    }

    if (!filterStartDate || !filterEndDate) {
      toast.error("Please select both start and end dates")
      return
    }

    try {
      setIsLoading(true)
      toast.info("Exporting collection...")

      const result = await exportCollection(collectionName, {
        filterStartDate,
        filterEndDate,
      })

      if (result.success) {
        if (result.data && result.data.length > 0) {
          const startDate = new Date(filterStartDate).toISOString().split("T")[0]
          const endDate = new Date(filterEndDate).toISOString().split("T")[0]
          downloadJsonBlob(
            result.data,
            result.path.split("/").pop() || `${collectionName}_${startDate}_to_${endDate}.json`,
          )
          toast.success(result.message)
        } else {
          toast.error("No data found for the specified date range.")
        }
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
      setCollectionName("")
      setFilterStartDate("")
      setFilterEndDate("")
    }
  }

  const handleStartDateChange = (date) => {
    setFilterStartDate(date ? date.toISOString() : "")
  }

  const handleEndDateChange = (date) => {
    setFilterEndDate(date ? date.toISOString() : "")
  }

  return (
    <form onSubmit={handleExport}>
      <div className="space-y-2">
        <Label htmlFor="collectionNameRange">Collection Name</Label>
        <Input
          id="collectionNameRange"
          type="text"
          placeholder="Enter collection name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Date Range</Label>
        <div className="flex space-x-2">
          <DatePicker value={filterStartDate} onChange={handleStartDateChange} placeholder="Start Date" />
          <DatePicker value={filterEndDate} onChange={handleEndDateChange} placeholder="End Date" />
        </div>
      </div>
      <Button
        type="submit"
        disabled={!collectionName || !filterStartDate || !filterEndDate || isLoading}
        className="w-full mt-2"
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {isLoading ? "Exporting..." : "Export Date Range Collection"}
      </Button>
    </form>
  )
}

