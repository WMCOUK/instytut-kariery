import useSWR from 'swr'
import { fetcher } from './common'

// ------------------ DASHBOARD STATS (consolidated) ------------------ //
// Single endpoint returning { jobs, recruiters, locations, users } counts.
// Replaces 4 separate SWR calls (fetchAllJobCount, fetchCountRecruiter/
// fetchAllRecruiter, fetchAllLocation, fetchAllUser).

export function fetchDashboardStats() {
	const { data, error, isLoading } = useSWR('/api/v1/dashboard/stats', fetcher)

	return {
		jobs: data?.jobs ?? 0,
		recruiters: data?.recruiters ?? 0,
		locations: data?.locations ?? 0,
		users: data?.users ?? 0,
		isLoading,
		error,
	}
}
