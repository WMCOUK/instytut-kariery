import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

const SUPPORTED = ['pl', 'en']
const DEFAULT_LOCALE = 'pl'

function parseAcceptLanguage(header) {
	if (!header) return null
	const ranked = header
		.split(',')
		.map((part) => {
			const [tag, q = 'q=1'] = part.trim().split(';')
			const quality = parseFloat(q.split('=')[1]) || 1
			return { tag: tag.toLowerCase().split('-')[0], quality }
		})
		.sort((a, b) => b.quality - a.quality)

	for (const { tag } of ranked) {
		if (SUPPORTED.includes(tag)) return tag
	}
	return null
}

export default getRequestConfig(async () => {
	const cookieStore = await cookies()
	const cookieLocale = cookieStore.get('language')?.value

	let locale
	if (cookieLocale && SUPPORTED.includes(cookieLocale)) {
		locale = cookieLocale
	} else {
		const h = await headers()
		locale = parseAcceptLanguage(h.get('accept-language')) || DEFAULT_LOCALE
	}

	return {
		locale,
		messages: (await import(`./${locale}.json`)).default,
	}
})
