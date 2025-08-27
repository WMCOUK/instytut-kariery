import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAllOrganizations = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/organizations?page=${page}`,
    fetcher
  )
  return {
    organizations: data?.organizations || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchOrganizationById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/admin/organizations/${id}` : null,
    fetcher
  )
  return {
    organization: data?.organization || null,
    error,
    mutate,
    isLoading,
  }
}