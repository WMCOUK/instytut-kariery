import UserProfile from '@/components/admin/elements/UserProfile'
import LayoutAdmin from '@/components/admin/layout/admin/LayoutAdmin'
import currentUserServer from '@/utils/currentUserServer'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Profile() {
	const currentUser = await currentUserServer()
	if (!currentUser) redirect('/signin')
	return (
		<LayoutAdmin breadcrumbTitle="Profile">
			<UserProfile user={currentUser} />
		</LayoutAdmin>
	)
}
