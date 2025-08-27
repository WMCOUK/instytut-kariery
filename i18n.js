import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
	// Await the cookies() function
	const cookieStore = await cookies()
	const locale = cookieStore.get('language')?.value || 'en' // Default to 'en' if not set

	return {
		locale,
		messages: (await import(`./i18n/${locale}.json`)).default,
	}
})
