
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchRecruiterApplicants = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/recruiter/applicants?page=${page}`,
    fetcher
  )
  return {
    applicants: data?.applicants || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchRecruiterApplicantById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/recruiter/applicants/${id}` : null,
    fetcher
  )
  return {
    applicant: data?.applicant || null,
    error,
    mutate,
    isLoading,
  }
}