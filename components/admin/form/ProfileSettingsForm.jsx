'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import currentUserClient from "@/utils/currentUserClient"
import { Loader2 } from "lucide-react"
// import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function ProfileSettingsForm({ user, mutate }) {
	const currentUser = currentUserClient()
	const { isAdmin } = currentUser || {}

	const [loading, setLoading] = useState(false)
	// const router = useRouter()

	const form = useForm({
		defaultValues: {
			userName: user?.userName || '',
			email: user?.email || '',
			isRole: user?.isRole || '',
			onboard: user?.onboard || '', // Ensure correct default value
			isBanned: user?.isBanned || false,
		},
	})

	useEffect(() => {
		if (user) form.reset(user)
	}, [user, form])

	const handleUpdateUser = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/user/${user?.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (!response.ok) throw new Error('Network response was not ok')
			await response.json()
			toast.success('User updated successfully!')
			// mutate()
		} catch (error) {
			console.error('Error:', error)
			toast.error('Failed to update user.')
		} finally {
			setLoading(false)
			// router.push('/admin/settings/profile')
		}
	}

	const renderField = (name, label, Component, props = {}) => (
		<FormField name={name} control={form.control} render={({ field }) => (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Component {...field} {...props} />
				</FormControl>
			</FormItem>
		)} />
	)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateUser)} className="space-y-8">
				{renderField("userName", "User Name", Input, { placeholder: "User Name", autoComplete: "userName" })}
				{renderField("email", "Email", Input, { placeholder: "Email", autoComplete: "email" })}

				
				{/* {isAdmin && (
					<>
						<FormField name="isRole" control={form.control} render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className="w-full justify-between">
											<span className="capitalize">{field.value || "Select Status"}</span>
											<ChevronDownIcon className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-full">
										<DropdownMenuRadioGroup value={field.value} onValueChange={(newValue) => form.setValue('isRole', newValue)}>
											{['ADMIN', 'MODERATOR', 'USER'].map(role => (
												<DropdownMenuRadioItem key={role} value={role}>{role}</DropdownMenuRadioItem>
											))}
										</DropdownMenuRadioGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</FormItem>
						)} />

						<FormField name="onboard" control={form.control} render={({ field }) => (
							<FormItem>
								<FormLabel>Onboard</FormLabel>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className="w-full justify-between">
											<span className="capitalize">{field.value || "Select Onboard"}</span>
											<ChevronDownIcon className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-full">
										<DropdownMenuRadioGroup value={field.value} onValueChange={(newValue) => form.setValue('onboard', newValue)}>
											{['CANDIDATE', 'RECRUITER'].map(role => (
												<DropdownMenuRadioItem key={role} value={role}>{role}</DropdownMenuRadioItem>
											))}
										</DropdownMenuRadioGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</FormItem>
						)} />
						<FormField name="isBanned" control={form.control} render={({ field }) => (
							<FormItem className="flex items-center">
								<FormLabel className="pt-2">Banned</FormLabel>
								<FormControl>
									<Switch className="ml-5" checked={field.value} onCheckedChange={(checked) => form.setValue('isBanned', checked)} />
								</FormControl>
							</FormItem>
						)} />
					</>
				)} */}

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? <Loader2 className="animate-spin" /> : "Submit"}
				</Button>
			</form>
		</Form>
	)
}

function ChevronDownIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m6 9 6 6 6-6" />
		</svg>
	)
}
