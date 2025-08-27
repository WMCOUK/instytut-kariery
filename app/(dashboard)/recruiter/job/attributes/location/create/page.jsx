'use client'

import AttributeCreateForm from "@/components/admin/form/AttributeCreateForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname } from "next/navigation"

export default function LocationCreate() {
	const pathname = usePathname() // Get the current path
	const segments = pathname.split('/') // Split the path into segments
	const attPath = segments[3] || '' // Extract the third segment
	return (
		<LayoutAdmin>
			<Card className="w-full mx-auto">
				<CardHeader>
					<CardTitle className="text-xl">Create Location</CardTitle>
				</CardHeader>
				<AttributeCreateForm attPath={attPath} attribute="Location" />
			</Card>
		</LayoutAdmin>
	)
}
