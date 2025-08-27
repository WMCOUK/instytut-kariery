
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchCandidateRecommendations = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/recommendations`,
    fetcher
  )
  return {
    recommendations: data?.recommendations || [],
    error,
    mutate,
    isLoading,
  }
}