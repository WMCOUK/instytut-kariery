
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchCandidateCv = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/assets/cv?page=${page}`,
    fetcher
  )
  return {
    cvs: data?.cvs || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAllCandidateCv = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/assets/cv`,
    fetcher
  )
  return {
    cvs: data?.cvs || [],
    totalCv: data?.totalCv || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchCandidateEducation = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/assets/education?page=${page}`,
    fetcher
  )
  return {
    educations: data?.educations || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAllCandidateEducation = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/assets/education`,
    fetcher
  )
  return {
    educations: data?.educations || [],
    totalEducation: data?.totalEducation || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchCandidateExperience = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/assets/experience?page=${page}`,
    fetcher
  )
  return {
    experiences: data?.experiences || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAllCandidateExperience = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/assets/experience`,
    fetcher
  )
  return {
    experiences: data?.experiences || [],
    totalExperience: data?.totalExperience || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchCandidateSkill = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/assets/skill?page=${page}`,
    fetcher
  )
  return {
    skills: data?.skills || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAllCandidateSkill = () => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/candidate/assets/skill`,
    fetcher
  )
  return {
    skills: data?.skills || [],
    totalSkill: data?.totalSkill || 0,
    error,
    mutate,
    isLoading,
  }
}