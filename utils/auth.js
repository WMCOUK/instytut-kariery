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
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Please enter an email and password")
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				})

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
			if (user) {
				token.id = user.id
				token.email = user.email
			}
			return token
		},
		async session({ session, token }) {
			if (!token?.email) return session

			const user = await prisma.user.findUnique({
				where: { email: token.email },
			})

			if (!user) return session

			return {
				...session,
				user: {
					...session.user,
					id: user.id,
					email: user.email,
					isRole: user.isRole,
					onboard: user.onboard,
					userName: user.userName,
					picture: user.image,
					stripeCustomerId: user.stripeCustomerId,
					isSubscription: user.isSubscription,
					subscriptionID: user.subscriptionID,
					subPriceId: user.subPriceId,
					isAdmin: user.isRole === "ADMIN",
					isModerator: user.isRole === "MODERATOR",
					isRoleUser: user.isRole === "USER",
					isOnboardUser: user.onboard === "USER",
					isRecruiter: user.onboard === "RECRUITER",
					isCandidate: user.onboard === "CANDIDATE",
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

export const getAuthSession = () => getServerSession(authOptions)