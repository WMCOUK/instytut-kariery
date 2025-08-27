import { Briefcase, FileText } from "lucide-react"

export const moderatorSidebar = (isCandidate) => [
  {
    title: "Settings",
    url: "",
    icon: Briefcase,
    items: [
      { title: "Profile", url: "/admin/settings/profile" },
      { title: "Personal", url: "/admin/settings/personal" },
      { title: "Preferences", url: "/admin/settings/preferences" },
      { title: "Social", url: "/admin/settings/social" },
      ...(isCandidate ? [{ title: "Candidate", url: "/admin/settings/candidate" }] : []),
    ],
  },
  {
    title: "Posts",
    url: "",
    icon: FileText,
    items: [
      { title: "Create Post", url: "/admin/post/create" },
      { title: "All Posts", url: "/admin/post" },
    ],
  },
]
