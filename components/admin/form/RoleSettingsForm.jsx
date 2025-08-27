'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import currentUserClient from "@/utils/currentUserClient"
import { Loader2 } from "lucide-react"

export default function RoleSettingsForm({ user }) {
	const currentUser = currentUserClient()
	const { isAdmin } = currentUser || {}
	const [loading, setLoading] = useState(false)

	const form = useForm({
		defaultValues: {
			isRole: user?.isRole || '',
			onboard: user?.onboard || '',
			isBanned: user?.isBanned || false,
		},
	})

	const handleUpdateUser = async (data) => {
		setLoading(true)
		try {
			const res = await fetch(`/api/v1/user/${user?.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			if (!res.ok) throw new Error()
			toast.success('User updated successfully!')
		} catch {
			toast.error('Failed to update user.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateUser)} className="space-y-8">
				{isAdmin && (
					<>
						{/* isRole dropdown */}
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
										<DropdownMenuRadioGroup value={field.value} onValueChange={(v) => form.setValue('isRole', v)}>
											{["ADMIN", "MODERATOR", "USER"].map(role => (
												<DropdownMenuRadioItem key={role} value={role}>{role}</DropdownMenuRadioItem>
											))}
										</DropdownMenuRadioGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</FormItem>
						)} />

						{/* onboard dropdown */}
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
										<DropdownMenuRadioGroup value={field.value} onValueChange={(v) => form.setValue('onboard', v)}>
											{["CANDIDATE", "RECRUITER"].map(role => (
												<DropdownMenuRadioItem key={role} value={role}>{role}</DropdownMenuRadioItem>
											))}
										</DropdownMenuRadioGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</FormItem>
						)} />

						{/* isBanned switch */}
						<FormField name="isBanned" control={form.control} render={({ field }) => (
							<FormItem className="flex items-center">
								<FormLabel className="pt-2">Banned</FormLabel>
								<FormControl>
									<Switch className="ml-5" checked={field.value} onCheckedChange={(v) => form.setValue('isBanned', v)} />
								</FormControl>
							</FormItem>
						)} />
					</>
				)}

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? <Loader2 className="animate-spin" /> : "Submit"}
				</Button>
			</form>
		</Form>
	)
}

function ChevronDownIcon(props) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path d="M6 9l6 6 6-6" />
		</svg>
	)
}
