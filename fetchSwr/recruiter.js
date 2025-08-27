import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from './common'

// ------------------ QUERY RECRUITER (with filters) ------------------ //

export function fetchQueryRecruiter(currentPage, itemsPerPage, sortBy, sortOrder, search, jobIndustrySlug) {
	const queryParams = new URLSearchParams({
		page: currentPage.toString(),
		pageSize: itemsPerPage.toString(),
		sortBy,
		sortOrder,
		...(search && { search }),
		...(jobIndustrySlug && { jobIndustrySlug }),
	})

	const { data, error } = useSWR(`/api/v1/recruiter/all?${queryParams.toString()}`, fetcher)

	return {
		recruiters: data?.recruiters || [],
		totalPage: data?.totalPage || 0,
		isLoading: !data && !error,
		error,
	}
}

// ------------------ PAGINATED RECRUITER ------------------ //

export function fetchRecruiter(page) {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/recruiter?page=${page}`,
		fetcher,
	)

	return {
		recruiters: data?.recruiters || [],
		totalPage: data?.totalPage || 0,
		currentPage: data?.currentPage || page,
		totalRecruiter: data?.totalRecruiter || 0,
		error,
		mutate,
		isLoading,
	}
}

// ------------------ ALL RECRUITERS ------------------ //

export const fetchAllRecruiter = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/recruiter/all?page=${page}`,
		fetcher
	)

	return {
		recruiters: data?.recruiters || [],
		totalRecruiter: data?.totalRecruiter || 0,
		allRecruiters: data?.allRecruiters || [],
		allRecruiterCount: data?.allRecruiterCount || 0,
		error,
		mutate,
		isLoading,
	}
}
export const fetchCountRecruiter = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/recruiter/count?page=${page}`,
		fetcher
	)

	return {
		totalRecruiter: data?.totalRecruiter || [],
		error,
		mutate,
		isLoading,
	}
}
export const fetchMyRecruiter = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/recruiter/my`,
		fetcher
	)

	return {
		recruiters: data?.recruiters || [],
		// totalRecruiter: data?.totalRecruiter || 0,
		// allRecruiters: data?.allRecruiters || [],
		// allRecruiterCount: data?.allRecruiterCount || 0,
		error,
		mutate,
		isLoading,
	}
}

export const fetchRatingRecruiter = (slug) => {
	const { data, error, mutate, isLoading } = useSWR(
		slug ? `/api/v1/rating-recruiter?slug=${slug}` : null,
		fetcher
	)

	return {
		summary: data?.summary || [],
		averageRating: data?.averageRating || 0,
		totalCount: data?.totalCount || 0,
		reviews: data?.reviews || [],
		error,
		mutate,
		isLoading,
	}
}
