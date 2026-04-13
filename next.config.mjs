/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.js')

const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'lh3.googleusercontent.com' },
			{ protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
			{ protocol: 'https', hostname: 'res.cloudinary.com' },
		],
	}
}

export default withNextIntl(nextConfig)
