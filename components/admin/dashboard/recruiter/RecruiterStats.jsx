"use client"

import { fetchMyJob } from "@/fetchSwr"
import { Bell, Bookmark, Briefcase } from "lucide-react"
import { useTranslations } from "next-intl"

export default function RecruiterStats() {
	const t = useTranslations('dashboard.stats')
	const { totalJob } = fetchMyJob(1)

	const openJobsCount = totalJob ?? 0
	// TODO: wire saved jobs SWR hook when implemented
	const savedCount = 0
	// TODO: wire applications count via /api/v2/recruiter/applicants when SWR hook is added
	const applicationsCount = 0

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
			<div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-6">
				<div className="flex justify-between items-start">
					<div>
						<div className="text-3xl font-semibold text-blue-900 dark:text-blue-100 mb-2">{openJobsCount}</div>
						<div className="text-blue-600 dark:text-blue-400 text-sm">{t('openJobs')}</div>
					</div>
					<Briefcase className="text-blue-500 dark:text-blue-400 w-6 h-6" />
				</div>
			</div>

			<div className="rounded-lg bg-amber-50 dark:bg-amber-950 p-6">
				<div className="flex justify-between items-start">
					<div>
						<div className="text-3xl font-semibold text-amber-900 dark:text-amber-100 mb-2">{savedCount}</div>
						<div className="text-amber-600 dark:text-amber-400 text-sm">{t('savedJobs')}</div>
					</div>
					<Bookmark className="text-amber-500 dark:text-amber-400 w-6 h-6" />
				</div>
			</div>

			<div className="rounded-lg bg-green-50 dark:bg-green-950 p-6">
				<div className="flex justify-between items-start">
					<div>
						<div className="text-3xl font-semibold text-green-900 dark:text-green-100 mb-2">{applicationsCount}</div>
						<div className="text-green-600 dark:text-green-400 text-sm">{t('applications')}</div>
					</div>
					<Bell className="text-green-500 dark:text-green-400 w-6 h-6" />
				</div>
			</div>
		</div>
	)
}
