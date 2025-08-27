'use client'

import CandidateEducationCreateForm from "@/components/admin/form/CandidateEducationCreateForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function EducationCreate() {
	return (
		<LayoutAdmin>
			<Card className="w-full mx-auto">
				<CardHeader>
					<CardTitle className="text-xl">Create Education</CardTitle>
				</CardHeader>
				<CandidateEducationCreateForm />
			</Card>
		</LayoutAdmin>
	)
}
