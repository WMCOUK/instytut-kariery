// app/unauthorized/page.tsx

import Link from "next/link"

const UnauthorizedPage = () => {
	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
			<h1>Unauthorized Access</h1>
			<p>You do not have permission to view this page.</p>
			<p>Please return to the dashboard.</p>
			<Link href="/admin/dashboard">Dashboard</Link>
		</div>
	)
}

export default UnauthorizedPage
