import prisma from "@/utils/prismadb"

export async function GET(req) {
	const { searchParams } = new URL(req.url)
	const slug = searchParams.get("slug")

	if (!slug) {
		return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 })
	}

	const currentJob = await prisma.job.findUnique({
		where: { slug },
		select: {
			id: true,
			jobIndustrySlug: true,
			jobTypeSlug: true,
			jobLocationSlug: true,
		},
	})

	if (!currentJob) {
		return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 })
	}

	const relatedJobs = await prisma.job.findMany({
		where: {
			slug: { not: slug },
			OR: [
				{ jobIndustrySlug: currentJob.jobIndustrySlug },
				{ jobTypeSlug: currentJob.jobTypeSlug },
				{ jobLocationSlug: currentJob.jobLocationSlug },
			],
			status: "published",
			moderation: "approved",
		},
		take: 6,
		orderBy: { createdAt: "desc" },
	})

	return new Response(JSON.stringify({ relatedJobs }), { status: 200 }) // ✅ wrap in { relatedJobs }
}
