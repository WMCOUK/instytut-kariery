"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

import { ExportAllTables } from "./export-all-collections"
import { ExportSingleCollection } from "./export-single-collection"
import { ExportByDate } from "./export-by-date"
import { ExportByDateRange } from "./export-by-date-range"
import { ImportTable } from "./import-collection"
import { ScheduleBackup } from "./schedule-backup"
import { ImportAllCollections } from "./import-all-collections"

export function MongoDBBackup() {
	const [isLoading, setIsLoading] = useState(false)
	const { data: session, status } = useSession()

	if (status === "loading") {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		)
	}

	if (status === "unauthenticated" || (session && session.user.isRole !== "ADMIN")) {
		return (
			<Alert variant="destructive">
				<AlertDescription>Access denied. Admin privileges required.</AlertDescription>
			</Alert>
		)
	}

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>MongoDB Backup</CardTitle>
				<CardDescription>Export, import, or schedule backups for MongoDB collections</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<ExportAllTables isLoading={isLoading} setIsLoading={setIsLoading} />
				<ExportSingleCollection isLoading={isLoading} setIsLoading={setIsLoading} />
				<ExportByDate isLoading={isLoading} setIsLoading={setIsLoading} />
				<ExportByDateRange isLoading={isLoading} setIsLoading={setIsLoading} />
				<ImportTable isLoading={isLoading} setIsLoading={setIsLoading} />
				<ScheduleBackup isLoading={isLoading} setIsLoading={setIsLoading} />
				<ImportAllCollections isLoading={isLoading} setIsLoading={setIsLoading} />
			</CardContent>
		</Card>
	)
}

