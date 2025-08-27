import LayoutAdmin from '@/components/admin/layout/admin/LayoutAdmin'
import UserProfile from '@/components/admin/elements/UserProfile'
import currentUserServer from '@/utils/currentUserServer'
import { getUserDetails } from '@/utils/fetchServer'
import { redirect } from 'next/navigation' // Import redirect from next/navigation

export default async function UserDetails({ params }) {
	const { id } = await params
	const user = await getUserDetails(id)
	const currentUser = await currentUserServer()
	const { isAdmin } = currentUser || {}

	// Redirect non-admin users to the unauthorized page
	if (!isAdmin) {
		redirect('/unauthorized')
	}

	return (
		<LayoutAdmin breadcrumbTitle="Profile">
			<UserProfile user={user} />
		</LayoutAdmin>
	)
}
