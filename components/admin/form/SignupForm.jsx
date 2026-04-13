"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

export default function SignupForm() {
	const t = useTranslations('auth.signup')
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const formSchema = useMemo(
		() => yup.object({
			email: yup.string().required(t('errors.emailRequired')).email(t('errors.emailInvalid')),
			password: yup.string().required(t('errors.passwordRequired')).min(6, t('errors.passwordMin')),
			onboard: yup.string().oneOf(["RECRUITER", "CANDIDATE"], t('errors.onboardInvalid')).required(t('errors.onboardRequired')),
		}),
		[t]
	)

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			onboard: "CANDIDATE",
		},
	})

	const signupUser = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/v1/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			if (response.ok) {
				toast.success(t('toast.success'))
				router.push(`/signin`)
			} else {
				throw new Error("Registration failed")
			}
		} catch (error) {
			toast.error(t('toast.error'))
		} finally {
			setLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(signupUser)} className="space-y-5">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('emailLabel')}</FormLabel>
							<FormControl>
								<Input type="text" placeholder={t('emailPlaceholder')} {...field} />
							</FormControl>
							<FormDescription className={cn(form.formState.errors.email && "text-red-500")}>
								{form.formState.errors.email?.message || ""}
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('passwordLabel')}</FormLabel>
							<FormControl>
								<Input type="password" placeholder={t('passwordPlaceholder')} {...field} />
							</FormControl>
							<FormDescription className={cn(form.formState.errors.password && "text-red-500")}>
								{form.formState.errors.password?.message || ""}
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="onboard"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>{t('onboardLabel')}</FormLabel>
							<FormControl>
								<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="CANDIDATE" />
										</FormControl>
										<FormLabel className="font-normal">{t('candidate')}</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="RECRUITER" />
										</FormControl>
										<FormLabel className="font-normal">{t('recruiter')}</FormLabel>
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
					{loading ? <Loader2 className="animate-spin" /> : t('submit')}
				</Button>
			</form>
		</Form>
	)
}
