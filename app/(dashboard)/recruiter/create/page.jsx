
import RecruiterCreateForm from '@/components/admin/form/RecruiterCreateForm'
import LayoutAdmin from '@/components/admin/layout/admin/LayoutAdmin'
export default function JobPage() {
	return (
		<>
			<LayoutAdmin breadcrumbTitle="Recruiter">
				<RecruiterCreateForm />
			</LayoutAdmin>
		</>
	)
}
