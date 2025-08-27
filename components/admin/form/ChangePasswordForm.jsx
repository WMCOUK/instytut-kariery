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
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

// Define validation schema
const formSchema = yup.object().shape({
	password: yup.string().min(6, "Password must be at least 6 characters.").required("Password is required."),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
})

export default function ChangePasswordForm({ resetPasswordToken }) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	// Form setup with yupResolver for validation
	const form = useForm({
		resolver: yupResolver(formSchema),
	})

	const handleSubmit = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/change-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ resetPasswordToken, password: data.password })
			})

			if (response.ok) {
				toast.success('Password changed successfully')
				router.push('/signin') // Redirect to login page after successful password change
			} else {
				toast.error('Failed to change password')
			}
		} catch (error) {
			toast.error('An error occurred while changing the password')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				{/* Password field */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Password"
									autoComplete="new-password"
									{...field}
								/>
							</FormControl>
							<FormDescription className={cn(form.formState.errors.password && 'text-red-500')}>
								{form.formState.errors.password
									? form.formState.errors.password.message
									: "Enter a new password."}
							</FormDescription>
						</FormItem>
					)}
				/>
				{/* Confirm Password field */}
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm Password"
									autoComplete="new-password"
									{...field}
								/>
							</FormControl>
							<FormDescription className={cn(form.formState.errors.confirmPassword && 'text-red-500')}>
								{form.formState.errors.confirmPassword
									? form.formState.errors.confirmPassword.message
									: "Re-enter your new password."}
							</FormDescription>
						</FormItem>
					)}
				/>
				{/* Button to submit the form */}
				<Button type="submit" disabled={loading}>
					{loading ? <Loader2 className="animate-spin" /> : "Change Password"}
				</Button>
			</form>
		</Form>
	)
}
