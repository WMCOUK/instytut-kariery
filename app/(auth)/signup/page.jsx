import SignupForm from "@/components/admin/form/SignupForm"
import { LayoutAuth } from "@/components/admin/layout/auth/LayoutAuth"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export default async function Signup() {
	const t = await getTranslations('auth.signup')
	return (
		<LayoutAuth mainImg="signin.png">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
				<p className="text-sm text-muted-foreground">{t('subtitle')}</p>
			</div>
			<SignupForm />
			<p className="text-center text-sm text-muted-foreground">
				{t('haveAccount')}{" "}
				<Link
					href="/signin"
					className="underline underline-offset-4 hover:text-primary"
				>
					{t('signinLink')}
				</Link>
			</p>
		</LayoutAuth>
	)
}
