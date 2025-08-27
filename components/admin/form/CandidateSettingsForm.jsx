"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

const schema = yup.object({
	credits: yup.number().default(0),
	publish: yup.boolean().default(false),
	availableForHire: yup.boolean().default(false),
	publicProfile: yup.boolean().default(false),
	hideCv: yup.boolean().default(false),
	isFeatured: yup.boolean().default(false),
})

export default function CandidateSettingsForm({ user }) {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const form = useForm({
		resolver: yupResolver(schema),
		defaultValues: user?.candidate || {
			credits: user?.candidate?.credits || 0,
			publish: user?.candidate?.publish || false,
			availableForHire: user?.candidate?.availableForHire || false,
			publicProfile: user?.candidate?.publicProfile || false,
			hideCv: user?.candidate?.hideCv || false,
			isFeatured: user?.candidate?.isFeatured || false,
		},
	})

	useEffect(() => {
		if (user?.candidate) {
			form.reset(user.candidate)
		}
	}, [user, form])

	const handleUpdateCandidate = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/user/candidate`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			if (!response.ok) throw new Error("Network error")

			await response.json()
			toast.success("Profile updated successfully!")
			// mutate()
		} catch (error) {
			toast.error("Failed to update profile.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateCandidate)} className="space-y-6">
				<FormField
					name="credits"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Credits</FormLabel>
							<FormControl>
								<Input type="number" {...field} value={field.value || 0} />
							</FormControl>
						</FormItem>
					)}
				/>

				{["publish", "availableForHire", "publicProfile", "hideCv", "isFeatured"].map((fieldName) => (
					<FormField
						key={fieldName}
						name={fieldName}
						control={form.control}
						render={({ field }) => (
							<FormItem className="flex items-center space-x-4">
								<FormLabel>{fieldName.replace(/([A-Z])/g, " $1")}</FormLabel>
								<FormControl>
									<Switch checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
							</FormItem>
						)}
					/>
				))}

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? <Loader2 className="animate-spin" /> : "Update Profile"}
				</Button>
			</form>
		</Form>
	)
}
