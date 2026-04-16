"use client"

import { useSession } from "next-auth/react"

export default function useCurrentUser() {
	const { data: session, status } = useSession()

	const isLoading = status === "loading"

	if (isLoading || status === "unauthenticated" || !session?.user?.email) {
		return { isLoading }
	}

	const user = session?.user

	return {
		...user,
		isLoading: false,
		isAdmin: user.isRole === "ADMIN",
		isModerator: user.isRole === "MODERATOR",
		isRoleUser: user.isRole === "USER",
		isOnboardUser: user.onboard === "USER",
		isRecruiter: user.onboard === "RECRUITER",
		isCandidate: user.onboard === "CANDIDATE",
	}
}
