
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchCandidateAnalytics = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/analytics`,
    fetcher
  )
  return {
    analytics: data?.analytics || null,
    error,
    mutate,
    isLoading,
  }
}