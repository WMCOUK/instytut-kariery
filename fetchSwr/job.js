import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from './common'

// ------------------ QUERY WITH FILTERS & PAGINATION ------------------ //

export function fetchQueryJob(
	currentPage,
	itemsPerPage,
	sortBy,
	sortOrder,
	jobType,
	jobPosition,
	jobExperience,
	jobLocation,
	workMode,
	jobIndustrySlug,
	isFreelance,
	isFeatured,
	search,
	createdAtRange,
	latitude,
	longitude,
	minDistance,
	maxDistance
) {
	const queryParams = new URLSearchParams({
		page: currentPage.toString(),
		pageSize: itemsPerPage.toString(),
		sortBy,
		sortOrder,
		...(jobType && { jobType }),
		...(jobPosition && { jobPosition }),
		...(jobExperience && { jobExperience }),
		...(jobLocation && { jobLocation }),
		...(workMode && { workMode }),
		...(jobIndustrySlug && { jobIndustrySlug }),
		...(isFreelance && { isFreelance: isFreelance.toString() }),
		...(isFeatured && { isFeatured: isFeatured.toString() }),
		...(search && { search }),
		...(createdAtRange && { createdAtRange }),
		...(latitude && { latitude }),
		...(longitude && { longitude }),
		...(minDistance && { minDistance }),
		...(maxDistance && { maxDistance }),
	})

	const { data, error } = useSWR(`/api/v1/job?${queryParams.toString()}`, fetcher)

	return {
		jobs: data?.jobs || [],
		totalPage: data?.totalPage || 0,
		isLoading: !data && !error,
		error,
	}
}



export function fetchQueryJob2(
  currentPage,
  itemsPerPage,
  sortBy,
  sortOrder,
  jobType,
  jobPosition,
  jobExperience,
  jobLocation,
  workMode,
  jobIndustrySlug,
  isFreelance,
  isFeatured,
  search,
  createdAtRange,
  latitude,
  longitude,
  minDistance,
  maxDistance
) {
  const jobTypeArray = Array.isArray(jobType) ? jobType : (jobType || '').split(',').filter(Boolean)
  const workModeArray = Array.isArray(workMode) ? workMode : (workMode || '').split(',').filter(Boolean)
  const createdAtRangeArray = Array.isArray(createdAtRange)
    ? createdAtRange
    : (createdAtRange || '').split(',').filter(Boolean)

  // ✅ Ensure min/max distance are clean numbers
  const cleanMinDistance =
    typeof minDistance === 'string'
      ? parseInt(minDistance.replace(' KM', ''), 10)
      : typeof minDistance === 'number'
      ? minDistance
      : null

  const cleanMaxDistance =
    typeof maxDistance === 'string'
      ? parseInt(maxDistance.replace(' KM', ''), 10)
      : typeof maxDistance === 'number'
      ? maxDistance
      : null

  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    pageSize: itemsPerPage.toString(),
    sortBy,
    sortOrder,
    ...(jobTypeArray.length && { jobType: jobTypeArray.join(',') }),
    ...(jobPosition && { jobPosition }),
    ...(jobExperience && { jobExperience }),
    ...(jobLocation && { jobLocation }),
    ...(workModeArray.length && { workMode: workModeArray.join(',') }),
    ...(jobIndustrySlug && { jobIndustrySlug }),
    ...(isFreelance !== undefined && { isFreelance: isFreelance.toString() }),
    ...(isFeatured !== undefined && { isFeatured: isFeatured.toString() }),
    ...(search && { search }),
    ...(createdAtRangeArray.length && { createdAtRange: createdAtRangeArray.join(',') }),
    ...(latitude && { latitude: latitude.toString() }),
    ...(longitude && { longitude: longitude.toString() }),
    ...(cleanMinDistance !== null && { minDistance: cleanMinDistance.toString() }),
    ...(cleanMaxDistance !== null && { maxDistance: cleanMaxDistance.toString() }),
  })

  const { data, error } = useSWR(`/api/v1/job/filter?${queryParams.toString()}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 2000,
  })

  console.log('SWR Data:', data, 'Error:', error)

  return {
    jobs: data?.jobs || [],
    totalPage: data?.totalPage || 0,
    isLoading: !data && !error,
    error,
  }
}


// ------------------ FETCH ALL JOBS ------------------ //

export function fetchAllJob(page = 1, search = "", status, moderation) {
	const params = new URLSearchParams()
	params.set("page", page)
	if (search) params.set("search", search)
	if (status) params.set("status", status)
	if (moderation) params.set("moderation", moderation)

	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job?${params.toString()}`,
		fetcher,
		{
			fallbackData,           // <- use server-side data first
			revalidateOnMount: false, // <- prevent re-fetch on mount
		}
	)

	return {
		jobs: data?.jobs || [],
		totalPage: data?.totalPage || 0,
		totalJob: data?.totalJob || 0,
		currentPage: page,
		error,
		mutate,
		isLoading,
	}
}
export function fetchMyJob(page = 1, search = "") {
	const params = new URLSearchParams()
	params.set("page", page)
	if (search) params.set("search", search)

	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/my-job?${params.toString()}`,
		fetcher
	)

	return {
		jobs: data?.jobs || [],
		totalPage: data?.totalPage || 0,
		totalJob: data?.totalJob || 0,
		currentPage: page,
		error,
		mutate,
		isLoading,
	}
}

export const fetchAllJobCount = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/count?page=${page}`,
		fetcher
	)
	return {
		allJobCount: data?.allJobCount,
		error,
		mutate,
		isLoading,
	}
}

