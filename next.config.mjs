/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.js')

const nextConfig = {
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"firebasestorage.googleapis.com",
			"res.cloudinary.com",
		]
	}
}

export default withNextIntl(nextConfig)
