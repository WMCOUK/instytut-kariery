
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAllAdminJobs = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/listings?page=${page}`,
    fetcher
  )
  return {
    jobs: data?.jobs || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminJobById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/admin/listings/${id}` : null,
    fetcher
  )
  return {
    job: data?.job || null,
    error,
    mutate,
    isLoading,
  }
}