
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchModeratorAnalytics = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/moderator/analytics`,
    fetcher
  )
  return {
    analytics: data?.analytics || null,
    error,
    mutate,
    isLoading,
  }
}