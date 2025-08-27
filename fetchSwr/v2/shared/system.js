
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchSystemHealth = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/_system/health`,
    fetcher
  )
  return {
    health: data?.health || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchSystemConfig = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/_system/config`,
    fetcher
  )
  return {
    config: data?.config || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchSystemStatus = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/shared/system/status`,
    fetcher
  )
  return {
    status: data?.status || null,
    error,
    mutate,
    isLoading,
  }
}