
'use client'
import UserProfile from '@/components/admin/elements/UserProfile'
import LayoutAdmin from '@/components/admin/layout/admin/LayoutAdmin'
import CurrentUserClient from '@/utils/currentUserClient'
export default function Profile() {
	const currentUser = CurrentUserClient()
	return (
		<>
			<LayoutAdmin breadcrumbTitle="Profile">
				<UserProfile user={currentUser} />
			</LayoutAdmin>
		</>
	)
}
