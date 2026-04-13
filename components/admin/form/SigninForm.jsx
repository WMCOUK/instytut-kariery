"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { Eye, EyeOff, Loader2, Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils"
import useCurrentUser from "@/utils/currentUserClient"

export default function SigninForm() {
	const t = useTranslations('auth.signin')
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const user = useCurrentUser()

	const formSchema = useMemo(
		() => yup.object().shape({
			email: yup.string().email(t('errors.emailInvalid')).required(t('errors.emailRequired')),
			password: yup.string().min(6, t('errors.passwordMin')),
		}),
		[t]
	)

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: { email: "", password: "" },
	})

	const handleTogglePasswordVisibility = () => setShowPassword(!showPassword)

	const loginUser = async (formData) => {
		setLoading(true)
		const callback = await signIn("credentials", { ...formData, redirect: false })
		setLoading(false)

		if (callback?.error) {
			toast.error(callback.error)
			return
		}

		if (callback?.ok) {
			toast.success(t('toast.success'))

			if (user?.isAdmin) router.push("/admin/overview")
			else if (user?.isRecruiter) router.push("/recruiter/overview")
			else if (user?.isCandidate) router.push("/candidate/overview")
			else router.push("/")
		}
	}

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(loginUser)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('emailLabel')}</FormLabel>
								<FormControl>
									<Input placeholder={t('emailPlaceholder')} autoComplete="email" {...field} />
								</FormControl>
								<FormDescription className={cn(form.formState.errors.email && "text-red-500")}>
									{form.formState.errors.email?.message || t('emailHint')}
								</FormDescription>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex justify-between">
									<FormLabel>{t('passwordLabel')}</FormLabel>
									<Link className="text-sm" href="/reset-password">
										{t('forgot')}
									</Link>
								</div>
								<FormControl>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											placeholder={t('passwordPlaceholder')}
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
									{form.formState.errors.password?.message || t('passwordHint')}
								</FormDescription>
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={loading} className="w-full">
						{loading ? <Loader2 className="animate-spin" /> : t('submit')}
					</Button>
				</form>
			</Form>

			<Button onClick={() => signIn("google")} variant="destructive" className="w-full">
				<Mail className="mr-2 h-4 w-4" /> {t('google')}
			</Button>

			<p className="text-center text-sm text-muted-foreground">
				{t('noAccount')}{" "}
				<Link href="/signup" className="underline underline-offset-4 hover:text-primary">
					{t('signupLink')}
				</Link>
			</p>
		</div>
	)
}
