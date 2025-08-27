
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchRecruiterNotifications = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/recruiter/notifications?page=${page}`,
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

export const fetchRecruiterNotificationById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/recruiter/notifications/${id}` : null,
    fetcher
  )
  return {
    notification: data?.notification || null,
    error,
    mutate,
    isLoading,
  }
}