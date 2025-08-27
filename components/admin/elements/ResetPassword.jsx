
import ChangePasswordForm from '@/components/admin/form/ChangePasswordForm'
import ResetPasswordForm from '@/components/admin/form/ResetPasswordForm'
import prisma from '@/utils/prismadb'


const ResetPassword = async ({ searchParams }) => {
	if (searchParams.token) {
		const user = await prisma.user.findUnique({
			where: {
				resetPasswordToken: searchParams.token,
			},
		})
		if (!user) {
			return <div>Invalid token</div>
		}

		return <ChangePasswordForm resetPasswordToken={searchParams.token} />
	} else {
		return <ResetPasswordForm />
	}
}

export default ResetPassword
