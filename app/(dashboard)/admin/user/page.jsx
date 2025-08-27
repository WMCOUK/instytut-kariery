'use client'

import LayoutAdmin from '@/components/admin/layout/admin/LayoutAdmin'
import UserTable from '@/components/admin/table/UserTable'
import { Button } from '@/components/ui/button'
import { fetchAllUser } from '@/fetchSwr'
import currentUserClient from '@/utils/currentUserClient'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'

export default function Order() {
	const searchParams = useSearchParams()
	const page = Number.parseInt(searchParams.get("page") || "1")
	const { users, totalPage, totalUser, currentPage, error, mutate, isLoading } = fetchAllUser(page)

	const currentUser = currentUserClient()
	const { isAdmin } = currentUser || {}

	// console.log(users)
	if (!isAdmin === 'loading') {
		return <div className="w-full h-screen flex justify-center items-center">Loading...</div>
	}

	return (
		<>
			{isAdmin && (
				<LayoutAdmin>
					<UserTable data={users} totalPage={totalPage} page={currentPage.toString()} isLoading={isLoading} totalUser={totalUser} mutate={mutate} />
				</LayoutAdmin>
			)}
		</>
	)
}
