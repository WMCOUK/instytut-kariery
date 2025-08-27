import PersonalSettingsForm from "@/components/admin/form/PersonalSettingsForm"
import PreferenceSettingForm from "@/components/admin/form/PreferenceSettingForm"
import ProfileSettingsForm from "@/components/admin/form/ProfileSettingsForm"
import SocialMediaCreateForm from "@/components/admin/form/SocialMediaCreateForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import currentUserServer from "@/utils/currentUserServer"

export default async function Settings() {
	const user = await currentUserServer()
	return (
		<LayoutAdmin breadcrumbTitle="Settings">
			<Tabs defaultValue="profile" className="w-full space-y-6">
				{/* Top Nav Tabs */}
				<TabsList className="w-full flex justify-start gap-2 bg-muted p-1 rounded-lg shadow-sm">
					<TabsTrigger
						value="profile"
						className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors duration-200"
					>
						Profile
					</TabsTrigger>
					<TabsTrigger
						value="personal"
						className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors duration-200"
					>
						Personal
					</TabsTrigger>
					<TabsTrigger
						value="preferences"
						className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors duration-200"
					>
						Preferences
					</TabsTrigger>
					<TabsTrigger
						value="social"
						className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors duration-200"
					>
						Social Media
					</TabsTrigger>
				</TabsList>
				{/* Tab Content */}
				<TabsContent value="profile">
					<Card>
						<CardHeader>
							<CardTitle>Profile Settings</CardTitle>
							<CardDescription>Update your public profile information, including your name and bio.</CardDescription>
						</CardHeader>
						<CardContent>
							<ProfileSettingsForm user={user} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="personal">
					<Card>
						<CardHeader>
							<CardTitle>Personal Information</CardTitle>
							<CardDescription>Manage your personal details, such as contact information and address.</CardDescription>
						</CardHeader>
						<CardContent>
							<PersonalSettingsForm user={user} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="preferences">
					<Card>
						<CardHeader>
							<CardTitle>Preferences</CardTitle>
							<CardDescription>Configure your application preferences, like theme and notifications.</CardDescription>
						</CardHeader>
						<CardContent>
							<PreferenceSettingForm user={user} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="social">
					<Card>
						<CardHeader>
							<CardTitle>Social Media Links</CardTitle>
							<CardDescription>Add or update your social media profiles to connect with others.</CardDescription>
						</CardHeader>
						<CardContent>
							<SocialMediaCreateForm user={user} />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</LayoutAdmin>
	)
}
