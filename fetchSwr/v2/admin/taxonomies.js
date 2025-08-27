
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAdminTaxonomy = (name, page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/taxonomies/${name}?page=${page}`,
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

export const fetchAdminTaxonomyById = (name, id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/admin/taxonomies/${name}/${id}` : null,
    fetcher
  )
  return {
    item: data?.item || null,
    error,
    mutate,
    isLoading,
  }
}