import {
	Archive,
	Ban,
	BarChart3,
	Briefcase,
	Building,
	Check,
	ClipboardList,
	Clock,
	FileCode2,
	Globe2,
	Layers3,
	LayoutDashboard,
	Map,
	Network,
	PlusSquare,
	Receipt,
	SlidersHorizontal,
	Tags,
	TrendingUp,
	Users,
	UserSquare
} from "lucide-react"

export const recruiterSidebar = () => [
	{
		title: "Overview",
		url: "/recruiter/overview",
		icon: LayoutDashboard,
	},
	{
		title: "Profile",
		url: "/recruiter/profile",
		icon: UserSquare,
	},

	{
		title: "Attributes",
		url: "",
		icon: Layers3,
		items: [
			// { title: "Benefit", url: "/recruiter/attributes/benefit", icon: Gem },
			{ title: "Experience", url: "/recruiter/attributes/experience", icon: TrendingUp },
			{ title: "Industry", url: "/recruiter/attributes/industry", icon: Building },
			{ title: "Location", url: "/recruiter/attributes/location", icon: Map },
			{ title: "Position", url: "/recruiter/attributes/position", icon: Network },
			{ title: "Type", url: "/recruiter/attributes/type", icon: Tags },
			// { title: "Work Mode", url: "/recruiter/attributes/work-mode", icon: Globe2 },
		],
	},
	{
		title: "Create Job",
		url: "/recruiter/job/create",
		icon: PlusSquare,
	},
	{
		title: "Jobs",
		url: "",
		icon: Briefcase,
		items: [
			{ title: "All", url: "/recruiter/job", icon: BarChart3 },
			{ title: "Approved", url: "/recruiter/job/approved", icon: Check },
			{ title: "Pending", url: "/recruiter/job/pending", icon: Clock },
			{ title: "Rejected", url: "/recruiter/job/rejected", icon: Ban },
			{ title: "Draft", url: "/recruiter/job/draft", icon: FileCode2 },
			{ title: "Published", url: "/recruiter/job/published", icon: Globe2 },
			{ title: "Closed", url: "/recruiter/job/closed", icon: Archive },
		],
	},
	// {
	// 	title: "My Jobs",
	// 	url: "/recruiter/my-job",
	// 	icon: ClipboardList,
	// },
	{
		title: "Create Company",
		url: "/recruiter/create",
		icon: PlusSquare,
	},
	{
		title: "My Company",
		url: "/recruiter",
		icon: ClipboardList,
	},
	// {
	// 	title: "Applicants",
	// 	url: "/recruiter/applicant",
	// 	icon: Users,
	// },
	{
		title: "Billings",
		url: "/recruiter/billing",
		icon: Receipt,
	},
	{
		title: "Settings",
		url: "/recruiter/settings",
		icon: SlidersHorizontal,
	},
]
