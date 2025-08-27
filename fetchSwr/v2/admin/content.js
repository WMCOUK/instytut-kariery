
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAdminPosts = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/content/posts?page=${page}`,
    fetcher
  )
  return {
    posts: data?.posts || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminPostById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/admin/content/posts/${id}` : null,
    fetcher
  )
  return {
    post: data?.post || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminNewsletters = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/content/newsletter?page=${page}`,
    fetcher
  )
  return {
    newsletters: data?.newsletters || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminNewsletterById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/admin/content/newsletter/${id}` : null,
    fetcher
  )
  return {
    newsletter: data?.newsletter || null,
    error,
    mutate,
    isLoading,
  }
}