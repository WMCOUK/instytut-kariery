
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchCandidateProfile = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/profile`,
    fetcher
  )
  return {
    profile: data?.profile || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchCandidatePersonal = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/profile/personal`,
    fetcher
  )
  return {
    personal: data?.personal || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchCandidateSocialLinks = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/profile/social-links`,
    fetcher
  )
  return {
    socialLinks: data?.socialLinks || [],
    error,
    mutate,
    isLoading,
  }
}