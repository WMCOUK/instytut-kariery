
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAIMatching = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/shared/ai/matching`,
    fetcher
  )
  return {
    matches: data?.matches || [],
    error,
    mutate,
    isLoading,
  }
}

export const fetchAIResumeParsing = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/shared/ai/parsing`,
    fetcher
  )
  return {
    parsedData: data?.parsedData || null,
    error,
    mutate,
    isLoading,
  }
}