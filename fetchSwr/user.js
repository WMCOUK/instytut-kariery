import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from './common'

// ------------------ PAGINATED USERS ------------------ //

export function fetchAllUser(page) {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/user?page=${page}`,
		fetcher,
	)

	return {
		users: data?.users || [],
		totalPage: data?.totalPage || 0,
		totalUser: data?.totalUser || 0,
		currentPage: data?.currentPage || page,
		error,
		mutate,
		isLoading,
	}
}

// ------------------ SINGLE USER BY ID ------------------ //

export const fetchUser = (id) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/user/${id}`,
		fetcher
	)

	// return { data, error, mutate, isLoading }
	return {
		user: data?.user || [],
		// totalPage: data?.totalPage || 0,
		// totalUser: data?.totalUser || 0,
		// currentPage: data?.currentPage || page,
		error,
		mutate,
		isLoading,
	}
}
export const fetchHeaderAuthUser = (id) => {
	const { data, error, mutate, isLoading } = useSWR(
		id ? `${baseUrl}/api/v1/user/header-auth/${id}` : null,
		fetcher
	)

	return {
		user: data?.user || null,
		error,
		mutate,
		isLoading,
	}
}
