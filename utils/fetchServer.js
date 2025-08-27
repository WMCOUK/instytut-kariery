import { baseUrl } from '@/utils/baseUrl'

export const getUserDetails = async (id) => {
	const res = await fetch(`${baseUrl}/api/v1/user/${id}`, {
		cache: 'no-store' // Prevent caching
	})

	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}

export const getPostDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/post/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}
export const getCategoryDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/post/category/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}

export const getTagDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/tag/${slug}`, {
		cache: 'no-store' // Prevent caching
	})

	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}

export const getJobDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/job/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}
export const getRecruiterDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/recruiter/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}
export async function getCandidateDetails(id) {
	if (!id) {
		throw new Error("Candidate ID is required")
	}
	const url = `${baseUrl}/api/v1/candidate/${id}`
	console.log(`Fetching candidate details from: ${url}`)
	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!res.ok) {
			console.error(`API response error: ${res.status} ${res.statusText}`)
			const text = await res.text()
			console.error(`Response body: ${text}`)
			throw new Error(`Failed to fetch candidate details: ${res.status} ${res.statusText}`)
		}
		return res.json()
	} catch (error) {
		console.error("Error in getCandidateDetails:", error)
		throw error
	}
}


export const getIndustryDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/job/industry/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}
export const getJobAttributeDetails = async (slug, attPath) => {
	const res = await fetch(`${baseUrl}/api/v1/job/${attPath}/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}

export const getCandidateAttributeDetails = async (slug, attPath) => {
	const res = await fetch(`${baseUrl}/api/v1/candidate/${attPath}/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}

export const getCandidateExperienceDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/candidate/experience/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}
export const getCandidateEducationDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/candidate/education/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}
export const getCandidateSkillDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/candidate/skill/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}
export const getCandidateCvDetails = async (slug) => {
	const res = await fetch(`${baseUrl}/api/v1/candidate/cv/${slug}`, {
		cache: 'no-store' // Prevent caching
	})
	if (!res.ok) {
		throw new Error("Failed")
	}

	return res.json()
}