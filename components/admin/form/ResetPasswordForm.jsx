'use client'
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

// Define validation schema
const formSchema = yup.object().shape({
	email: yup.string().email("Invalid email format").required("Email is required."),
})

const ResetPasswordForm = () => {
	const [loading, setLoading] = useState(false)

	// Form setup with yupResolver for validation
	const form = useForm({
		resolver: yupResolver(formSchema),
	})

	const handleSubmit = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/reset-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: data.email })
			})

			if (response.ok) {
				toast.success('Password reset email sent successfully')
			} else {
				toast.error('Failed to send password reset email')
			}
		} catch (error) {
			toast.error('An error occurred while sending the email')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				{/* Email field */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Email"
									autoComplete="email"
									{...field}
								/>
							</FormControl>
							<FormDescription className={cn(form.formState.errors.email && 'text-red-500')}>
								{form.formState.errors.email
									? form.formState.errors.email.message
									: "Enter your valid email."}
							</FormDescription>
						</FormItem>
					)}
				/>
				{/* Button to submit the form */}
				<Button type="submit" disabled={loading} className="w-full">
					{loading ? <Loader2 className="animate-spin" /> : "Submit"}
				</Button>
			</form>
		</Form>
	)
}

export default ResetPasswordForm
