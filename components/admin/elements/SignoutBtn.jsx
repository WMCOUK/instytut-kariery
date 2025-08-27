'use client'
import { signOut } from 'next-auth/react'

export default function SignoutBtn() {
	return (
		<>
			<div onClick={() => signOut()}>Log out</div>
		</>
	)
}

