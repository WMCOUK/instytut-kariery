"use client"

import { calculateDuration } from "@/utils"
// import { fetchAllCandidateExperience } from "@/fetchSwr"

// Dummy experiences data to display when no experiences are provided
// const dummyExperiences = [
// 	{
// 		id: 1,
// 		title: "Senior Frontend Developer",
// 		company: "Tech Innovations Inc.",
// 		joinDate: "2021-06-01",
// 		leaveDate: null,
// 		isCurrentJob: true,
// 		description:
// 			"Leading the frontend development team in building responsive and accessible web applications. Implementing modern React patterns and optimizing performance across multiple projects.",
// 	},
// 	{
// 		id: 2,
// 		title: "Frontend Developer",
// 		company: "Digital Solutions Ltd",
// 		joinDate: "2018-03-15",
// 		leaveDate: "2021-05-30",
// 		isCurrentJob: false,
// 		description:
// 			"Developed and maintained client websites using React, Next.js and TypeScript. Collaborated with designers to implement pixel-perfect UI components and improved site performance by 40%.",
// 	},
// 	{
// 		id: 3,
// 		title: "UI/UX Designer",
// 		company: "Creative Agency",
// 		joinDate: "2016-08-01",
// 		leaveDate: "2018-02-28",
// 		isCurrentJob: false,
// 		description:
// 			"Created user-centered designs for web and mobile applications. Conducted user research and usability testing to improve product experiences.",
// 	},
// 	{
// 		id: 4,
// 		title: "Junior Web Developer",
// 		company: "StartUp Hub",
// 		joinDate: "2014-11-10",
// 		leaveDate: "2016-07-15",
// 		isCurrentJob: false,
// 		description:
// 			"Built responsive websites for small businesses using HTML, CSS, and JavaScript. Assisted in implementing SEO best practices and performance optimizations.",
// 	},
// ]

export const CandidateExperienceTimeline = ({ experiences }) => {
	// If no experiences are provided or experiences array is empty, use dummy experiences
	// const displayExperiences = !experiences || experiences.length === 0 ? dummyExperiences : experiences

	return (
		<>
			<ol className="relative border-l border-primary/20 dark:border-gray-700">
				{experiences.map((experience, index) => (
					<li key={experience.id || index} className="mb-10 ml-4 wow animate__animated animate__fadeInUp">
						<div className="absolute w-3 h-3 bg-primary/20 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
						<time className="mb-3 inline-block text-sm font-normal leading-none bg-primary/10 px-3 py-1 rounded-full text-primary dark:text-gray-500">
							{new Date(experience.joinDate).toLocaleDateString("default", { month: "long", year: "numeric" })} -{" "}
							{experience.isCurrentJob
								? "Present"
								: experience.leaveDate
									? new Date(experience.leaveDate).toLocaleDateString("default", { month: "long", year: "numeric" })
									: "N/A"}
						</time>

						<h5 className="font-medium text-gray-900 dark:text-white">
							{experience.title}
							{experience.company && <span className="text-sm text-gray-500 ml-1">at {experience.company}</span>}
							<span className="text-xs ml-1">({calculateDuration(experience.joinDate, experience.leaveDate)})</span>
						</h5>
						<p className="mb-1 text-gray-500 dark:text-gray-400">
							{experience.description || `Experience details for ${experience.title}`}
						</p>
					</li>
				))}
			</ol>
		</>
	)
}

