import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from './common'

// ------------------ PAGINATED FETCHES ------------------ //

export const fetchType = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/type?page=${page}`,
		fetcher
	)
	return {
		types: data?.types || [],
		totalPage: data?.totalPage || 0,
		error,
		mutate,
		isLoading,
	}
}

export const fetchJobExperience = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/experience?page=${page}`,
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

export const fetchDate = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/date?page=${page}`,
		fetcher
	)
	return {
		dates: data?.dates || [],
		totalPage: data?.totalPage || 0,
		error,
		mutate,
		isLoading,
	}
}

export const fetchIndustry = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/industry?page=${page}`,
		fetcher
	)
	return {
		industries: data?.industries || [],
		totalPage: data?.totalPage || 0,
		error,
		mutate,
		isLoading,
	}
}

export const fetchLocation = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`/api/v1/job/location?page=${page}`,
		fetcher,
	)
	return {
		locations: data?.locations || [],
		totalPage: data?.totalPage || 0,
		currentPage: data?.currentPage || page,
		error,
		mutate,
		isLoading,
	}
}

export const fetchWorkmode = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/workmode?page=${page}`,
		fetcher
	)
	return {
		workmodes: data?.workmodes || [],
		totalPage: data?.totalPage || 0,
		error,
		mutate,
		isLoading,
	}
}

export const fetchPosition = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/position?page=${page}`,
		fetcher
	)
	return {
		positions: data?.positions || [],
		totalPage: data?.totalPage || 0,
		error,
		mutate,
		isLoading,
	}
}

// ------------------ ALL FETCHES ------------------ //

export const fetchAllIndustry = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/industry/all`,
		fetcher
	)
	return {
		industries: data?.industries || [],
		totalIndustry: data?.totalIndustry || 0,
		error,
		mutate,
		isLoading,
	}
}

export const fetchAllType = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/type/all`,
		fetcher
	)
	return {
		types: data?.types || [],
		totalType: data?.totalType || 0,
		error,
		mutate,
		isLoading,
	}
}

export const fetchAllExperience = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/experience/all`,
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

export const fetchAllLocation = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/location/all`,
		fetcher
	)
	return {
		locations: data?.locations || [],
		totalLocation: data?.totalLocation || 0,
		error,
		mutate,
		isLoading,
	}
}

export const fetchAllPosition = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/position/all`,
		fetcher
	)
	return {
		positions: data?.positions || [],
		totalPosition: data?.totalPosition || 0,
		error,
		mutate,
		isLoading,
	}
}

export const fetchAllBenefit = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/benefit/all`,
		fetcher
	)
	return {
		benefits: data?.benefits || [],
		totalBenefit: data?.totalBenefit || 0,
		error,
		mutate,
		isLoading,
	}
}
