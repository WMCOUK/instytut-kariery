import AdminDashboard from "@/components/admin/dashboard/admin"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
export default async function Dashboard() {
	return (
		<LayoutAdmin breadcrumbTitle="Dashboard">
			<AdminDashboard />
		</LayoutAdmin>
	)
}