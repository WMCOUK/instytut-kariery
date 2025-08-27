"use client"

import { useSession } from "next-auth/react"

export default function useCurrentUser() {
	const { data: session, status } = useSession()

	if (status === "loading" || status === "unauthenticated" || !session?.user?.email) {
		return {} // return empty object if not ready
	}

	const user = session.user

	return {
		...user,
		isAdmin: user.isRole === "ADMIN",
		isModerator: user.isRole === "MODERATOR",
		isRoleUser: user.isRole === "USER",
		isOnboardUser: user.onboard === "USER",
		isRecruiter: user.onboard === "RECRUITER",
		isCandidate: user.onboard === "CANDIDATE",
	}
}
