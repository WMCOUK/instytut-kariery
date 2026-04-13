import { ATTRIBUTE_PER_PAGE } from "@/utils"
import prisma from "@/utils/prismadb"

/**
 * Server-side helper to fetch a paginated list of a job-attribute taxonomy.
 * Mirrors the /api/v1/job/<attribute>/route.js query shape.
 *
 * @param {string} model - Prisma model name: 'jobIndustry', 'jobLocation', 'jobPosition',
 *                         'jobType', 'jobExperience', 'jobWorkMode', 'jobDate', 'jobBenefit'
 * @param {number} page - 1-based page number
 * @returns {Promise<{ items: any[], totalPage: number, currentPage: number }>}
 */
export async function getAttributeList(model, page = 1) {
	const take = ATTRIBUTE_PER_PAGE
	const skip = ATTRIBUTE_PER_PAGE * (page - 1)
	try {
		const [items, total] = await Promise.all([
			prisma[model].findMany({
				skip,
				take,
				orderBy: { createdAt: "desc" },
				include: { job: true },
			}),
			prisma[model].count(),
		])
		return {
			items,
			totalPage: Math.ceil(total / take),
			currentPage: page,
		}
	} catch (error) {
		console.error(`Error fetching ${model}:`, error)
		return { items: [], totalPage: 0, currentPage: page }
	}
}
