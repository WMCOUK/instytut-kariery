
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchRecruiterOrganization = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/recruiter/organization`,
    fetcher
  )
  return {
    organization: data?.organization || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchOrganizationById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/recruiter/organization/${id}` : null,
    fetcher
  )
  return {
    organization: data?.organization || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchOrganizationMembers = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/recruiter/organization/members?page=${page}`,
    fetcher
  )
  return {
    members: data?.members || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchOrganizationMemberById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/recruiter/organization/members/${id}` : null,
    fetcher
  )
  return {
    member: data?.member || null,
    error,
    mutate,
    isLoading,
  }
}