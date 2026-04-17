/** @type {import('next').NextConfig} */
import { withSentryConfig } from '@sentry/nextjs'
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

const sentryConfig = {
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,
	silent: !process.env.CI,
	widenClientFileUpload: true,
	...(process.env.SENTRY_AUTH_TOKEN ? {} : { sourcemaps: { disable: true } }),
}

export default withSentryConfig(withNextIntl(nextConfig), sentryConfig)
