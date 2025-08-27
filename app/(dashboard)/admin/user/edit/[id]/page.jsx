import PersonalSettingsForm from '@/components/admin/form/PersonalSettingsForm'
import ProfileSettingsForm from '@/components/admin/form/ProfileSettingsForm'
import LayoutAdmin from '@/components/admin/layout/admin/LayoutAdmin'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/tabs'
import currentUserServer from '@/utils/currentUserServer'
import { getUserDetails } from '@/utils/fetchServer'
import { redirect } from 'next/navigation' // Import redirect from next/navigation
// import LayoutAdmin from '@/components/layout/admin/LayoutAdmin'
import PreferenceSettingForm from '@/components/admin/form/PreferenceSettingForm'
export default async function EditUserDetails({ params }) {
	const { id } = await params
	const user = await getUserDetails(id)
	const currentUser = await currentUserServer()
	const { isAdmin } = currentUser || {}

	// Redirect non-admin users to the unauthorized page
	if (!isAdmin) {
		redirect('/unauthorized')
	}

	return (
		<LayoutAdmin breadcrumbTitle="Settings">
			<Tabs defaultValue="profile" className="w-full">
				<div className="flex flex-col lg:flex-row gap-6">
					{/* Sidebar Navigation */}
					<TabsList className="flex lg:flex-col w-full lg:w-56 bg-background border rounded-lg h-full">
						<TabsTrigger value="profile" className="justify-start w-full">
							Profile
						</TabsTrigger>
						<TabsTrigger value="personal" className="justify-start w-full">
							Personal
						</TabsTrigger>
						<TabsTrigger value="preference" className="justify-start w-full">
							Preferences
						</TabsTrigger>
						<TabsTrigger value="social" className="justify-start w-full">
							Social
						</TabsTrigger>
					</TabsList>

					{/* Tab Content */}
					<div className="flex-1 p-4 bg-white rounded-lg shadow-md">
						<TabsContent value="profile">
							<ProfileSettingsForm user={user} />
						</TabsContent>
						<TabsContent value="personal">
							<PersonalSettingsForm user={user} />
						</TabsContent>
						<TabsContent value="preference">
							<PreferenceSettingForm user={user} />
						</TabsContent>
						<TabsContent value="social">
							<p className="text-gray-700">Social content goes here.</p>
						</TabsContent>
					</div>
				</div>
			</Tabs>
		</LayoutAdmin>
	)
}
