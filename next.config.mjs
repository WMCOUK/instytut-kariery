/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin() // Do not pass an object here

const nextConfig = {
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"firebasestorage.googleapis.com",
			"res.cloudinary.com",
			"via.placeholder.com",
			"fakeimg.pl",
			"picsum.photos"
		]
	}
}

export default withNextIntl(nextConfig)
