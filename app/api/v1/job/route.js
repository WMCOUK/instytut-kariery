
import currentUserServer from '@/utils/currentUserServer'
import prisma from '@/utils/prismadb'

export async function POST(request) {
	const user = await currentUserServer()
	// const { subPriceId } = user || {}

	const body = await request.json()
	console.log(body)



	// const subscriptionPlan = subscription.find((plan) => plan.subPriceId === subPriceId)

	// if (!subscriptionPlan) {
	// 	return new Response(
	// 		JSON.stringify({
	// 			error: "Invalid subscription plan. Please ensure you have an active plan.",
	// 			redirect: "/subscription", // Include the redirect path
	// 			toast: true,
	// 		}),
	// 		{ status: 400 }
	// 	)
	// }



	// const planType = subscriptionPlan.planType

	// const currentJobs = await prisma.job.count({
	// 	where: { userId: user?.id },
	// })

	// if (currentJobs >= maxJobs[planType]) {
	// 	return new Response(
	// 		JSON.stringify({
	// 			error: `You can only create up to ${maxJobs[planType]} job accounts with the ${planType} plan.`,
	// 			redirect: "/subscription", // Include the redirect path
	// 			toast: true,
	// 		}),
	// 		{ status: 403 }
	// 	)
	// }

	try {
		const job = await prisma.job.create({
			data: {
				...body,
				userId: user?.id
			},
		})

		return Response.json({
			message: "Job created successfully!",
			job,
		})
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: "An error occurred while creating the job. Please try again.",
				toast: true,
			}),
			{ status: 500 }
		)
	}
}



export const GET = async (request) => {
  const { searchParams } = new URL(request.url)

  // Pagination and sorting
  const page = parseInt(searchParams.get("page") || "1", 10)
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10)
  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc"

  // Filters
  const filters = {
    jobType: searchParams.get("jobType"),
    jobPosition: searchParams.get("jobPosition"),
    jobExperience: searchParams.get("jobExperience"),
    jobIndustrySlug: searchParams.get("jobIndustrySlug"),
    isFreelance: searchParams.get("isFreelance") === "true" || undefined,
    isFeatured: searchParams.get("isFeatured") === "true" || undefined,
    search: searchParams.get("search") || "",
    createdAtRange: searchParams.get("createdAtRange"),
    jobLocation: searchParams.get("jobLocation"),
    workMode: searchParams.get("workMode"),
    latitude: searchParams.get("latitude"),
    longitude: searchParams.get("longitude"),
    minDistance: searchParams.get("minDistance"),
    maxDistance: searchParams.get("maxDistance"),
  }

  // Calculate date range
  const dateRanges = {
    "1 day": new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    "7 days": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    "30 days": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    "6 months": new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
    "1 year": new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000),
  }

  // Pagination
  const take = pageSize
  const skip = pageSize * (page - 1)

  // Validate sortBy field
  const allowedSortBy = ["createdAt", "title", "minSalary", "maxSalary"]
  const sortKey = allowedSortBy.includes(sortBy) ? sortBy : "createdAt"

  // Build query object dynamically
  const query = {
    skip,
    take,
    where: {
      ...(filters.jobIndustrySlug && { jobIndustrySlug: filters.jobIndustrySlug }),
      ...(filters.jobType && { jobTypeSlug: filters.jobType }),
      ...(filters.jobExperience && { jobExperienceSlug: filters.jobExperience }),
      ...(filters.isFreelance !== undefined && { isFreelance: filters.isFreelance }),
      ...(filters.isFeatured !== undefined && { isFeatured: filters.isFeatured }),
      ...(filters.search && {
        OR: [
          { title: { contains: filters.search, mode: "insensitive" } },
          { description: { contains: filters.search, mode: "insensitive" } },
          { content: { contains: filters.search, mode: "insensitive" } },
          { skills: { hasSome: filters.search.split(" ") } },
        ],
      }),
      ...(filters.createdAtRange && { createdAt: { gte: dateRanges[filters.createdAtRange] } }),
      ...(filters.jobLocation && { jobLocationSlug: filters.jobLocation }),
      ...(filters.workMode && { jobWorkModeSlug: filters.workMode }),
      ...(filters.jobPosition && { jobPositionSlug: filters.jobPosition }),
      latitude: { not: null },
      longitude: { not: null },
    },
    orderBy: [
      { isSponsored: "desc" }, // Sponsored jobs first
      { [sortKey]: sortOrder }, // Then user-selected sorting
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
    if (filters.latitude && filters.longitude && (filters.minDistance || filters.maxDistance)) {
      const refLat = parseFloat(filters.latitude)
      const refLon = parseFloat(filters.longitude)
      const minDistance = parseFloat(filters.minDistance) || 0
      const maxDistance = parseFloat(filters.maxDistance) || Infinity

      // Haversine formula to calculate distance
      const toRad = (value) => (value * Math.PI) / 180
      jobs = jobs.filter((job) => {
        const lat1 = parseFloat(job.latitude)
        const lon1 = parseFloat(job.longitude)
        const lat2 = refLat
        const lon2 = refLon

        const R = 6371 // Earth's radius in kilometers
        const dLat = toRad(lat2 - lat1)
        const dLon = toRad(lon2 - lon1)
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c // Distance in kilometers

        return distance >= minDistance && distance <= maxDistance
      })

      // Recalculate totalJobs for the filtered results
      totalJobs = jobs.length
    }

    return new Response(
      JSON.stringify({
        jobs,
        totalPage: Math.ceil(totalJobs / take),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return new Response(
      JSON.stringify({ message: "Error fetching jobs", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}






