
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchUploadUrl = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/shared/uploads`,
    fetcher
  )
  return {
    uploadUrl: data?.uploadUrl || null,
    error,
    mutate,
    isLoading,
  }
}