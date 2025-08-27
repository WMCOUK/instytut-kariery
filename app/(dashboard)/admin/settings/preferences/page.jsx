
import LayoutAdmin from '@/components/admin/layout/admin/LayoutAdmin'
// import LayoutAdmin from '@/components/layout/admin/LayoutAdmin'
import PreferenceSettingForm from '@/components/admin/form/PreferenceSettingForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import currentUserServer from '@/utils/currentUserServer'
export default async function Settings() {
	const user = await currentUserServer()
	// console.log(user)

	return (
		<>
			<LayoutAdmin breadcrumbTitle="Settings">
				<div className="px-4">

					{/* <TabsContent value="preferences"> */}
					<Card className="mt-4">
						<CardHeader>
							<CardTitle>Preferences</CardTitle>
							<CardDescription>Manage your preferences.</CardDescription>
						</CardHeader>
						<CardContent>
							<PreferenceSettingForm user={user} />
						</CardContent>
					</Card>
				</div>
			</LayoutAdmin>
		</>
	)
}
