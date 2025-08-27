
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export function fetchQueryJob(
  currentPage,
  itemsPerPage,
  sortBy,
  sortOrder,
  jobType,
  jobPosition,
  jobExperience,
  jobLocation,
  workMode,
  jobIndustrySlug,
  isFreelance,
  isFeatured,
  search,
  createdAtRange
) {
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    pageSize: itemsPerPage.toString(),
    sortBy,
    sortOrder,
    ...(jobType && { jobType }),
    ...(jobPosition && { jobPosition }),
    ...(jobExperience && { jobExperience }),
    ...(jobLocation && { jobLocation }),
    ...(workMode && { workMode }),
    ...(jobIndustrySlug && { jobIndustrySlug }),
    ...(isFreelance && { isFreelance: isFreelance.toString() }),
    ...(isFeatured && { isFeatured: isFeatured.toString() }),
    ...(search && { search }),
    ...(createdAtRange && { createdAtRange }),
  })

  const { data, error } = useSWR(
    `${baseUrl}/api/v1/public/listings?${queryParams.toString()}`,
    fetcher
  )
  return {
    jobs: data?.jobs || [],
    totalPage: data?.totalPage || 0,
    isLoading: !data && !error,
    error,
  }
}

export const fetchAllJob = (page = 1, search = '') => {
  const params = new URLSearchParams({ page: page.toString() })
  if (search) params.set('search', search)
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/listings/all?${params.toString()}`,
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

export const fetchLatestJob = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/listings/latest`,
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

export const fetchTrendingJob = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/listings/trending`,
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

export const fetchFeaturedJob = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/listings/featured`,
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

export const fetchRelatedJob = (slug) => {
  const { data, error, mutate, isLoading } = useSWR(
    slug ? `${baseUrl}/api/v1/public/listings/related/${slug}` : null,
    fetcher
  )
  return {
    relatedJobs: data?.relatedJobs || [],
    error,
    mutate,
    isLoading,
  }
}

export const fetchJobBySlug = (slug) => {
  const { data, error, mutate, isLoading } = useSWR(
    slug ? `${baseUrl}/api/v1/public/listings/${slug}` : null,
    fetcher
  )
  return {
    job: data?.job || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchTaxonomy = (name, page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/listings/taxonomies/${name}?page=${page}`,
    fetcher
  )
  return {
    items: data?.items || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchTopTaxonomy = (name) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/listings/taxonomies/${name}/top`,
    fetcher
  )
  return {
    items: data?.items || [],
    error,
    mutate,
    isLoading,
  }
}

export const fetchTaxonomyBySlug = (name, slug) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/listings/taxonomies/${name}/${slug}`,
    fetcher
  )
  return {
    item: data?.item || null,
    error,
    mutate,
    isLoading,
  }
}