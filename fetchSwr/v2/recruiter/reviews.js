
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchRecruiterReviews = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/recruiter/reviews?page=${page}`,
    fetcher
  )
  return {
    reviews: data?.reviews || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchRecruiterReviewById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/recruiter/reviews/${id}` : null,
    fetcher
  )
  return {
    review: data?.review || null,
    error,
    mutate,
    isLoading,
  }
}