// ------------------ STATUS & MODERATION ------------------ //

export const fetchStatusJob = (status, page = 1, search = "") => {
	const url = `${baseUrl}/api/v1/job/${status}?page=${page}&search=${encodeURIComponent(search)}`
	const { data, error, mutate, isLoading } = useSWR(url, fetcher)

	return {
		jobs: data?.jobs || [],
		totalPage: data?.totalPage || 0,
		totalJob: data?.totalJob || 0,
		currentPage: data?.currentPage || page,
		error,
		mutate,
		isLoading,
	}
}

export const fetchModerationJob = (moderation, page = 1, search = "") => {
	const url = `${baseUrl}/api/v1/job/${moderation}?page=${page}&search=${encodeURIComponent(search)}`
	const { data, error, mutate, isLoading } = useSWR(url, fetcher)

	return {
		jobs: data?.jobs || [],
		totalPage: data?.totalPage || 0,
		totalJob: data?.totalJob || 0,
		currentPage: data?.currentPage || page,
		error,
		mutate,
		isLoading,
	}
}

// ------------------ FEATURED & LATEST JOBS ------------------ //

export const fetchFeaturedJob = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/featured`,
		fetcher
	)
	return {
		jobs: data?.jobs || [],
		totalPage: data?.totalPage || 0,
		error,
		mutate,
		isLoading,
	}
}
export const fetchLatestJob = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/job/latest`,
		fetcher
	)
	return {
		jobs: data?.jobs || [],
		totalPage: data?.totalPage || 0,
		error,
		mutate,
		isLoading,
	}
}

// Alias: fetchLatestJob is same as fetchFeaturedJob
// export const fetchLatestJob = fetchFeaturedJob

// ------------------ FAVORITE & RATING JOBS ------------------ //

export const fetchFavouriteJob = (page) => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/favourite-job?page=${page}`,
		fetcher
	)
	return {
		favouriteJobs: data?.favouriteJobs || [],
		totalPage: data?.totalPage || 0,
		totalFavouriteJob: data?.totalFavouriteJob || 0,
		error,
		mutate,
		isLoading,
	}
}
export const fetchAppliedJob = () => {
	const { data, error, mutate, isLoading } = useSWR(
		`${baseUrl}/api/v1/applied-job`,
		fetcher
	)
	return {
		applications: data?.applications || [],
		// totalPage: data?.totalPage || 0,
		// totalFavouriteJob: data?.totalFavouriteJob || 0,
		error,
		mutate,
		isLoading,
	}
}


export default function fetchRelatedJob(slug) {
	const { data, error, isLoading } = useSWR(`/api/v1/related-job?slug=${slug}`, fetcher)

	return {
		relatedJobs: data?.relatedJobs || [],
		isLoading,
		isError: !!error,
	}
}
export const fetchTrendingJob = () => {
	const { data, error, isLoading } = useSWR(`/api/v1/job/trending`, fetcher)

	return {
		trendingJobs: data || [],
		isLoading,
		isError: !!error,
	}
}