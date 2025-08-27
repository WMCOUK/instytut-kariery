
import DashboardStats from "@/components/admin/dashboard/admin/DashboardStats"
import LatestJobs from "@/components/admin/dashboard/admin/LatestJobs"
import RecentPosts from "@/components/admin/dashboard/admin/RecentPosts"
import RecentUsers from "@/components/admin/dashboard/admin/RecentUsers"
import TopRecruiters from "@/components/admin/dashboard/admin/TopRecruiters"
import AdminJobChart from "./AdminJobChart"

export default function AdminDashboard() {
	return (
		<div className="space-y-6">
			<div className="grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
				<DashboardStats />
				<AdminJobChart />
			</div>

			<div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
				<LatestJobs />
				<TopRecruiters />
			</div>
			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
				<RecentUsers />
				<RecentPosts />

			</div>
		</div>
	)
}
