"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

// Define validation schema
const formSchema = yup.object({
	email: yup.string().required("Email is required").email("Invalid email format"),
	password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
	onboard: yup.string().oneOf(["RECRUITER", "CANDIDATE"], "Invalid onboard status").required("Onboard status is required"),
})

export default function SignupForm() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	// Form setup with yupResolver for validation
	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			onboard: "CANDIDATE",
		},
	})

	// Function to handle user registration
	const signupUser = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			if (response.ok) {
				toast.success("Registration successful!")
				router.push(`/signin`)
			} else {
				throw new Error("Registration failed")
			}
		} catch (error) {
			toast.error("Something went wrong")
		} finally {
			setLoading(false)
		}
	}

	// Render form field with consistent structure
	const renderFormField = (name, label, placeholder, type) => (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input type={type || "text"} placeholder={placeholder} {...field} />
					</FormControl>
					<FormDescription className={cn(form.formState.errors[name] && "text-red-500")}>
						{form.formState.errors[name]?.message || ""}
					</FormDescription>
				</FormItem>
			)}
		/>
	)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(signupUser)} className="space-y-5">
				{renderFormField("email", "Email", "Email")}
				{renderFormField("password", "Password", "Password", "password")}
				<FormField
					control={form.control}
					name="onboard"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Onboard Status</FormLabel>
							<FormControl>
								<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="CANDIDATE" />
										</FormControl>
										<FormLabel className="font-normal">Candidate</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="RECRUITER" />
										</FormControl>
										<FormLabel className="font-normal">Recruiter</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormDescription className={cn(form.formState.errors.onboard && "text-red-500")}>
								{form.formState.errors.onboard?.message || ""}
							</FormDescription>
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={loading} className="w-full">
					{loading ? <Loader2 className="animate-spin" /> : "Create account"}
				</Button>
			</form>
		</Form>
	)
}
