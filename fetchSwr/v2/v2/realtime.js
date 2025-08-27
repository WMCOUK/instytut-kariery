
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchRealtimeNotifications = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v2/realtime/notifications`,
    fetcher
  )
  return {
    notifications: data?.notifications || [],
    error,
    mutate,
    isLoading,
  }
}

export const fetchRealtimeMessages = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v2/realtime/messages`,
    fetcher
  )
  return {
    messages: data?.messages || [],
    error,
    mutate,
    isLoading,
  }
}

export const fetchRealtimeJobUpdates = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v2/realtime/job-updates`,
    fetcher
  )
  return {
    jobUpdates: data?.jobUpdates || [],
    error,
    mutate,
    isLoading,
  }
}