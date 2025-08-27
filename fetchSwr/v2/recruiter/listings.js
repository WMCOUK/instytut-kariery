
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchRecruiterJobs = (page, search = '') => {
  const params = new URLSearchParams({ page: page.toString() })
  if (search) params.set('search', search)
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/recruiter/listings?${params.toString()}`,
    fetcher
  )
  return {
    jobs: data?.jobs || [],
    totalPage: data?.totalPage || 0,
    totalJob: data?.totalJob || 0,
    currentPage: data?.currentPage || page,
    error,
    mutate,
    isLoading,
  }
}

export const fetchRecruiterJobById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/recruiter/listings/${id}` : null,
    fetcher
  )
  return {
    job: data?.job || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchRecruiterJobPipeline = (status, page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/recruiter/listings/pipeline/${status}?page=${page}`,
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