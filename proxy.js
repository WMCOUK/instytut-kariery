// middleware.js
import { withAuth } from "next-auth/middleware"

export default withAuth({
	callbacks: {
		authorized: ({ req, token }) => {
			if (!token) return false

			const { isAdmin, isModerator, isRecruiter, isCandidate } = token
			const pathname = req.nextUrl.pathname

			// Strict role-based dashboard access
			if (pathname.startsWith("/admin")) {
				return isAdmin || isModerator // Only admin/mod
			}
			if (pathname.startsWith("/recruiter")) {
				return isRecruiter // Only recruiter
			}
			if (pathname.startsWith("/candidate")) {
				return isCandidate // Only candidate
			}

			// Any other protected route requires login
			return !!token
		},
	},
	pages: {
		signIn: "/signin",
		error: "/unauthorized",
	},
})

export const config = {
	matcher: [
		"/admin/:path*",
		"/recruiter/:path*",
		"/candidate/:path*",
	],
}
