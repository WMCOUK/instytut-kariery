
import ProfileSettingsForm from '@/components/admin/form/ProfileSettingsForm'
import LayoutAdmin from '@/components/admin/layout/admin/LayoutAdmin'
// import LayoutAdmin from '@/components/layout/admin/LayoutAdmin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import currentUserServer from '@/utils/currentUserServer'
export default async function Settings() {
	const user = await currentUserServer()
	// console.log(user)

	return (
		<>
			<LayoutAdmin breadcrumbTitle="Settings">
				<div className="px-4">
					<Card className="mt-4">
						<CardHeader>
							<CardTitle>Profile Settings</CardTitle>
							<CardDescription>Update your personal information.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<ProfileSettingsForm user={user} />
						</CardContent>
					</Card>
				</div>
			</LayoutAdmin>
		</>
	)
}
