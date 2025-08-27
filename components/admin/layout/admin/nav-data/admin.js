import {
	Building,
	CircleUser,
	CogIcon,
	Database,
	FileCode2,
	Home,
	Layers3,
	Map,
	Network,
	ShieldCheck,
	Tags,
	TrendingUp,
	UsersRound
} from "lucide-react"

export const adminSidebar = () => [
	// === MAIN ===
	{
		title: "Overview",
		url: "/admin/overview",
		icon: Home,
	},

	// === JOB MANAGEMENT ===

	// === USER MANAGEMENT ===
	{
		title: "Recruiters",
		url: "/recruiter",
		icon: UsersRound,
		// items: [
		// 	{ title: "Create Recruiter", url: "/admin/recruiter/create", icon: UserPlus },
		// 	{ title: "All Recruiters", url: "/admin/recruiter", icon: Contact },
		// ],
	},
	{
		title: "Candidates",
		url: "/candidate",
		icon: TrendingUp,
	},
	{
		title: "Profile",
		url: "/admin/profile",
		icon: CircleUser,
	},
	{
		title: "Users",
		url: "/admin/user",
		icon: ShieldCheck,
	},
	{
		title: "Post",
		url: "/admin/post",
		icon: FileCode2,
	},
	{
		title: "Post Category",
		url: "/admin/post/category",
		icon: FileCode2,
	},

	// === SETTINGS ===
	{
		title: "Settings",
		url: "/admin/settings",
		icon: CogIcon,
		// items: [
		// 	{ title: "Profile", url: "/admin/settings/profile", icon: CircleUser },
		// 	{ title: "Personal", url: "/admin/settings/personal", icon: Contact },
		// 	{ title: "Preferences", url: "/admin/settings/preferences", icon: Settings },
		// 	{ title: "Social", url: "/admin/settings/social", icon: Share2 },
		// ],
	},

	// === DATABASE ===
	{
		title: "Database",
		url: "/admin/database",
		icon: Database,
	},
]
