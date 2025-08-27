
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchQueryCandidate = (
  currentPage,
  itemsPerPage,
  sortBy,
  sortOrder,
  search
) => {
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    pageSize: itemsPerPage.toString(),
    sortBy,
    sortOrder,
    ...(search && { search }),
  })

  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate?${queryParams.toString()}`,
    fetcher
  )
  return {
    candidates: data?.candidates || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAllCandidate = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate?page=${page}`,
    fetcher
  )
  return {
    candidates: data?.candidates || [],
    totalCandidate: data?.totalCandidate || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAppliedJob = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/applications`,
    fetcher
  )
  return {
    applications: data?.applications || [],
    error,
    mutate,
    isLoading,
  }
}

export const checkApplicationExists = (jobSlug, candidateId) => {
  const { data, error, mutate, isLoading } = useSWR(
    jobSlug && candidateId
      ? `${baseUrl}/api/v1/candidate/applications/check?jobSlug=${jobSlug}&candidateId=${candidateId}`
      : null,
    fetcher
  )
  return {
    applicationExists: data?.exists ?? false,
    error,
    mutate,
    isLoading,
  }
}

export const fetchFavouriteJob = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/favorites?page=${page}`,
    fetcher
  )
  return {
    favouriteJobs: data?.favouriteJobs || [],
    totalPage: data?.totalPage || 0,
    totalFavouriteJob: data?.totalFavouriteJob || 0,
    error,
    mutate,
    isLoading,
  }
}