import SigninForm from '@/components/admin/form/SigninForm'
import { LayoutAuth } from '@/components/admin/layout/auth/LayoutAuth'
import { getTranslations } from 'next-intl/server'

export default async function Signin() {
	const t = await getTranslations('auth.signin')
	return (
		<LayoutAuth mainImg="signin.png">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
				<p className="text-sm text-muted-foreground">{t('subtitle')}</p>
			</div>
			<SigninForm />
		</LayoutAuth>
	)
}
