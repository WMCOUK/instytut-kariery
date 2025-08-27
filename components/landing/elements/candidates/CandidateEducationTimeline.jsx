"use client"

import { calculateDuration } from "@/utils"
// import { fetchAllCandidateEducation } from "@/fetchSwr"

// Dummy educations data to display when no educations are provided
// const dummyEducations = [
// 	{
// 		id: 1,
// 		title: "Master of Computer Science",
// 		institution: "Stanford University",
// 		startDate: "2018-09-01",
// 		endDate: "2020-06-30",
// 		isCurrentStudy: false,
// 		description:
// 			"Specialized in Artificial Intelligence and Machine Learning. Completed thesis on 'Neural Networks for Natural Language Processing' with distinction.",
// 	},
// 	{
// 		id: 2,
// 		title: "Bachelor of Science in Computer Engineering",
// 		institution: "Massachusetts Institute of Technology",
// 		startDate: "2014-09-01",
// 		endDate: "2018-05-15",
// 		isCurrentStudy: false,
// 		description:
// 			"Graduated with honors. Participated in multiple hackathons and research projects. Served as president of the Computer Science Student Association.",
// 	},
// 	{
// 		id: 3,
// 		title: "Professional Certification in UX Design",
// 		institution: "Google",
// 		startDate: "2021-01-15",
// 		endDate: "2021-07-30",
// 		isCurrentStudy: false,
// 		description:
// 			"Comprehensive program covering user research, wireframing, prototyping, and usability testing. Completed capstone project designing a mobile application for healthcare.",
// 	},
// 	{
// 		id: 4,
// 		title: "Advanced Data Science Specialization",
// 		institution: "IBM",
// 		startDate: "2022-03-01",
// 		endDate: null,
// 		isCurrentStudy: true,
// 		description:
// 			"Currently pursuing advanced certification in data science and analytics. Learning statistical analysis, data visualization, and predictive modeling techniques.",
// 	},
// ]

export const CandidateEducationTimeline = ({ educations }) => {
	// If no educations are provided or educations array is empty, use dummy educations
	// const displayEducations = !educations || educations.length === 0 ? dummyEducations : educations

	return (
		<>
			<ol className="relative border-l border-primary/20 dark:border-gray-700">
				{educations.map((education, index) => (
					<li key={education.id || index} className="mb-10 ml-4 wow animate__animated animate__fadeInUp">
						<div className="absolute w-3 h-3 bg-primary/20 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
						<time className="mb-3 inline-block text-sm font-normal leading-none bg-primary/10 px-3 py-1 rounded-full text-primary dark:text-gray-500">
							{new Date(education.startDate).toLocaleDateString("default", { month: "long", year: "numeric" })} -{" "}
							{education.isCurrentStudy
								? "Present"
								: education.endDate
									? new Date(education.endDate).toLocaleDateString("default", { month: "long", year: "numeric" })
									: "N/A"}
						</time>

						<h5 className="font-medium text-gray-900 dark:text-white">
							{education.title}
							{education.institution && <span className="text-sm text-gray-500 ml-1">at {education.institution}</span>}
							<span className="text-xs ml-1">({calculateDuration(education.startDate, education.endDate)})</span>
						</h5>
						<p className="mb-1 text-gray-500 dark:text-gray-400">
							{education.description || `Education details for ${education.title}`}
						</p>
					</li>
				))}
			</ol>
		</>
	)
}

