import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from './common'

// ------------------ POSTS BY PAGE & CATEGORY ------------------ //

export const fetchQueryPost = (page, cat) => {
	const { data, isLoading, error, mutate } = useSWR(
		`${baseUrl}/api/v1/post?page=${page}&cat=${cat || ''}`,
		fetcher,
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

// ------------------ ALL POSTS ------------------ //

export const fetchAllPost = () => {
	const { data, error, mutate, isLoading } = useSWR(`${baseUrl}/api/v1/post`, fetcher)
	return {
		posts: data?.posts || [],
		totalPost: data?.count || 0,
		error,
		mutate,
		isLoading,
	}
}

// ------------------ LATEST POSTS ------------------ //

export const fetchLatestPost = () => {
	const { data, error, mutate, isLoading } = useSWR('/api/v1/post/latest', fetcher)
	return {
		posts: data?.posts || [],
		error,
		mutate,
		isLoading,
	}
}

// ------------------ PAGINATED QUERY (BLOG) ------------------ //

export function fetchQueryBlog(currentPage, itemsPerPage, sortBy, sortOrder, search, catSlug) {
	const queryParams = new URLSearchParams({
		page: currentPage.toString(),
		pageSize: itemsPerPage.toString(),
		sortBy,
		sortOrder,
		...(search && { search }),
		...(catSlug && { catSlug }),
	})

	const { data, error } = useSWR(`/api/v1/post/all?${queryParams.toString()}`, fetcher)

	return {
		posts: data?.posts || [],
		totalPage: data?.totalPage || 0,
		isLoading: !data && !error,
		error,
	}
}

// ------------------ CATEGORIES ------------------ //

export const fetchCategory = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/post/category?page=${page}`,
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
