
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchCandidatePreferences = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/preferences`,
    fetcher
  )
  return {
    preferences: data?.preferences || null,
    error,
    mutate,
    isLoading,
  }
}