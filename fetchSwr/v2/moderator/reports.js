
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchModeratorReports = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/moderator/reports?page=${page}`,
    fetcher
  )
  return {
    reports: data?.reports || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchModeratorReportById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/moderator/reports/${id}` : null,
    fetcher
  )
  return {
    report: data?.report || null,
    error,
    mutate,
    isLoading,
  }
}