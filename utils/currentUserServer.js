// 'use client'
import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"
export default async function currentUserServer() {
	const session = await getAuthSession()

	// console.log('***************************',session);

	if (!session?.user?.email) {
		return null
	}

	const currentUser = await prisma.user.findUnique({
		where: {
			email: session?.user?.email
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
		}
	})
	if (!currentUser) {
		return null
	}


	// return currentUser


	return {
		...currentUser,
		isAdmin: currentUser?.isRole === "ADMIN",
		isModerator: currentUser?.isRole === "MODERATOR",
		isRoleUser: currentUser?.isRole === "USER",
		isOnboardUser: currentUser?.onboard === "USER",
		isRecruiter: currentUser?.onboard === "RECRUITER",
		isCandidate: currentUser?.onboard === "CANDIDATE",
	}

}