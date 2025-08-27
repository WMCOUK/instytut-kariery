'use client'

import CandidateCvCreateForm from "@/components/admin/form/CandidateCvCreateForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function SkillCreate() {
	return (
		<LayoutAdmin>
			<Card className="w-full mx-auto">
				<CardHeader>
					<CardTitle className="text-xl">Create CV</CardTitle>
				</CardHeader>
				<CandidateCvCreateForm />
			</Card>
		</LayoutAdmin>
	)
}
