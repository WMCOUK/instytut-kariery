

import prisma from '@/utils/prismadb'



const VerifyEmail = async ({ searchParams }) => {
	if (searchParams.token) {
		const user = await prisma.user.findUnique({
			where: {
				emailVerificationToken: searchParams.token,
			},
		})
		if (!user) {
			return <div>Invalid token</div>
		}

		await prisma.user.update({
			where: {
				emailVerificationToken: searchParams.token,
			},
			data: {
				emailVerified: true,
				emailVerificationToken: null
			}
		})

		return (
			<div>
				<h1>
					Email verified for <b>{user.email}</b>!
				</h1>
			</div>
		)
	} else {
		return (
			<div>
				<h1>Verify Email</h1>
				No email verification token found. Check your email.
			</div>
		)
	}
}

export default VerifyEmail