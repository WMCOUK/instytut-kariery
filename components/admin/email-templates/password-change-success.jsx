import { baseUrl } from "@/utils/baseUrl"


export const PasswordChangeSuccessfulTemplate = () => (
	<div>
		<h1>Your password change successfully</h1>
		<p>

			<a href={`${baseUrl}/signin`}>
				Click here to login
			</a>
		</p>
	</div>
)


