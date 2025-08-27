
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAdminDashboard = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/dashboard`,
    fetcher
  )
  return {
    dashboard: data?.dashboard || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminKPIs = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/dashboard/kpis`,
    fetcher
  )
  return {
    kpis: data?.kpis || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminTimeseries = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/dashboard/timeseries`,
    fetcher
  )
  return {
    timeseries: data?.timeseries || null,
    error,
    mutate,
    isLoading,
  }
}