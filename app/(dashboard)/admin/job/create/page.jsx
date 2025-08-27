
import LayoutAdmin from '@/components/admin/layout/admin/LayoutAdmin'
import JobCreateForm from '@/components/admin/form/JobCreateForm'
export default function JobPage() {
	return (
		<>
			<LayoutAdmin breadcrumbTitle="Jobs">
				<JobCreateForm />
			</LayoutAdmin>
		</>
	)
}
