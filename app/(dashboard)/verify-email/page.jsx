'use client'
import VerifyEmail from '@/components/admin/elements/VerifyEmail'
import { LayoutAuth } from '@/components/admin/layout/auth/LayoutAuth'
import { useSearchParams } from 'next/navigation'
// import LayoutAuth from '@/components/layout/auth/LayoutAuth'

export default function VerifyEmailPage() {
	const searchParams = useSearchParams()
	return (
		<>
			<LayoutAuth>
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Verify your email</h1>
					<p className="text-sm text-muted-foreground">Enter your credentials below</p>
				</div>
				<VerifyEmail searchParams={searchParams} />
			</LayoutAuth>
		</>
	)
}
