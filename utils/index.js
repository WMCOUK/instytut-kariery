import { clsx } from "clsx"
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns"
import { twMerge } from "tailwind-merge"
export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const brandName = "Sminties"

export const USER_PER_PAGE = 3
export const JOB_PER_PAGE = 3
export const CATEGORY_PER_PAGE = 3
export const TABLE_ROW_PAGE = 10
export const POST_PER_PAGE = 9
export const ATTRIBUTE_PER_PAGE = 10
// export const JOB_PER_PAGE = 9
export const INVOICE_PER_PAGE = 3
export const PAGES_TO_SHOW = 2

export const PAGE_SIZE = 10



export function formatDate(dateStr) {
	const date = new Date(dateStr)
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	return date.toLocaleDateString('en-US', options)
}

export function formatTime(dateStr) {
	if (!dateStr) return 'Invalid date'

	const date = new Date(dateStr)
	const now = new Date()
	const diffInSeconds = Math.floor((now - date) / 1000)

	if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
	const diffInMinutes = Math.floor(diffInSeconds / 60)
	if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
	const diffInHours = Math.floor(diffInMinutes / 60)
	if (diffInHours < 24) return `${diffInHours} hours ago`
	const diffInDays = Math.floor(diffInHours / 24)
	if (diffInDays < 30) return `${diffInDays} days ago`

	const diffInMonths = Math.floor(diffInDays / 30)
	if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`

	const diffInYears = Math.floor(diffInMonths / 12)
	return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
}

export const calculateDuration = (startDate, endDate) => {
	const start = new Date(startDate)
	const end = endDate ? new Date(endDate) : new Date()

	const years = differenceInYears(end, start)
	const months = differenceInMonths(end, start) % 12
	const days = differenceInDays(end, start) % 30

	let duration = ""
	if (years > 0) duration += `${years} year${years > 1 ? "s" : ""} `
	if (months > 0) duration += `${months} month${months > 1 ? "s" : ""} `
	if (days > 0) duration += `${days} day${days > 1 ? "s" : ""}`

	return duration.trim()
}




export const slugify = (str) =>
	str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "")



export const staticWorkModesData = [{
	title: "Remote",
	slug: "remote",
},
{
	title: "On Site",
	slug: "on-site",
},
{
	title: "Hybrid",
	slug: "hybrid",
}]


export const selectOptions = {
	salaryRange: [
		{ title: "Monthly", slug: "monthly" },
		{ title: "Hourly", slug: "hourly" },
		{ title: "Daily", slug: "daily" },
		{ title: "Fixed", slug: "fixed" },
	],
	currency: [
		{ title: "USD", slug: "usd" },
		{ title: "Euro", slug: "euro" },
		{ title: "Pound", slug: "pound" },
	],
	workMode: [
		{ title: "Remote", slug: "remote" },
		{ title: "On Site", slug: "on-site" },
		{ title: "Hybrid", slug: "hybrid" },
	],
	status: [
		{ title: "Draft", slug: "draft" },
		{ title: "Published", slug: "published" },
		{ title: "Closed", slug: "closed" },
	],
	moderation: [
		{ title: "Pending", slug: "pending" },
		{ title: "Approved", slug: "approved" },
		{ title: "Rejected", slug: "rejected" },
	],
}

export const truncateToWords = (text, wordLimit) => {
	if (!text) return ""
	const words = text.split(" ")
	if (words.length <= wordLimit) return text
	return words.slice(0, wordLimit).join(" ") + "..."
}

export function calculateReadTime(content) {
	const wordsPerMinute = 200 // Average reading speed
	const wordCount = content.trim().split(/\s+/).length
	const readTime = Math.ceil(wordCount / wordsPerMinute)
	return readTime
}
