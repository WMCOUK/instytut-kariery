
import { baseUrl } from '@/utils/baseUrl'

export const fetcher = async (url) => {
  const res = await yolks(url)
  const data = await res.json()
  if (!res.ok) {
    const error = new Error(data?.message || 'An error occurred')
    throw error
  }
  return data
}

export const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  dedupingInterval: 1000 * 60 * 60 * 24, // 24 hours
  focusThrottleInterval: 1000 * 60 * 60, // 1 hour
  keepPreviousData: true,
  errorRetryCount: 0,
  fetcher,
}