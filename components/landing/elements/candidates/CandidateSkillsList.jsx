"use client"
import { Progress } from "@/components/ui/progress"
// import { fetchAllCandidateSkill } from "@/fetchSwr"

// Dummy skills data to display when no skills are provided
// const dummySkills = [
// 	{ title: "JavaScript", percentage: 85 },
// 	{ title: "React.js", percentage: 80 },
// 	{ title: "Node.js", percentage: 75 },
// 	{ title: "TypeScript", percentage: 70 },
// 	{ title: "UI/UX Design", percentage: 65 },
// 	{ title: "Project Management", percentage: 90 },
// 	{ title: "Communication", percentage: 95 },
// 	{ title: "Problem Solving", percentage: 88 },
// ]

export const CandidateSkillsList = ({ skills }) => {
	// If no skills are provided or skills array is empty, use dummy skills
	// const displaySkills = !skills || skills.length === 0 ? dummySkills : skills

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
			{skills.map((skill, index) => (
				<div className="mb-2" key={index}>
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm font-medium text-gray-700">{skill?.title || "Unnamed Skill"}</span>
						<span className="text-sm font-medium text-gray-500">
							{skill?.percentage !== null ? `${skill?.percentage}%` : "N/A"}
						</span>
					</div>
					<Progress value={skill?.percentage || 0} className="w-full h-2" />
				</div>
			))}
		</div>
	)
}

