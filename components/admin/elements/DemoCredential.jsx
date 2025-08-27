"use client"

import { Button } from "@/components/ui/button"

export default function DemoCredential({ setData, form }) {
	// Demo credentials
	const credentials = [
		{
			role: "Admin",
			email: "admin@test.com",
			password: "123456",
			url: "/admin/dashboard",
		},
		{
			role: "Recruiter",
			email: "recruiter@test.com",
			password: "123456",
			url: "/admin/dashboard",
		},
		{
			role: "Candidate",
			email: "candidate@test.com",
			password: "123456",
			url: "/admin/dashboard",
		},
	]

	// Function to fill form with demo credentials
	const fillCredentials = (email, password) => {
		setData({ email, password })
		form.setValue("email", email)
		form.setValue("password", password)
	}
	return (
		<>
			<div className="grid gap-4">
				{credentials.map((cred) => (
					<div
						key={cred.role}
						className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors"
						onClick={() => fillCredentials(cred.email, cred.password)}
					>
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-2">
								{/* <Badge variant="outline">{cred.role}</Badge> */}
								<span className="text-sm font-medium">{cred.email}</span>
							</div>
							<span className="text-xs text-muted-foreground">Password: {cred.password}</span>
						</div>
						<Button
							// variant="primary"
							size="sm"
							onClick={(e) => {
								e.stopPropagation()
								fillCredentials(cred.email, cred.password)
							}}
						>
							Copy
						</Button>
					</div>
				))}
			</div>
		</>
	)
}
