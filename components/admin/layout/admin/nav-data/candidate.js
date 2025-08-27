import {
	Building,
	FileText,
	Heart,
	Layers3,
	LayoutDashboard,
	Map,
	Network,
	Sliders,
	TrendingUp,
	UserCircle
} from "lucide-react"
export const candidateSidebar = () => [
	{
		title: "Overview",
		url: "/candidate/overview",
		icon: LayoutDashboard,
	}, {
		title: "Attributes",
		url: "",
		icon: Layers3,
		items: [
			// { title: "Benefit", url: "/candidate/attributes/benefit", icon: Gem },
			{ title: "CV", url: "/candidate/attributes/cv", icon: TrendingUp },
			{ title: "Education", url: "/candidate/attributes/education", icon: Building },
			{ title: "Experience", url: "/candidate/attributes/experience", icon: Map },
			{ title: "Skill", url: "/candidate/attributes/skill", icon: Network },
			// { title: "Type", url: "/candidate/attributes/type", icon: Tags },
			// { title: "Work Mode", url: "/candidate/attributes/work-mode", icon: Globe2 },
		],
	},
	{
		title: "Applied Jobs",
		url: "/candidate/applied-job",
		icon: FileText,
	},
	{
		title: "Favorite Jobs",
		url: "/candidate/favourite-job",
		icon: Heart,
	},
	{
		title: "Profile",
		url: "/candidate/profile",
		icon: UserCircle,
	},
	// {
	// 	title: "Job Alerts",
	// 	url: "/candidate/job-alert",
	// 	icon: Bell,
	// },
	{
		title: "Settings",
		url: "/candidate/settings",
		icon: Sliders,
	},
]
