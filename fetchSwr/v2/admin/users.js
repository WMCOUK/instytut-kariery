
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAllUser = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/users?page=${page}`,
    fetcher
  )
  return {
    users: data?.users || [],
    totalPage: data?.totalPage || 0,
    totalUser: data?.totalUser || 0,
    currentPage: data?.currentPage || page,
    error,
    mutate,
    isLoading,
  }
}

export const fetchUser = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/admin/users/${id}` : null,
    fetcher
  )
  return {
    user: data?.user || null,
    error,
    mutate,
    isLoading,
  }
}