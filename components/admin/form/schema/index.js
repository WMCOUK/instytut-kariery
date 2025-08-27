import * as Yup from "yup"

export const jobSchema = Yup.object().shape({
	title: Yup.string().required("Job title is required").trim(),
	description: Yup.string().required("Job description is required").trim(),
	image: Yup.string().nullable().optional(),
	skills: Yup.array().min(1, "At least one skill is required").required(),
	benefit: Yup.array().nullable().optional(),
	minSalary: Yup.number().min(0, "Min salary must be positive").required("Min salary is required"),
	maxSalary: Yup.number()
		.min(0, "Max salary must be positive")
		.required("Max salary is required")
		.test("max-greater-than-min", "Max salary must be >= min salary", function (value) {
			return value >= this.parent.minSalary
		}),
	maxApplicants: Yup.number().min(1, "Max applicants must be at least 1").required(),
	numberOfPositions: Yup.number().min(1, "Number of positions must be at least 1").required(),
	currency: Yup.string().required("Currency is required"),
	recruiterSlug: Yup.string().required("Recruiter is required"),
	jobIndustrySlug: Yup.string().required("Industry is required"),
	jobExperienceSlug: Yup.string().required("Experience is required"),
	jobTypeSlug: Yup.string().required("Job type is required"),
	jobWorkModeSlug: Yup.string().required("Work mode is required"),
	jobLocationSlug: Yup.string().required("Location is required"),
	jobPositionSlug: Yup.string().required("Position is required"),
	applyUrl: Yup.string().url("Invalid URL format").nullable().optional(),
	startDate: Yup.date().required("Start date is required"),
	closingDate: Yup.date()
		.nullable()
		.optional()
		.min(Yup.ref("startDate"), "Closing date must be later than start date"),
	status: Yup.string().required("Status is required"),
	moderation: Yup.string().required("Moderation status is required"),
	isFeatured: Yup.boolean().required(),
	isFavourite: Yup.boolean().required(),
	isFreelance: Yup.boolean().required(),
	isSponsored: Yup.boolean().required(),
	content: Yup.string()
		.test("notEmpty", "Content is required", (value) => value && value.trim() !== "" && value !== "<p></p>")
		.required("Content is required"),
	latitude: Yup.number()
		.min(-90, "Latitude must be between -90 and 90")
		.max(90, "Latitude must be between -90 and 90")
		.required("Latitude is required"),
	longitude: Yup.number()
		.min(-180, "Longitude must be between -180 and 180")
		.max(180, "Longitude must be between -180 and 180")
		.required("Longitude is required"),
})