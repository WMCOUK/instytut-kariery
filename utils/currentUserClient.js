"use client"

import { useSession } from "next-auth/react"

export default function CurrentUserClient() {
	const { data: session, status } = useSession()

	// Handle loading state
	if (status === "loading") {
		return null // Or return a loading indicator if preferred
	}

	// Handle unauthenticated state
	if (status === "unauthenticated" || !session?.user?.email) {
		return null
	}

	// All Prisma relations are now available in session.user
	// This includes: post, recruiter, jobLocation, jobIndustry, jobPosition,
	// jobExperience, jobWorkMode, jobType, job, rating, personal, preference, candidate
	const currentUser = {
		...session.user,

		// These properties are now already included in the session from our auth.js update,
		// but we'll keep them here for backward compatibility and clarity
		isAdmin: session.user.isRole === "ADMIN",
		isModerator: session.user.isRole === "MODERATOR",
		isRoleUser: session.user.isRole === "USER",
		isOnboardUser: session.user.onboard === "USER",
		isRecruiter: session.user.onboard === "RECRUITER",
		isCandidate: session.user.onboard === "CANDIDATE",
	}

	return currentUser
}

