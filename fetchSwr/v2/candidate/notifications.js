
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchCandidateNotifications = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/notifications?page=${page}`,
    fetcher
  )
  return {
    notifications: data?.notifications || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchCandidateNotificationById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/candidate/notifications/${id}` : null,
    fetcher
  )
  return {
    notification: data?.notification || null,
    error,
    mutate,
    isLoading,
  }
}