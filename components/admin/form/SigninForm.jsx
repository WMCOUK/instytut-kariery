"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { Eye, EyeOff, Loader2, Mail } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils"
import useCurrentUser from "@/utils/currentUserClient"

// Validation schema
const formSchema = yup.object().shape({
	email: yup.string().email("Invalid email format").required("Email is required."),
	password: yup.string().min(6, "Password must be at least 6 characters."),
})

export default function SigninForm() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const user = useCurrentUser() // now a hook

	// React Hook Form
	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: { email: "", password: "" },
	})

	// Toggle password visibility
	const handleTogglePasswordVisibility = () => setShowPassword(!showPassword)

	// Handle login
	const loginUser = async (formData) => {
		setLoading(true)
		const callback = await signIn("credentials", { ...formData, redirect: false })
		setLoading(false)

		if (callback?.error) {
			toast.error(callback.error)
			return
		}

		if (callback?.ok) {
			toast.success("Logged in successfully!")

			// Redirect based on user role immediately
			if (user?.isAdmin) router.push("/admin/overview")
			else if (user?.isRecruiter) router.push("/recruiter/overview")
			else if (user?.isCandidate) router.push("/candidate/overview")
			else router.push("/") // fallback
		}
	}

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(loginUser)} className="space-y-8">
					{/* Email field */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" autoComplete="email" {...field} />
								</FormControl>
								<FormDescription className={cn(form.formState.errors.email && "text-red-500")}>
									{form.formState.errors.email?.message || "Enter your valid email."}
								</FormDescription>
							</FormItem>
						)}
					/>

					{/* Password field */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex justify-between">
									<FormLabel>Password</FormLabel>
									<Link className="text-sm" href="/reset-password">
										Forgot password?
									</Link>
								</div>
								<FormControl>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Password"
											autoComplete="current-password"
											{...field}
										/>
										{showPassword ? (
											<EyeOff
												className="w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 cursor-pointer"
												onClick={handleTogglePasswordVisibility}
											/>
										) : (
											<Eye
												className="w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 cursor-pointer"
												onClick={handleTogglePasswordVisibility}
											/>
										)}
									</div>
								</FormControl>
								<FormDescription className={cn(form.formState.errors.password && "text-red-500")}>
									{form.formState.errors.password?.message || "Enter your password to sign in."}
								</FormDescription>
							</FormItem>
						)}
					/>

					{/* Submit button */}
					<Button type="submit" disabled={loading} className="w-full">
						{loading ? <Loader2 className="animate-spin" /> : "Sign in to your account"}
					</Button>
				</form>
			</Form>

			{/* Google sign-in */}
			<Button onClick={() => signIn("google")} variant="destructive" className="w-full">
				<Mail className="mr-2 h-4 w-4" /> Sign in with Google
			</Button>

			<p className="text-center text-sm text-muted-foreground">
				Don&apos;t have an account?{" "}
				<Link href="/signup" className="underline underline-offset-4 hover:text-primary">
					Signup
				</Link>
			</p>
		</div>
	)
}
