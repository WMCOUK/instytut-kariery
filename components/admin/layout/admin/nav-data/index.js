import { adminSidebar } from "./admin"
import { candidateSidebar } from "./candidate"
import { moderatorSidebar } from "./moderator"
import { recruiterSidebar } from "./recruiter"

export const appSidebarData = (currentUser) => {
	const {
		isAdmin,
		isModerator,
		isRecruiter,
		isCandidate,
	} = currentUser || {}

	const navMain = [
		...(isAdmin ? adminSidebar() : []),
		...(isModerator ? moderatorSidebar() : []),
		...(isRecruiter ? recruiterSidebar() : []),
		...(isCandidate ? candidateSidebar() : []),
	]

	return { navMain }
}
