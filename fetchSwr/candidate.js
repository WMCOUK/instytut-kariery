import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from './common'

// ------------------ CANDIDATE LIST & PAGINATION ------------------ //

export function fetchQueryCandidate(currentPage, itemsPerPage, sortBy, sortOrder, search) {
	const queryParams = new URLSearchParams({
		page: currentPage.toString(),
		pageSize: itemsPerPage.toString(),
		sortBy,
		sortOrder,
		...(search && { search }),
	})

	const { data, error } = useSWR(`/api/v1/candidate/all?${queryParams.toString()}`, fetcher)

	return {
		candidates: data?.candidates || [],
		totalPage: data?.totalPage || 0,
		isLoading: !data && !error,
		error,
	}
}

export const fetchAllCandidate = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/candidate?page=${page}`,
		fetcher
	)
	return {
		candidates: data?.candidates || [],
		totalCandidate: data?.totalCandidate || 0,
		error,
		mutate,
		isLoading,
	}
}

// ------------------ PAGINATED FIELDS ------------------ //

export const fetchCandidateExperience = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/candidate/experience?page=${page}`,
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

export const fetchCandidateEducation = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/candidate/education?page=${page}`,
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

export const fetchCandidateSkill = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/candidate/skill?page=${page}`,
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

export const fetchCandidateCv = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/candidate/cv?page=${page}`,
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

// ------------------ ALL FIELDS ------------------ //

export const fetchAllCandidateExperience = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/candidate/experience/all`,
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

export const fetchAllCandidateEducation = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/candidate/education/all`,
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

export const fetchAllCandidateSkill = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/candidate/skill/all`,
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

export const fetchAllCandidateCv = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/candidate/cv/all`,
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

// ------------------ APPLICATION CHECK ------------------ //

export function checkApplicationExists(jobSlug, candidateId) {
	const { data, error, mutate, isLoading } = useSWR(
		`/api/v1/applied-job/check?jobSlug=${jobSlug}&candidateId=${candidateId}`,
		fetcher
	)

	return {
		applicationExists: data?.exists ?? false,
		error,
		mutate,
		isLoading,
	}
}
