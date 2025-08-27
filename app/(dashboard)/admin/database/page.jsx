import { redirect } from "next/navigation"

import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
// import { MongoDBBackup } from '@/components/admin/elements/mongodb-backup'
import { MongoDBBackup } from "@/components/admin/mongodb/mongo-db-backup"
// import currentUserServer from "@/utils/currentUserServer"



export default async function Dashboard() {
	// const { isAdmin } = await currentUserServer()
	// if (!isAdmin) {
	// 	redirect('/signin')
	// }

	return (
		<LayoutAdmin>
			<MongoDBBackup />
		</LayoutAdmin>
	)
}

