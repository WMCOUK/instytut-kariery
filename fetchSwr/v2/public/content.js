
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchQueryPost = (page, catSlug) => {
  const params = new URLSearchParams({ page: page.toString() })
  if (catSlug) params.set('catSlug', catSlug)
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/content/posts?${params.toString()}`,
    fetcher
  )
  return {
    posts: data?.posts || [],
    totalPage: data?.totalPage || 0,
    totalPost: data?.count || 0,
    currentPage: data?.currentPage || page,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAllPost = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/content/posts/all`,
    fetcher
  )
  return {
    posts: data?.posts || [],
    totalPost: data?.count || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchLatestPost = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/content/posts/latest`,
    fetcher
  )
  return {
    posts: data?.posts || [],
    error,
    mutate,
    isLoading,
  }
}

export const fetchTrendingPost = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/content/posts/trending`,
    fetcher
  )
  return {
    posts: data?.posts || [],
    error,
    mutate,
    isLoading,
  }
}

export const fetchFeaturedPost = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/content/posts/featured`,
    fetcher
  )
  return {
    posts: data?.posts || [],
    error,
    mutate,
    isLoading,
  }
}

export const fetchPostBySlug = (slug) => {
  const { data, error, mutate, isLoading } = useSWR(
    slug ? `${baseUrl}/api/v1/public/content/posts/${slug}` : null,
    fetcher
  )
  return {
    post: data?.post || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchCategories = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/content/posts/category?page=${page}`,
    fetcher
  )
  return {
    categories: data?.categories || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchPostsByCategory = (catSlug, page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/content/posts/category/${catSlug}?page=${page}`,
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

export const fetchNewsletter = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/public/content/newsletter`,
    fetcher
  )
  return {
    newsletter: data?.newsletter || null,
    error,
    mutate,
    isLoading,
  }
}