'use client'
import ResetPassword from '@/components/admin/elements/ResetPassword'
import { LayoutAuth } from '@/components/admin/layout/auth/LayoutAuth'
import { useSearchParams } from 'next/navigation'
// import LayoutAuth from '@/components/layout/auth/LayoutAuth'

export default function ResetPaswordPage() {
	const searchParams = useSearchParams()
	return (
		<>
			<LayoutAuth>
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
					<p className="text-sm text-muted-foreground">Enter your credentials below</p>
				</div>
				<ResetPassword searchParams={searchParams} />
			</LayoutAuth>
		</>
	)
}
