import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/prismadb"

/**
 * Returns the current authenticated user with small 1:1 relations (personal,
 * preference, candidate) plus computed role flags.
 *
 * Note: does NOT eagerly include heavy one-to-many relations (jobs, posts,
 * ratings, taxonomies, recruiters). Callers that need those should query
 * them explicitly with their own Prisma call. Including them here previously
 * caused multi-second loads on settings pages for users with lots of data.
 */
export default async function currentUserServer() {
	const session = await getAuthSession()

	if (!session?.user?.email) {
		return null
	}

	const currentUser = await prisma.user.findUnique({
		where: {
			email: session?.user?.email
		},
		include: {
			personal: true,
			preference: true,
			candidate: true,
		}
	})
	if (!currentUser) {
		return null
	}

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
