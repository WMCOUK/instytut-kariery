import { TABLE_ROW_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"

const JOB_INCLUDE = {
	recruiter: true,
	user: true,
	jobType: true,
	jobExperience: true,
	jobIndustry: true,
	jobLocation: true,
	jobPosition: true,
	jobWorkMode: true,
}

function buildSearchWhere(search) {
	if (!search) return {}
	return {
		OR: [
			{ title: { contains: search, mode: "insensitive" } },
			{ description: { contains: search, mode: "insensitive" } },
			{ content: { contains: search, mode: "insensitive" } },
			{ skills: { hasSome: search.split(" ") } },
		],
	}
}

/**
 * Server-side fetch of jobs filtered by status, scoped to a user.
 * Mirrors /api/v1/job/{closed|draft|published}/route.js
 */
export async function getJobsByStatus({ status, userId, page = 1, search = "" }) {
	const take = TABLE_ROW_PAGE
	const skip = take * (page - 1)
	const where = {
		status,
		userId,
		...buildSearchWhere(search),
	}
	try {
		const [jobs, totalJob] = await Promise.all([
			prisma.job.findMany({
				take,
				skip,
				where,
				orderBy: { createdAt: "desc" },
				include: JOB_INCLUDE,
			}),
			prisma.job.count({ where }),
		])
		return { jobs, totalPage: Math.ceil(totalJob / take), totalJob, currentPage: page }
	} catch (error) {
		console.error(`Error fetching ${status} jobs:`, error)
		return { jobs: [], totalPage: 0, totalJob: 0, currentPage: page }
	}
}

/**
 * Server-side fetch of jobs filtered by moderation, scoped to a user.
 * Mirrors /api/v1/job/{approved|pending|rejected}/route.js
 */
export async function getJobsByModeration({ moderation, userId, page = 1, search = "" }) {
	const take = TABLE_ROW_PAGE
	const skip = take * (page - 1)
	const where = {
		moderation,
		userId,
		...buildSearchWhere(search),
	}
	try {
		const [jobs, totalJob] = await Promise.all([
			prisma.job.findMany({
				take,
				skip,
				where,
				orderBy: { createdAt: "desc" },
				include: JOB_INCLUDE,
			}),
			prisma.job.count({ where }),
		])
		return { jobs, totalPage: Math.ceil(totalJob / take), totalJob, currentPage: page }
	} catch (error) {
		console.error(`Error fetching ${moderation} jobs:`, error)
		return { jobs: [], totalPage: 0, totalJob: 0, currentPage: page }
	}
}

/**
 * Server-side fetch of all jobs (admin view, no scoping).
 * Mirrors /api/v1/job/route.js GET
 */
export async function getAllJobs({ page = 1, search = "", status, moderation }) {
	const take = TABLE_ROW_PAGE
	const skip = take * (page - 1)
	const where = {
		...(status && { status }),
		...(moderation && { moderation }),
		...buildSearchWhere(search),
	}
	try {
		const [jobs, totalJob] = await Promise.all([
			prisma.job.findMany({
				take,
				skip,
				where,
				orderBy: { createdAt: "desc" },
				include: JOB_INCLUDE,
			}),
			prisma.job.count({ where }),
		])
		return { jobs, totalPage: Math.ceil(totalJob / take), totalJob, currentPage: page }
	} catch (error) {
		console.error("Error fetching all jobs:", error)
		return { jobs: [], totalPage: 0, totalJob: 0, currentPage: page }
	}
}

/**
 * Server-side fetch of recruiter's own jobs.
 * Mirrors /api/v1/job/my-job/route.js
 */
export async function getMyJobs({ userId, page = 1, search = "" }) {
	const take = TABLE_ROW_PAGE
	const skip = take * (page - 1)
	const where = {
		userId,
		...buildSearchWhere(search),
	}
	try {
		const [jobs, totalJob] = await Promise.all([
			prisma.job.findMany({
				take,
				skip,
				where,
				orderBy: { createdAt: "desc" },
				include: JOB_INCLUDE,
			}),
			prisma.job.count({ where }),
		])
		return { jobs, totalPage: Math.ceil(totalJob / take), totalJob, currentPage: page }
	} catch (error) {
		console.error("Error fetching my jobs:", error)
		return { jobs: [], totalPage: 0, totalJob: 0, currentPage: page }
	}
}
