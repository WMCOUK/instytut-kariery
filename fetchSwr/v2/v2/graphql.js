import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchGraphQL = (query, variables) => {
  const { data, error, mutate, isLoading } = useSWR(
    [`${baseUrl}/api/v2/graphql`, query, variables],
    () => fetcher(`${baseUrl}/api/v2/graphql`, { method: 'POST', body: JSON.stringify({ query, variables }) })
  )
  return {
    data: data?.data || null,
    error,
    mutate,
    isLoading,
  }
}