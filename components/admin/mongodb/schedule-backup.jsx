"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { TimePicker } from "@/components/ui/time-picker"
import { Calendar, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { scheduleBackup } from "@/utils/mongodb"

export function ScheduleBackup({ isLoading, setIsLoading }) {
  const [backupTime, setBackupTime] = useState("23:59")

  const handleScheduleBackup = async (event) => {
    event.preventDefault()

    try {
      setIsLoading(true)
      toast.info("Scheduling backup for all collections...")

      const result = await scheduleBackup(backupTime)

      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(`Scheduling backup failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleScheduleBackup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="backupTime">Backup Time</Label>
        <TimePicker value={backupTime} onChange={(time) => setBackupTime(time)} />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calendar className="mr-2 h-4 w-4" />}
        {isLoading ? "Scheduling..." : "Schedule Daily Backup for All Collections"}
      </Button>
    </form>
  )
}

