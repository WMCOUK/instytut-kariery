
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchWebhookEvents = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/webhooks`,
    fetcher
  )
  return {
    events: data?.events || [],
    error,
    mutate,
    isLoading,
  }
}