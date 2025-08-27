
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchModeratorComments = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/moderator/comments?page=${page}`,
    fetcher
  )
  return {
    comments: data?.comments || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchModeratorCommentById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/moderator/comments/${id}` : null,
    fetcher
  )
  return {
    comment: data?.comment || null,
    error,
    mutate,
    isLoading,
  }
}