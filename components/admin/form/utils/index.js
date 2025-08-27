export const jobCreateDefaultValues = {
	title: "",
	description: "",
	image: "",
	content: "",
	numberOfPositions: 1,
	maxApplicants: 1000,
	skills: [],
	benefit: [],
	minSalary: 0,
	maxSalary: 0,
	salaryRange: "",
	currency: "",
	recruiterSlug: "",
	jobIndustrySlug: "",
	// jobIndustryTitle: "",
	jobExperienceSlug: "",
	jobTypeSlug: "",
	jobWorkModeSlug: "",
	jobLocationSlug: "",
	jobPositionSlug: "",
	applyUrl: "",
	status: "draft",
	moderation: "pending",
	isFeatured: false,
	isFavourite: false,
	isFreelance: false,
	isSponsored: false,
	startDate: new Date(),
	closingDate: (() => {
		const date = new Date()
		date.setDate(date.getDate() + 30) // Add 30 days
		return date
	})(),
}




export const switchOptions = [
	{ id: "isFeatured", label: "Featured" },
	{ id: "isFavourite", label: "Favourite" },
	{ id: "isFreelance", label: "Freelance" },
	{ id: "isSponsored", label: "Sponsored" },
]

