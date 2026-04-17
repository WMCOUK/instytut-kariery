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
		async jwt({ token, user, trigger }) {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.isRole = user.isRole
				token.onboard = user.onboard
				token.userName = user.userName
				token.picture = user.image
				token.stripeCustomerId = user.stripeCustomerId
				token.isSubscription = user.isSubscription
				token.subscriptionID = user.subscriptionID
				token.subPriceId = user.subPriceId
			}

			if (trigger === "update") {
				const fresh = await prisma.user.findUnique({
					where: { email: token.email },
					select: {
						id: true, email: true, isRole: true, onboard: true,
						userName: true, image: true, stripeCustomerId: true,
						isSubscription: true, subscriptionID: true, subPriceId: true,
					},
				})
				if (fresh) {
					token.id = fresh.id
					token.isRole = fresh.isRole
					token.onboard = fresh.onboard
					token.userName = fresh.userName
					token.picture = fresh.image
					token.stripeCustomerId = fresh.stripeCustomerId
					token.isSubscription = fresh.isSubscription
					token.subscriptionID = fresh.subscriptionID
					token.subPriceId = fresh.subPriceId
				}
			}

			return token
		},
		async session({ session, token }) {
			if (!token?.email) return session

			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					email: token.email,
					isRole: token.isRole,
					onboard: token.onboard,
					userName: token.userName,
					picture: token.picture,
					stripeCustomerId: token.stripeCustomerId,
					isSubscription: token.isSubscription,
					subscriptionID: token.subscriptionID,
					subPriceId: token.subPriceId,
					isAdmin: token.isRole === "ADMIN",
					isModerator: token.isRole === "MODERATOR",
					isRoleUser: token.isRole === "USER",
					isOnboardUser: token.onboard === "USER",
					isRecruiter: token.onboard === "RECRUITER",
					isCandidate: token.onboard === "CANDIDATE",
				},
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
	pages: {
		signIn: "/signin",
	},
	// CSRF protection: SameSite=Lax blocks cross-site POST/PATCH/DELETE to our
	// API from attacker.com forms — all our mutation endpoints depend on this
	// cookie, so the browser enforcement is sufficient without per-request
	// CSRF tokens. Pinned explicitly so future changes don't silently widen it.
	cookies: {
		sessionToken: {
			name:
				process.env.NODE_ENV === "production"
					? "__Secure-next-auth.session-token"
					: "next-auth.session-token",
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production",
			},
		},
	},
}

export const getAuthSession = () => getServerSession(authOptions)