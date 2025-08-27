'use client'

import CandidateSkillCreateForm from "@/components/admin/form/CandidateSkillCreateForm"
import LayoutAdmin from "@/components/admin/layout/admin/LayoutAdmin"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function SkillCreate() {
	return (
		<LayoutAdmin>
			<Card className="w-full mx-auto">
				<CardHeader>
					<CardTitle className="text-xl">Create Skill</CardTitle>
				</CardHeader>
				<CandidateSkillCreateForm />
			</Card>
		</LayoutAdmin>
	)
}
