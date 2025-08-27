import { baseUrl } from "@/utils/baseUrl"


export const VerifyEmailEmailTemplate = ({ email, emailVerificationToken }) => (
	<div>
		<h1>Verify email for <b>{email}</b></h1>
		<p>
			To verify your email, click on this link:
		</p>
		<a href={`${baseUrl}/verify-email?token=${emailVerificationToken}`}>
			Click here to verify your email
		</a>
	</div>
)


