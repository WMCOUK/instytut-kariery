
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchRecruiterAnalytics = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/recruiter/analytics`,
    fetcher
  )
  return {
    analytics: data?.analytics || null,
    error,
    mutate,
    isLoading,
  }
}