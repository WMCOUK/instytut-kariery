import prisma from '@/utils/prismadb'
import { NextResponse } from 'next/server'

export async function GET(request) {
	const { searchParams } = new URL(request.url)

	// Input validation
	const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
	const pageSize = Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10))
	const sortBy = searchParams.get('sortBy') || 'createdAt'
	const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc'

	// Filters
	const filters = {
		jobType: searchParams.get('jobType')?.split(',').filter(Boolean) || [],
		jobPosition: searchParams.get('jobPosition') || '',
		jobExperience: searchParams.get('jobExperience') || '',
		jobIndustrySlug: searchParams.get('jobIndustrySlug') || '',
		isFreelance: searchParams.get('isFreelance') === 'true' || undefined,
		isFeatured: searchParams.get('isFeatured') === 'true' || undefined,
		search: searchParams.get('search') || '',
		createdAtRange: searchParams.get('createdAtRange')?.split(',').filter(Boolean) || [],
		jobLocation: searchParams.get('jobLocation') || '',
		workMode: searchParams.get('workMode')?.split(',').filter(Boolean) || [],
		latitude: searchParams.get('latitude') || '',
		longitude: searchParams.get('longitude') || '',
		minDistance: searchParams.get('minDistance') || '',
		maxDistance: searchParams.get('maxDistance') || '',
	}

	// Validate distance parameters
	const refLat = filters.latitude ? parseFloat(filters.latitude) : null
	const refLon = filters.longitude ? parseFloat(filters.longitude) : null
	const minDistance = filters.minDistance ? parseFloat(filters.minDistance.replace(' KM', '')) || 0 : 0
	const maxDistance = filters.maxDistance ? parseFloat(filters.maxDistance.replace(' KM', '')) || Infinity : Infinity

	// Handle counts for Posted Within
	if (searchParams.get('getCounts') === 'true') {
		const dateRanges = {
			'1-day': new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
			'7-days': new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
			'30-days': new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
			'60-days': new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
			'120-days': new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
			'180-days': new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
		}

		try {
			const counts = {}
			for (const [key, date] of Object.entries(dateRanges)) {
				const whereClause = {
					...(filters.jobIndustrySlug && { jobIndustrySlug: filters.jobIndustrySlug }),
					...(filters.jobType.length && { jobTypeSlug: { in: filters.jobType } }),
					...(filters.jobExperience && { jobExperienceSlug: filters.jobExperience }),
					...(filters.isFreelance !== undefined && { isFreelance: filters.isFreelance }),
					...(filters.isFeatured !== undefined && { isFeatured: filters.isFeatured }),
					...(filters.search && {
						OR: [
							{ title: { contains: filters.search, mode: 'insensitive' } },
							{ description: { contains: filters.search, mode: 'insensitive' } },
							{ content: { contains: filters.search, mode: 'insensitive' } },
							{ skills: { hasSome: filters.search.split(' ') } },
						],
					}),
					...(filters.jobLocation && { jobLocationSlug: filters.jobLocation }),
					...(filters.workMode.length && { jobWorkModeSlug: { in: filters.workMode } }),
					...(filters.jobPosition && { jobPositionSlug: filters.jobPosition }),
					createdAt: { gte: date },
					latitude: { not: null },
					longitude: { not: null },
				}

				counts[key] = await prisma.job.count({ where: whereClause })
			}

			console.log('Returning counts:', counts) // Debug: Log counts response
			return NextResponse.json({ counts }, { status: 200 })
		} catch (error) {
			console.error('Error fetching counts:', error)
			return NextResponse.json(
				{ message: 'Error fetching counts', error: error.message },
				{ status: 500 }
			)
		}
	}

	// Pagination
	const take = pageSize
	const skip = pageSize * (page - 1)

	// Validate sortBy field
	const allowedSortBy = ['createdAt', 'title', 'minSalary', 'maxSalary']
	const sortKey = allowedSortBy.includes(sortBy) ? sortBy : 'createdAt'

	// Build common where clause
	const whereClause = {
		...(filters.jobIndustrySlug && { jobIndustrySlug: filters.jobIndustrySlug }),
		...(filters.jobType.length && { jobTypeSlug: { in: filters.jobType } }),
		...(filters.jobExperience && { jobExperienceSlug: filters.jobExperience }),
		...(filters.isFreelance !== undefined && { isFreelance: filters.isFreelance }),
		...(filters.isFeatured !== undefined && { isFeatured: filters.isFeatured }),
		...(filters.search && {
			OR: [
				{ title: { contains: filters.search, mode: 'insensitive' } },
				{ description: { contains: filters.search, mode: 'insensitive' } },
				{ content: { contains: filters.search, mode: 'insensitive' } },
				{ skills: { hasSome: filters.search.split(' ') } },
			],
		}),
		...(filters.jobLocation && { jobLocationSlug: filters.jobLocation }),
		...(filters.workMode.length && { jobWorkModeSlug: { in: filters.workMode } }),
		...(filters.jobPosition && { jobPositionSlug: filters.jobPosition }),
		latitude: { not: null },
		longitude: { not: null },
	}

	// Build query object
	const query = {
		skip,
		take,
		where: {
			...whereClause,
			...(filters.createdAtRange.length && {
				OR: filters.createdAtRange.map((range) => ({
					createdAt: {
						gte: new Date(Date.now() - parseInt(range.replace('-days', '')) * 24 * 60 * 60 * 1000),
					},
				})),
			}),
		},
		orderBy: [
			{ isSponsored: 'desc' },
			{ [sortKey]: sortOrder },
		],
		include: {
			recruiter: true,
			jobType: true,
			jobExperience: true,
			jobIndustry: true,
			jobLocation: true,
			jobPosition: true,
			jobWorkMode: true,
		},
	}

	try {
		let jobs = await prisma.job.findMany(query)
		let totalJobs = await prisma.job.count({ where: query.where })

		// Apply distance filter
		if (refLat && refLon && (minDistance || maxDistance)) {
			if (isNaN(refLat) || isNaN(refLon) || (minDistance && isNaN(minDistance)) || (maxDistance && isNaN(maxDistance))) {
				console.error('Invalid distance parameters:', { refLat, refLon, minDistance, maxDistance })
				return NextResponse.json(
					{ message: 'Invalid latitude, longitude, or distance parameters' },
					{ status: 400 }
				)
			}

			const toRad = (value) => (value * Math.PI) / 180
			jobs = jobs.filter((job) => {
				const lat1 = parseFloat(job.latitude)
				const lon1 = parseFloat(job.longitude)
				const lat2 = refLat
				const lon2 = refLon

				if (isNaN(lat1) || isNaN(lon1)) {
					return false // Skip jobs with invalid coordinates
				}

				const R = 6371 // Earth's radius in kilometers
				const dLat = toRad(lat2 - lat1)
				const dLon = toRad(lon2 - lon1)
				const a =
					Math.sin(dLat / 2) * Math.sin(dLat / 2) +
					Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
				const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
				const distance = R * c

				return distance >= minDistance && distance <= maxDistance
			})

			totalJobs = jobs.length
		}

		console.log('Returning jobs:', { totalJobs, jobs: jobs.length }) // Debug: Log response
		return NextResponse.json(
			{
				jobs,
				totalPage: Math.ceil(totalJobs / take),
			},
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 's-maxage=3600, stale-while-revalidate',
				},
			}
		)
	} catch (error) {
		console.error('Error fetching jobs:', error)
		return NextResponse.json(
			{ message: 'Error fetching jobs', error: error.message },
			{ status: 500 }
		)
	}
}