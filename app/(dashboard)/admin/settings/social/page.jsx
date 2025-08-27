
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
							<CardTitle>Social Links</CardTitle>
							<CardDescription>Manage your social accounts.</CardDescription>
						</CardHeader>
						<CardContent>
							{/* Add Social Links Form Here */}
						</CardContent>
					</Card>
				</div>
			</LayoutAdmin>
		</>
	)
}
