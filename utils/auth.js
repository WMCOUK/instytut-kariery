import prisma from "@/utils/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"
import { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
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
			credentials: { email: {}, password: {} },
			async authorize(credentials) {
				const { email, password } = credentials || {}
				if (!email || !password) throw new Error("Missing email or password")

				const user = await prisma.user.findUnique({
					where: { email },
					select: { id: true, email: true, hashedPassword: true, isRole: true, onboard: true },
				})
				if (!user || !user.hashedPassword) throw new Error("No user found")

				const isValid = await bcrypt.compare(password, user.hashedPassword)
				if (!isValid) throw new Error("Incorrect password")

				return user
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.role = user.isRole
				token.onboard = user.onboard

				// Optional fields if present
				token.userName = user.userName || null
				token.email = user.email || null
				token.image = user.image || null
				token.stripeCustomerId = user.stripeCustomerId || null
				token.isSubscription = user.isSubscription || false
				token.subscriptionID = user.subscriptionID || null
				token.subPriceId = user.subPriceId || null
			}
			return token
		},

		async session({ session, token }) {
			session.user = {
				id: token.id,
				role: token.role,
				onboard: token.onboard,
				userName: token.userName,
				email: token.email,
				picture: token.image,
				stripeCustomerId: token.stripeCustomerId,
				isSubscription: token.isSubscription,
				subscriptionID: token.subscriptionID,
				subPriceId: token.subPriceId,

				// Computed flags
				isAdmin: token.role === "ADMIN",
				isModerator: token.role === "MODERATOR",
				isRoleUser: token.role === "USER",
				isOnboardUser: token.onboard === "USER",
				isRecruiter: token.onboard === "RECRUITER",
				isCandidate: token.onboard === "CANDIDATE",
			}
			return session
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
	pages: { signIn: "/signin" },
}

export const getAuthSession = () => getServerSession(authOptions)
