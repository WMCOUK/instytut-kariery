import SigninForm from '@/components/admin/form/SigninForm'
import { LayoutAuth } from '@/components/admin/layout/auth/LayoutAuth'
import Link from 'next/link'
export default function Signin() {
	return (
		<>
			<LayoutAuth mainImg="signin.png">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
					<p className="text-sm text-muted-foreground">Enter your email below to sign in</p>
				</div>
				<SigninForm />
			</LayoutAuth>
		</>
	)
}
