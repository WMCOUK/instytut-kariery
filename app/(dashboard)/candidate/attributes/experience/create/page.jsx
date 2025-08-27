'use client'

import CandidateExperienceCreateForm from "@/components/admin/form/CandidateExperienceCreateForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExperienceCreate() {
	return (
		<LayoutAdmin>
			<Card className="w-full mx-auto">
				<CardHeader>
					<CardTitle className="text-xl">Create Experience</CardTitle>
				</CardHeader>
				<CandidateExperienceCreateForm />
			</Card>
		</LayoutAdmin>
	)
}
