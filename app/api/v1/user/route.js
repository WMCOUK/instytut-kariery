import { POST_PER_PAGE } from '@/utils'
import prisma from '@/utils/prismadb'


export const GET = async (request) => {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1") // Ensure page is a number
	const take = POST_PER_PAGE
	const skip = POST_PER_PAGE * (page - 1)

	try {
		const users = await prisma.user.findMany({
			skip,
			take,
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				post: true,
				recruiter: true,
				jobLocation: true,
				jobIndustry: true,
				jobPosition: true,
				jobExperience: true,
				jobWorkMode: true,
				jobType: true,
				job: true,
				rating: true,
				personal: true,
				preference: true,
				candidate: true,
				candidateCv: true,
				candidateExperience: true,
				candidateEducation: true,
				candidateSkill: true,
				application:true,
			}
		})

		const totalUser = await prisma.user.count()

		return new Response(
			JSON.stringify({
				users,
				totalPage: Math.ceil(totalUser / take),
				totalUser,
				currentPage: page
			})
		)
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Get Error", error: error.message })
		)
	}
}





