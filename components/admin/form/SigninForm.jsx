"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { Eye, EyeOff, Loader2, Mail } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"
import DemoCredential from "../elements/DemoCredential"

import currentUserClient from "@/utils/currentUserClient"
// Define validation schema
const formSchema = yup.object().shape({
	name: yup.string().min(2, "Name must be at least 2 characters."),
	email: yup.string().email("Invalid email format").required("Email is required."),
	password: yup.string().min(6, "Password must be at least 6 characters."),
})

export default function SigninForm() {
	// State variables and hooks
	const { status } = useSession()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState({ email: "", password: "" })
	const [showPassword, setShowPassword] = useState(false)

	const user = currentUserClient()


	// React Hook Form setup
	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	// Effect to redirect to dashboard if already authenticated
	useEffect(() => {
		if (user?.isAdmin) router.push("/admin/overview")
		if (user?.isRecruiter) router.push("/recruiter/overview")
		if (user?.isCandidate) router.push("/candidate/overview")
	}, [user, router])

	// Function to handle form submission
	const loginUser = async (formData) => {
		setLoading(true)
		const callback = await signIn("credentials", { ...formData, redirect: false })
		setLoading(false)
		if (callback?.error) toast.error(callback.error)
		if (callback?.ok && !callback?.error) toast.success("Logged in successfully!")
	}

	// Function to toggle password visibility
	const handleTogglePasswordVisibility = () => setShowPassword(!showPassword)



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
									{/* Input field for email */}
									<Input
										placeholder="Email"
										autoComplete="email"
										value={data.email}
										onChange={(e) => {
											setData({ ...data, email: e.target.value })
											field.onChange(e)
										}}
									/>
								</FormControl>
								{/* Display validation errors if any */}
								<FormDescription className={cn(form.formState.errors.email && "text-red-500")}>
									{form.formState.errors.email ? form.formState.errors.email.message : "Enter your valid email."}
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
									<Link className="text-sm" href={"/reset-password"}>
										Forgot password?
									</Link>
								</div>
								<FormControl>
									{/* Container for password input and eye icon */}
									<div className="relative">
										{/* Input field for password */}
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Password"
											autoComplete="current-password"
											value={data.password}
											onChange={(e) => {
												setData({ ...data, password: e.target.value })
												field.onChange(e)
											}}
										/>
										{/* Eye icon to toggle password visibility */}
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
								{/* Display validation errors if any */}
								<FormDescription className={cn(form.formState.errors.password && "text-red-500")}>
									{form.formState.errors.password
										? form.formState.errors.password.message
										: "Enter your password to sign in."}
								</FormDescription>
							</FormItem>
						)}
					/>
					{/* Button to submit the form */}
					<Button type="submit" disabled={loading} className="w-full">
						{loading ? <Loader2 className="animate-spin" /> : "Sign in to your account"}
					</Button>
				</form>
			</Form>

			{/* Google sign-in button */}
			<Button onClick={() => signIn("google")} variant="destructive" className="w-full">
				<Mail className="mr-2 h-4 w-4" /> Sign in with Google
			</Button>



			<p className="text-center text-sm text-muted-foreground">
				Don&apos;t have an account?{" "}
				<Link
					href="/signup"
					className="underline underline-offset-4 hover:text-primary"
				>
					Signup
				</Link>
			</p>
			<DemoCredential setData={setData} form={form} />
		</div>
	)
}

