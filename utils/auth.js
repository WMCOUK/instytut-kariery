import prisma from "@/utils/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"
import { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// Fetch full user with all relational data
const fetchUserWithAllData = async (email) => {
	if (!email) return null

	return prisma.user.findUnique({
		where: { email },
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
		},
	})
}

// Slimmed-down user mapping for session
const mapUserData = (user) => {
	if (!user) return {}

	return {
		id: user.id,
		isRole: user.isRole,
		onboard: user.onboard,
		userName: user.userName,
		picture: user.image,
		stripeCustomerId: user.stripeCustomerId,
		isSubscription: user.isSubscription,
		subscriptionID: user.subscriptionID,
		subPriceId: user.subPriceId,

		// Include all relations
		post: user.post,
		recruiter: user.recruiter,
		jobLocation: user.jobLocation,
		jobIndustry: user.jobIndustry,
		jobPosition: user.jobPosition,
		jobExperience: user.jobExperience,
		jobWorkMode: user.jobWorkMode,
		jobType: user.jobType,
		job: user.job,
		rating: user.rating,
		personal: user.personal,
		preference: user.preference,
		candidate: user.candidate,

		// Computed role flags
		isAdmin: user.isRole === "ADMIN",
		isModerator: user.isRole === "MODERATOR",
		isRoleUser: user.isRole === "USER",
		isOnboardUser: user.onboard === "USER",
		isRecruiter: user.onboard === "RECRUITER",
		isCandidate: user.onboard === "CANDIDATE",
	}
}

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" }, // keep JWT
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Please enter an email and password")
				}

				const user = await fetchUserWithAllData(credentials.email)
				if (!user || !user.hashedPassword) {
					throw new Error("No user found")
				}

				const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)
				if (!isValid) {
					throw new Error("Incorrect password")
				}

				return user
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// 🔐 Only store minimal data in the cookie token
			if (user) {
				token.id = user.id
				token.email = user.email
			}
			return token
		},

		async session({ session, token }) {
			// 🧠 Fetch full user data (relational) here to avoid bloating the JWT cookie
			if (!token?.email) return session

			const freshUser = await fetchUserWithAllData(token.email)
			return {
				...session,
				user: {
					...session.user,
					...mapUserData(freshUser),
				},
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
	pages: {
		signIn: "/signin",
	},
}

// Export helper for server-side auth
export const getAuthSession = () => getServerSession(authOptions)
