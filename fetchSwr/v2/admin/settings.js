
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAdminSettings = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/settings`,
    fetcher
  )
  return {
    settings: data?.settings || null,
    error,
    mutate,
    isLoading,
  }
}