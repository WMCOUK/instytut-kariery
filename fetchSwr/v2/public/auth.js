
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAuthProviders = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/auth`,
    fetcher
  )
  return {
    providers: data?.providers || [],
    error,
    mutate,
    isLoading,
  }
}