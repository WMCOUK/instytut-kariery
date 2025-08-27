'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

const schema = yup.object({
	notifyOnShortlist: yup.boolean(),
	notifyOnExpire: yup.boolean(),
	notifyOnJobAlert: yup.boolean(),
	notifyOnSaved: yup.boolean(),
	notifyOnRejected: yup.boolean(),
	isProfilePublic: yup.boolean(),
	isResumePublic: yup.boolean(),
})

export default function PreferenceSettingForm({ user }) {
	const [loading, setLoading] = useState(false)
	console.log(user)
	const form = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			notifyOnShortlist: user?.preference?.notifyOnShortlist ?? false,
			notifyOnExpire: user?.preference?.notifyOnExpire ?? false,
			notifyOnJobAlert: user?.preference?.notifyOnJobAlert ?? false,
			notifyOnSaved: user?.preference?.notifyOnSaved ?? false,
			notifyOnRejected: user?.preference?.notifyOnRejected ?? false,
			isProfilePublic: user?.preference?.isProfilePublic ?? false,
			isResumePublic: user?.preference?.isResumePublic ?? false,
		},
	})

	// Ensure form is reset when user preferences change
	useEffect(() => {
		if (user?.preference) {
			form.reset({
				notifyOnShortlist: user.preference.notifyOnShortlist ?? false,
				notifyOnExpire: user.preference.notifyOnExpire ?? false,
				notifyOnJobAlert: user.preference.notifyOnJobAlert ?? false,
				notifyOnSaved: user.preference.notifyOnSaved ?? false,
				notifyOnRejected: user.preference.notifyOnRejected ?? false,
				isProfilePublic: user.preference.isProfilePublic ?? false,
				isResumePublic: user.preference.isResumePublic ?? false,
			})
		}
	}, [user?.preference, form])

	const handleUpdatePreferences = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/user/preference`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (!response.ok) throw new Error('Network error')

			await response.json()
			toast.success('Preferences updated successfully!')
			// mutate()
		} catch (error) {
			console.error(error)
			toast.error('Failed to update preferences.')
		} finally {
			setLoading(false)
		}
	}

	const renderSwitch = (name, label) => (
		<FormField name={name} control={form.control} render={({ field }) => (
			<FormItem className="flex items-center justify-between">
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Switch checked={field.value} onCheckedChange={field.onChange} />
				</FormControl>
			</FormItem>
		)} />
	)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdatePreferences)} className="space-y-4">
				{renderSwitch("notifyOnShortlist", "Notify on Shortlist")}
				{renderSwitch("notifyOnExpire", "Notify on Expiration")}
				{renderSwitch("notifyOnJobAlert", "Notify on Job Alerts")}
				{renderSwitch("notifyOnSaved", "Notify on Saved Jobs")}
				{renderSwitch("notifyOnRejected", "Notify on Rejected Applications")}
				{renderSwitch("isProfilePublic", "Make Profile Public")}
				{renderSwitch("isResumePublic", "Make Resume Public")}

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? "Saving..." : "Update Preferences"}
				</Button>
			</form>
		</Form>
	)
}
